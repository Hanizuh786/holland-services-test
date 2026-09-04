import Link from "next/link";
export default function CTA({
  title = "Need direct legal guidance?",
  text = "Send the facts and documents you already have. The team will send the enquiry to the right expert.",
}) {
  return (
    <section className="ctaBand">
      <div>
        <p className="eyebrow">Next step</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Link className="btn" href="/contact">
        Contact us <b>→</b>
      </Link>
    </section>
  );
}
