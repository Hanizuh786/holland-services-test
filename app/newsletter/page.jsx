import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import PublicationCard from "../../components/PublicationCard";
import { getAllPublications } from "../../lib/insights";

export const metadata = {
  title: "Newsletter",
  description: "The latest publications from Holland Legal Services.",
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage() {
  const publications = getAllPublications();

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Newsletter"
          title="Latest publications"
          lead="Browse all articles published by Holland Legal Services."
        />
        <section className="publicationSection" aria-labelledby="publication-heading">
          <div className="publicationHeading">
            <div>
              <p className="eyebrow">Archive</p>
              <h2 id="publication-heading">All publications</h2>
            </div>
            <p className="publicationCount">
              {publications.length} {publications.length === 1 ? "publication" : "publications"}
            </p>
          </div>
          <div className="publicationGrid">
            {publications.map((publication) => (
              <PublicationCard key={publication.slug} publication={publication} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
