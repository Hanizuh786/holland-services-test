import Header from "../../components/Header";
import Footer from "../../components/Footer";
export const metadata = { title: "Privacy" };
export default function Privacy() {
  return (
    <>
      <Header />
      <main>
        <section className="pageHero">
          <div>
            <p className="eyebrow">Privacy</p>
            <h1>Privacy and contact handling</h1>
            <p className="lead">
              This page gives a practical website privacy structure. Replace the
              placeholder policy with client-approved legal wording before
              publication.
            </p>
          </div>
        </section>
        <article className="longContent solo">
          <h2>Website enquiry data</h2>
          <p>
            The contact form collects information submitted by the visitor so
            that Holland Legal Services can respond to the enquiry. The
            production policy should specify retention, lawful basis,
            third-party processors, security measures and user rights.
          </p>
          <h2>Confidential information</h2>
          <p>
            Visitors should avoid submitting unnecessarily sensitive documents
            until a secure channel is agreed. The website also provides direct
            e-mail and privacy-focused contact information.
          </p>
          <h2>Client approval required</h2>
          <p>
            This privacy page is a technical placeholder and must be reviewed by
            Holland Legal Services before going live.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
