import site from "../data/siteData.json";
import Link from "next/link";
import ExpertStrip from "./ExpertStrip";
import CTA from "./CTA";
export default function HomeSections() {
  return (
    <>
     <section className="hero">
  <div className="heroCopy">
    <p className="eyebrow">{site.tagline}</p>

    <h1>
      Legal Services in the UAE for Dutch & Belgian Entrepreneurs and Expats
    </h1>

    <p className="lead">
      Start a company in Dubai, arrange your legal structure, and avoid costly
      mistakes. We provide direct expert support for business setup, wills,
      document legalisation, and corporate structuring — tailored for Dutch and
      Belgian clients.
    </p>

    <div className="actions">
      <Link className="btn" href="/services">
        Explore services <b>→</b>
      </Link>
      <Link className="ghost" href="/contact">
        Book a consultation
      </Link>
    </div>
  </div>

  <div className="heroPanel">
    <p>
      Clear advice. Fixed pricing where possible. No outsourcing. Direct contact
      with experts who understand both Dutch and UAE systems.
    </p>
  </div>
</section>
      <section className="serviceIndex">
        <div className="sectionHead">
          <p className="eyebrow">Services</p>
          <h2>Choose your situation and find the right next step</h2>
        </div>
        <div className="cards">
          {site.services.map((s) => (
            <Link className="card" href={`/services/${s.slug}`} key={s.slug}>
              <p>{s.category}</p>
              <h3>{s.title}</h3>
              <span>{s.lead}</span>
              <b>Read page →</b>
            </Link>
          ))}
        </div>
      </section>
      <ExpertStrip />
      <section className="insightStrip">
        <div className="sectionHead">
          <p className="eyebrow">Guides & Answers</p>
          <h2>Clear explanations for common questions about doing business in the UAE</h2>
        </div>
        <div className="cards three">
          {site.insights.map((x) => (
            <Link className="card" key={x.slug} href={`/insights/${x.slug}`}>
              <h3>{x.title}</h3>
              <span>{x.lead}</span>
              <b>Open insight →</b>
            </Link>
          ))}
        </div>
      </section>
      <CTA
        title="Start your business or resolve your Legal Situation"
        text="ell us your situation and get a clear next step. Use the intake form or book a consultation — we will guide you directly"
      />
      

    </>
  );
}
