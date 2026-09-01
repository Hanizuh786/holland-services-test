"use client";
import { useEffect, useState } from "react";
import site from "../data/siteData.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  useEffect(() => {
    close();
  }, [pathname]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const current = (href) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header className="header">
      <Link className="brand" href="/" onClick={close}>
        <img src={site.logo} alt="Holland Legal Services logo" />
      </Link>
      <button
        className="hamb"
        onClick={() => setOpen(!open)}
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="primary-navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav id="primary-navigation" className={open ? "nav open" : "nav"} aria-label="Main navigation">
        <Link onClick={close} href="/" aria-current={current("/") ? "page" : undefined}>
          Home
        </Link>
        <Link onClick={close} href="/services" aria-current={current("/services") ? "page" : undefined}>
          Services
        </Link>
        <Link onClick={close} href="/insights" aria-current={current("/insights") ? "page" : undefined}>
          Insights
        </Link>
        <Link onClick={close} href="/newsletter" aria-current={current("/newsletter") ? "page" : undefined}>
          Newsletter
        </Link>
        <Link onClick={close} href="/about" aria-current={current("/about") ? "page" : undefined}>
          How we work
        </Link>
        <Link onClick={close} href="/privacy-on" aria-current={current("/privacy-on") ? "page" : undefined}>
          Privacy
        </Link>
        <Link onClick={close} className="navCta" href="/contact" aria-current={current("/contact") ? "page" : undefined}>
          Contact us
        </Link>
      </nav>
    </header>
  );
}
