import type { Metadata } from "next";
import { Anton, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
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
      className={`${anton.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <body className="grain min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 relative z-[2]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
