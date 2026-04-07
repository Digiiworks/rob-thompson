import type { Metadata } from "next";
import { Bebas_Neue, Oswald, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://www.robthompson.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rob Thompson — Delta Blues Musician | Gqeberha",
    template: "%s | Rob Thompson — Delta Blues Musician | Gqeberha",
  },
  description:
    "Book Rob Thompson — Gqeberha's premier Delta blues and rock guitarist for private events, corporate functions, weddings and venues across the Eastern Cape.",
  keywords: [
    "blues musician Gqeberha",
    "live music Port Elizabeth",
    "blues guitarist PE",
    "book live band Eastern Cape",
    "Delta blues South Africa",
    "Rob Thompson band",
    "live entertainment Gqeberha",
    "acoustic guitarist PE",
    "book musician Eastern Cape",
    "corporate entertainment Port Elizabeth",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Rob Thompson Band",
    url: SITE_URL,
    title: "Rob Thompson — Delta Blues Musician | Gqeberha",
    description:
      "Book Gqeberha's premier Delta blues and rock guitarist for your next event.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rob Thompson — Delta Blues Musician | Gqeberha",
    description:
      "Book Gqeberha's premier Delta blues and rock guitarist for your next event.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${oswald.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
