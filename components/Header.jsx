"use client";
import { useState } from "react";
import site from "../data/siteData.json";
import Link from "next/link";
export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="header">
      <Link className="brand" href="/" onClick={close}>
        <img src={site.logo} alt="Holland Legal Services logo" />
      </Link>
      <button
        className="hamb"
        onClick={() => setOpen(!open)}
        aria-label="Open navigation"
      >
        <span></span>
        <span></span>
      </button>
      <nav className={open ? "nav open" : "nav"}>
        <Link onClick={close} href="/">
          Home
        </Link>
        <Link onClick={close} href="/services">
          Services
        </Link>
        <Link onClick={close} href="/insights">
          Insights
        </Link>
        <Link onClick={close} href="/about">
          How we work
        </Link>
        <Link onClick={close} href="/privacy-on">
          Privacy=ON
        </Link>
        <Link onClick={close} className="navCta" href="/contact">
          Contact Us
        </Link>
      </nav>
    </header>
  );
}
