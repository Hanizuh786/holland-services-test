import "./globals.css";
import { Providers } from "./providers";
import site from "../data/siteData.json";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: "UAE legal support and Netherlands-related legal services | Holland Legal Services",
    template: "%s | Holland Legal Services",
  },
  description:
    "Legal support for UAE matters, Netherlands-related investments, real estate acquisitions and cross-border legal issues.",
  keywords: [
    "UAE legal support",
    "Netherlands-related legal services",
    "UAE wills",
    "company setup UAE",
    "UAE document legalisation Netherlands",
    "real estate legal support UAE",
    "UAE inheritance law",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Holland Legal Services",
    description:
      "UAE legal support and Netherlands-related legal services.",
    type: "website",
    locale: "en_AE",
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en-AE">
      <body>
        <Providers>{children}</Providers>
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="beforeInteractive"
        />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">
          {`if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", function (user) {
              if (!user) {
                window.netlifyIdentity.on("login", function () {
                  window.location.href = "/admin/";
                });
              }
            });
          }`}
        </Script>
      </body>
    </html>
  );
}
