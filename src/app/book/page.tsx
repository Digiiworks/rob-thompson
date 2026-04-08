import type { Metadata } from "next";
import BookingForm from "@/components/sections/BookingForm";

export const metadata: Metadata = {
  title: "Book Rob Thompson | Blues Musician | Gqeberha",
  description:
    "Book Rob Thompson for your private event, corporate function, wedding or venue night in Gqeberha and the Eastern Cape. Secure your date with a R1,000 deposit online.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book Rob Thompson — Live Blues for Your Event",
    description:
      "Hire Rob Thompson for weddings, corporate functions, private parties and venue nights across the Eastern Cape. R1,000 deposit secures your date.",
    url: "https://www.robthompson.co.za/book",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rob Thompson live performance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Rob Thompson",
    description: "Live blues for weddings, corporate events and venues in the Eastern Cape.",
    images: ["/og-image.jpg"],
  },
};

export default function BookPage() {
  return (
    <div className="pt-16">
      <header className="max-w-4xl mx-auto px-6 md:px-10 pt-10 pb-6 text-center">
        <h1
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "clamp(42px, 7vw, 88px)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
          }}
        >
          Book Rob Thompson
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-[#f3ebdc]/80" style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.55 }}>
          Hire Rob Thompson — Gqeberha&apos;s Delta blues and rock guitarist — for weddings, corporate functions, private parties, and venue nights across the Eastern Cape and beyond. Pick your date below and secure it with a R1,000 deposit (or pay in full), and Rob will confirm your booking within 24 hours. The balance is settled on the night of the show, and travel outside Gqeberha can be quoted on request.
        </p>
      </header>
      <BookingForm />
    </div>
  );
}
