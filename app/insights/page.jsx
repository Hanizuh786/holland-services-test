import Header from "../../components/Header";
import Footer from "../../components/Footer";
import site from "../../data/siteData.json";
import Link from "next/link";
export const metadata = {
  title: "Insights",
  description: "SEO insight pages by Holland Legal Services.",
};
export default function Insights() {
  return (
    <>
      <Header />
      <main className="serviceIndex pagePad">
        <div className="sectionHead">
          <p className="eyebrow">Insights</p>
          <h1>Knowledge and SEO pages</h1>
        </div>
        <div className="cards three">
          {site.insights.map((s) => (
            <Link className="card" key={s.slug} href={`/insights/${s.slug}`}>
              <h3>{s.title}</h3>
              <span>{s.lead}</span>
              <b>Read insight →</b>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
