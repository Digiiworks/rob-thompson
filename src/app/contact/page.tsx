import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rob Thompson — Delta blues musician based in Gqeberha (Port Elizabeth), Eastern Cape. WhatsApp, phone, email and Instagram for bookings and enquiries.",
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

export default function ContactPage() {
  return (
    <div className="pt-24">
      <h1 className="sr-only">
        Contact Rob Thompson — Live Blues Musician in Gqeberha and the Eastern Cape
      </h1>
      <Contact />
    </div>
  );
}
