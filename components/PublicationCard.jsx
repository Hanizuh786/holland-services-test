import Link from "next/link";

function formatDate(date) {
  if (!date) return null;
  return new Intl.DateTimeFormat("en-AE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function PublicationCard({ publication }) {
  const isWebsitePost = publication.source === "Website";
  const sourceLabel = isWebsitePost ? "Hilda's Blogs" : publication.source;
  const href = publication.externalUrl || `/newsletter/${publication.slug}`;
  const action = isWebsitePost
    ? "Read article"
    : `View on ${publication.source}`;
  const date = formatDate(publication.date);

  return (
    <article className={`publicationCard ${publication.image ? "hasImage" : "noImage"}`}>
      <Link
        className="publicationCardLink"
        href={href}
        target={publication.externalUrl ? "_blank" : undefined}
        rel={publication.externalUrl ? "noreferrer" : undefined}
        aria-label={`${action}: ${publication.title}`}
      >
        {publication.image && (
          <div className="publicationVisual">
            <img
              src={publication.image}
              alt={publication.imageAlt || ""}
              loading="lazy"
            />
          </div>
        )}
        <div className="publicationBody">
          <span className={`sourceBadge source${publication.source}`}>
            {sourceLabel}
          </span>
          {(date || publication.author) && (
            <p className="publicationMeta">
              {date && <time dateTime={publication.date}>{date}</time>}
              {date && publication.author && <span aria-hidden="true">·</span>}
              {publication.author && <span>{publication.author}</span>}
            </p>
          )}
          <h2>{publication.title}</h2>
          <p className="publicationLead">{publication.lead}</p>
          <span className="publicationAction">
            {action} <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
