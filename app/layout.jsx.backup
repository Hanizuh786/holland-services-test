import "./globals.css";
import { Providers } from "./providers";
import site from "../data/siteData.json";

export const metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: "Holland Legal Services | Dutch Legal Experts in Dubai, UAE",
    template: "%s | Holland Legal Services",
  },
  description:
    "SEO-focused Dutch legal services website for expats, entrepreneurs and families in Dubai and the UAE.",
  keywords: [
    "Dutch lawyer Dubai",
    "Dutch legal services UAE",
    "Expat Will UAE",
    "business setup Dubai",
    "legalisation UAE",
    "rent disputes Dubai",
    "UAE inheritance law Dutch",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Holland Legal Services",
    description:
      "Resourceful, reliable and responsive legal services in the UAE.",
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
      </body>
    </html>
  );
}
