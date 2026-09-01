"use client";
import site from "../data/siteData.json";
export default function ExpertStrip({ compact = false }) {
  return (
    <section className={compact ? "experts compact" : "experts"}>
      <div className="sectionHead">
        <p className="eyebrow">Direct expert contact</p>
        <h2>You know who handles your matter</h2>
        <p>
          Visitors should see who they are contacting. The site therefore uses
          expert cards across service, newsletter and contact pages.
        </p>
      </div>
      <div className="expertGrid">
        {site.experts.map((x) => (
          <article className="expert" key={x.name}>
            <img
              src={x.image}
              onError={(e) => {
                e.currentTarget.src = x.fallback;
              }}
              alt={`${x.name} profile`}
            />
            <div>
              <h3>{x.name}</h3>
              <p className="role">{x.role}</p>
              <p>{x.focus}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
