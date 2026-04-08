import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: { absolute: "Contact Rob Thompson — Blues Musician | Gqeberha" },
  description:
    "Get in touch with Rob Thompson — Delta blues musician in Gqeberha. WhatsApp, phone, and email for bookings and enquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Rob Thompson — Live Blues Musician Gqeberha",
    description:
      "WhatsApp, phone or email Rob direct. Based in Gqeberha, available across the Eastern Cape and beyond.",
    url: "https://www.robthompson.co.za/contact",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rob Thompson" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Rob Thompson",
    description: "Get in touch — Gqeberha-based Delta blues musician.",
    images: ["/og-image.jpg"],
  },
};

const SITE_URL = "https://www.robthompson.co.za";

const contactLdJson = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#contact`,
  name: "Rob Thompson — Live Blues Musician",
  image: `${SITE_URL}/og-image.jpg`,
  url: `${SITE_URL}/contact`,
  telephone: "+27768967076",
  email: "bookings@robthompson.co.za",
  priceRange: "R1000+",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gqeberha",
    addressRegion: "Eastern Cape",
    addressCountry: "ZA",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Eastern Cape, South Africa",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+27768967076",
    email: "bookings@robthompson.co.za",
    contactType: "bookings",
    areaServed: "ZA",
    availableLanguage: ["English", "Afrikaans"],
  },
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLdJson) }}
      />
      <header
        className="relative px-6 md:px-10 pt-16 pb-16 text-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url('/photos/rob-01.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl mx-auto">
        <h1
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "clamp(42px, 7vw, 88px)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
            color: "#ffffff",
          }}
        >
          Contact Rob Thompson
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-white/85" style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.55 }}>
          Reach Rob directly by WhatsApp, phone or email for bookings, collaborations and enquiries. Based in Gqeberha and available across the Eastern Cape — with travel further afield on request. Most messages get a reply within a few hours during the day, and once your date is locked in with a deposit, Rob will send through a confirmation, set list options, and any tech requirements for the venue.
        </p>
        </div>
      </header>
      <Contact />
    </div>
  );
}
