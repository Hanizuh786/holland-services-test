const DEFAULT_ENTITY_TYPE = "Lead";

function splitName(fullName) {
  const parts = String(fullName || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) {
    return { firstName: "", lastName: parts[0] || "Website enquiry" };
  }

  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts.at(-1),
  };
}

function addConfiguredField(payload, environmentName, value) {
  const fieldName = process.env[environmentName];
  if (fieldName && value !== undefined && value !== null && value !== "") {
    payload[fieldName] = value;
  }
}

export function buildEspoLead(submission) {
  const { firstName, lastName } = splitName(submission.name);
  const details = [
    `Service: ${submission.service || "Not specified"}`,
    `Preferred lawyer: ${submission.lawyer || "General"}`,
    submission.pageUrl ? `Submitted from: ${submission.pageUrl}` : null,
    "",
    submission.message,
  ].filter((value) => value !== null).join("\n");

  const payload = {
    firstName,
    lastName,
    emailAddress: submission.email,
    phoneNumber: submission.phone || null,
    source: process.env.ESPO_SOURCE_VALUE || "Website",
    description: details,
  };

  addConfiguredField(payload, "ESPO_FIELD_SERVICE", submission.service);
  addConfiguredField(payload, "ESPO_FIELD_LAWYER", submission.lawyer);
  addConfiguredField(payload, "ESPO_FIELD_MESSAGE", submission.message);
  addConfiguredField(payload, "ESPO_FIELD_PAGE_URL", submission.pageUrl);
  addConfiguredField(payload, "ESPO_FIELD_CONSENT", Boolean(submission.consent));

  return payload;
}

export async function createEspoLead(submission) {
  const siteUrl = process.env.ESPO_URL?.replace(/\/+$/, "");
  const apiKey = process.env.ESPO_API_KEY;

  if (!siteUrl || !apiKey) {
    return { configured: false, record: null };
  }

  const entityType = process.env.ESPO_ENTITY_TYPE || DEFAULT_ENTITY_TYPE;
  const response = await fetch(`${siteUrl}/api/v1/${encodeURIComponent(entityType)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
      "X-Skip-Duplicate-Check": "true",
    },
    body: JSON.stringify(buildEspoLead(submission)),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const reason = response.headers.get("X-Status-Reason") || response.statusText;
    throw new Error(`EspoCRM rejected the lead (${response.status}: ${reason})`);
  }

  return { configured: true, record: await response.json() };
}
