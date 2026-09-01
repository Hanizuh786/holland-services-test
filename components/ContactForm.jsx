"use client";
import { useState } from "react";
import site from "../data/siteData.json";
import { useSubmitContactMutation } from "../features/api/hlsApi";
export default function ContactForm({ defaultService = "" }) {
  const [send, { isLoading, isSuccess, error }] = useSubmitContactMutation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultService || site.services[0].title,
    lawyer: "General",
    message: "",
    consent: false,
  });
  const update = (e) =>
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  const submit = (e) => {
    e.preventDefault();
    send({ ...form, pageUrl: window.location.href });
  };
  return (
    <form className="form" onSubmit={submit}>
      <div className="row">
        <input name="name" placeholder="Your name" required onChange={update} />
        <input
          type="email"
          name="email"
          placeholder="Your e-mail"
          required
          onChange={update}
        />
      </div>
      <div className="row">
        <input
          name="phone"
          placeholder="Phone / WhatsApp optional"
          onChange={update}
        />
        <select name="lawyer" onChange={update}>
          <option>General</option>
          <option>Hilda van der Tuin LL.M.</option>
          <option>Paul Harts MSc</option>
        </select>
      </div>
      <select name="service" value={form.service} onChange={update}>
        {site.services.map((s) => (
          <option key={s.slug}>{s.title}</option>
        ))}
        {site.insights.map((s) => (
          <option key={s.slug}>{s.title}</option>
        ))}
      </select>
      <textarea
        name="message"
        rows="7"
        placeholder="My message is:"
        required
        onChange={update}
      ></textarea>
      <label className="check">
        <input type="checkbox" name="consent" required onChange={update} /> I
        agree that Holland Legal Services may contact me about this enquiry.
      </label>
      <button className="btn" disabled={isLoading}>
        {isLoading ? "Sending..." : "Submit enquiry"} <b>→</b>
      </button>
      {isSuccess && (
        <p className="success">
          Your enquiry has been received.
        </p>
      )}
      {error && (
        <p className="error">
          Submission failed. Please try again or contact us by e-mail.
        </p>
      )}
    </form>
  );
}
