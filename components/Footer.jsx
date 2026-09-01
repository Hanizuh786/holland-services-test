import site from "../data/siteData.json";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <img src={site.logo} alt="Holland Legal Services" />
        <p>{site.tagline}</p>
      </div>
      <div>
        <h4>Services</h4>
        {site.services.slice(0, 6).map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`}>
            {s.title}
          </Link>
        ))}
      </div>
      <div>
        <h4>Contact</h4>
        {site.contact.emails.map((e) => (
          <a key={e} href={`mailto:${e}`}>
            {e}
          </a>
        ))}
        <p>{site.contact.office}</p>
      </div>
      <div>
        <h4>Legal</h4>
        <Link href="/newsletter">Newsletter</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/privacy-on">Privacy</Link>
      </div>
    </footer>
  );
}
