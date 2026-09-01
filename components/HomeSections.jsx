import site from "../data/siteData.json";
import { getAllInsights } from "../lib/insights";
import Link from "next/link";
import ExpertStrip from "./ExpertStrip";
import CTA from "./CTA";
export default function HomeSections() {
  const insights = getAllInsights().slice(0, 3);
  return (
    <>
    <section className="hero">
  <div className="container">
    <h1>
      Legal guidance for individuals, families, businesses and investors
    </h1>

    <p className="hero-lead">
      Helping clients make informed decisions with clarity, confidence and practical legal support.
    </p>

    <p className="hero-description">
      Whether you are protecting your family, structuring a business, managing investments or resolving a dispute, our team provides clear guidance and practical solutions tailored to your circumstances.
    </p>

    <div className="hero-actions">
      <Link href="/services" className="btn btn-primary">
        Explore services
      </Link>

      <Link href="/contact" className="btn btn-secondary">
        Book a consultation
      </Link>
    </div>

    <p className="hero-note">
      Clear advice. Transparent communication. Personal attention. Practical solutions focused on your goals.
    </p>
  </div>
</section>
      <section className="serviceIndex">
        <div className="sectionHead">
          <p className="eyebrow">Services</p>
          <h2>Find the support that fits your situation</h2>
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
          <p className="eyebrow">Legal guides and answers</p>
          <h2>Practical insights and useful guidance</h2>
        </div>
        <div className="cards three">
          {insights.map((x) => (
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
        text="Tell us your situation and get a clear next step. Book a consultation — we will guide you directly"
      />
      

    </>
  );
}
