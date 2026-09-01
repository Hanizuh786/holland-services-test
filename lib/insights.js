import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const insightsDirectory = path.join(process.cwd(), "content", "insights");

function readInsight(filename) {
  const slug = filename.replace(/\.md$/, "");
  const source = fs.readFileSync(path.join(insightsDirectory, filename), "utf8");
  const { data, content } = matter(source);

  return {
    ...data,
    slug,
    body: content,
    date: data.date ? new Date(data.date).toISOString() : null,
    source: data.source || "Website",
    externalUrl: data.externalUrl || null,
    keywords: data.keywords || [],
    faqs: data.faqs || [],
  };
}

export function getAllPublications() {
  if (!fs.existsSync(insightsDirectory)) return [];

  return fs
    .readdirSync(insightsDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map(readInsight)
    .sort((a, b) => {
      if (a.date && b.date) return new Date(b.date) - new Date(a.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return a.title.localeCompare(b.title);
    });
}

export function getAllInsights() {
  return getAllPublications().filter((publication) => publication.source === "Website");
}

export function getInsightBySlug(slug) {
  const safeSlug = String(slug || "").replace(/[^a-z0-9-]/gi, "");
  const filename = `${safeSlug}.md`;

  if (!safeSlug || !fs.existsSync(path.join(insightsDirectory, filename))) {
    return null;
  }

  return readInsight(filename);
}
