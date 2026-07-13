import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ExpertStrip from "../../components/ExpertStrip";
import CTA from "../../components/CTA";
export const metadata = { title: "How this law firm works" };
export default function About() {
  return (
    <>
      <Header />
      <main>
        <section className="pageHero">
          <div>
            <p className="eyebrow">How we work</p>
            <h1>Fixed price where possible. Direct answers. Human contact.</h1>
            <p className="lead">
              A clearer version of the existing positioning: one clear point of
              contact, concise answers and practical legal routes.
            </p>
          </div>
        </section>
        <section className="longContent solo">
          <h2>How this firm is different</h2>
          <p>
            Many legal websites hide the actual route behind vague promises.
            This site is designed around direct contact, clear intake,
            transparent options and service pages that help the visitor
            understand the issue before sending a message.
          </p>
          <p>
            The firm is positioned as resourceful, reliable and responsive, with
            emphasis on fixed-price solutions where possible for matters such as
            wills, debt collection and business setup.
          </p>
          <p>
            The website should support online-first communication while still
            making the Dubai office visible for appointment-based meetings.
          </p>
        </section>
        <ExpertStrip />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
