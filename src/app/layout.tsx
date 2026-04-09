import type { Metadata } from "next";
import { Anton, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
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
    default: "Rob Thompson — Blues Musician | Gqeberha",
    template: "%s | Rob Thompson — Blues Musician | Gqeberha",
  },
  description:
    "Book Rob Thompson — Gqeberha's premier blues and rock guitarist for private events, corporate functions, weddings and venues across the Eastern Cape.",
  keywords: [
    "blues musician Gqeberha",
    "live music Port Elizabeth",
    "blues guitarist PE",
    "book live band Eastern Cape",
    "blues South Africa",
    "Rob Thompson band",
    "live entertainment Gqeberha",
    "acoustic guitarist PE",
    "book musician Eastern Cape",
    "corporate entertainment Port Elizabeth",
  ],
  alternates: { canonical: "/" },
  verification: { google: "b6-rVTidaeJDxUeAQSjoqry-Z16CSZPvWWYEX9sIjaI" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Rob Thompson Band",
    url: SITE_URL,
    title: "Rob Thompson — Delta Blues Musician | Gqeberha",
    description:
      "Book Gqeberha's premier Delta blues and rock guitarist for your next event.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rob Thompson — Delta blues guitarist live on stage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rob Thompson — Delta Blues Musician | Gqeberha",
    description:
      "Book Gqeberha's premier Delta blues and rock guitarist for your next event.",
    images: ["/og-image.jpg"],
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
      <head>
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MNTJD5W3');
          `}
        </Script>
      </head>
      <body className="grain min-h-screen flex flex-col">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MNTJD5W3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "MusicGroup",
                name: "Rob Thompson Band",
                alternateName: "Rob Thompson",
                url: SITE_URL,
                image: `${SITE_URL}/og-image.jpg`,
                genre: ["Delta Blues", "Blues Rock", "Acoustic Blues"],
                foundingLocation: {
                  "@type": "Place",
                  name: "Gqeberha, Eastern Cape, South Africa",
                },
                sameAs: [
                  "https://www.instagram.com/robthompsonband/",
                  "https://www.facebook.com/RobThompsonBand/",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": `${SITE_URL}#business`,
                name: "Rob Thompson — Live Blues Musician",
                image: `${SITE_URL}/og-image.jpg`,
                url: SITE_URL,
                telephone: "+27768967076",
                email: "bookings@robthompson.co.za",
                priceRange: "R1000+",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Gqeberha",
                  addressRegion: "Eastern Cape",
                  addressCountry: "ZA",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: -33.9608,
                  longitude: 25.6022,
                },
                areaServed: {
                  "@type": "AdministrativeArea",
                  name: "Eastern Cape, South Africa",
                },
              },
            ]),
          }}
        />
        <Navbar />
        <main className="flex-1 relative z-[2]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
