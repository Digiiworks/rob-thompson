import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: { absolute: "Contact Rob Thompson — Blues Musician | Gqeberha" },
  description:
    "Get in touch with Rob Thompson — blues musician in Gqeberha. WhatsApp, phone, and email for bookings and enquiries.",
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
    description: "Get in touch — Gqeberha-based blues musician.",
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
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLdJson) }}
      />
      <header
        className="relative px-6 md:px-10 pt-36 pb-16 text-center"
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

      <section className="relative px-6 md:px-10 py-24" style={{ background: "#16110e" }}>
        <div className="max-w-4xl mx-auto">
          <span
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "0.72rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#c9a96b",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            001 / Territory
          </span>
          <h2
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(34px, 4.5vw, 60px)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              color: "#f3ebdc",
              marginBottom: "2rem",
            }}
          >
            Where Rob Plays
          </h2>
          <div
            style={{
              width: 64,
              height: 2,
              background: "#7a1818",
              marginBottom: "2rem",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(16px, 1.3vw, 18px)",
              lineHeight: 1.7,
              color: "rgba(243,235,220,0.82)",
              marginBottom: "1.25rem",
            }}
          >
            Rob Thompson is based in Gqeberha (Port Elizabeth) and performs regularly across the Eastern Cape — from Jeffreys Bay, St Francis Bay and Port Alfred on the coast to Grahamstown, Kenton-on-Sea and inland farm venues. Bookings further afield in the Garden Route, Western Cape, and Gauteng are welcome on request, with travel quoted per event.
          </p>
          <p
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(16px, 1.3vw, 18px)",
              lineHeight: 1.7,
              color: "rgba(243,235,220,0.82)",
              marginBottom: "1.25rem",
            }}
          >
            Whether it&apos;s a wedding on the coast, a corporate year-end, a private birthday party, a restaurant residency, or a full festival slot, Rob brings a polished live blues and blues-rock set with his own PA for most private and corporate functions. Larger venues and outdoor stages are accommodated with venue-supplied sound where needed.
          </p>
          <p
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(16px, 1.3vw, 18px)",
              lineHeight: 1.7,
              color: "rgba(243,235,220,0.82)",
            }}
          >
            The fastest way to reach Rob is <a href="https://wa.me/27768967076" target="_blank" rel="noopener noreferrer" style={{ color: "#c9a96b", textDecoration: "underline", textUnderlineOffset: "3px" }}>WhatsApp</a> — most messages get a reply within a few hours during the day. For detailed quotes or venue specs, email <a href="mailto:bookings@robthompson.co.za" style={{ color: "#c9a96b", textDecoration: "underline", textUnderlineOffset: "3px" }}>bookings@robthompson.co.za</a> with your date, location, and event type, and Rob will come back to you with availability and pricing.
          </p>
        </div>
      </section>
    </div>
  );
}
