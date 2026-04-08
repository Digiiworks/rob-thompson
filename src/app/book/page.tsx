import type { Metadata } from "next";
import BookingForm from "@/components/sections/BookingForm";

const faqs = [
  {
    q: "What kind of events does Rob play?",
    a: "Rob performs at weddings, corporate functions, private parties, restaurant and venue nights, product launches, festivals, and private house concerts. Sets can be tailored — laid-back acoustic Delta blues for dinner service, or full electric blues-rock for dance floors.",
  },
  {
    q: "How far does Rob travel for bookings?",
    a: "Rob is based in Gqeberha and covers the entire Eastern Cape as standard — Port Elizabeth, Jeffreys Bay, Port Alfred, Kenton, St Francis, Grahamstown, East London and inland farms. Travel beyond the Eastern Cape is available on request with a travel fee quoted per event.",
  },
  {
    q: "How does the booking process work?",
    a: "Pick your date on the booking form and secure it with a R1,000 refundable deposit (or pay in full). Rob confirms the booking within 24 hours and sends through set list options and any technical requirements. The balance is settled on the night of the show.",
  },
  {
    q: "What equipment does Rob bring?",
    a: "For most private and corporate events Rob brings his own PA, microphones, and guitars. Larger venues and outdoor events may need a venue-supplied system — this is confirmed during booking so nothing is missed on the night.",
  },
  {
    q: "How long is a typical set?",
    a: "A standard booking is two 45-minute sets with a short break between, but Rob is flexible — longer formats, background dinner music, or shorter ceremony slots can all be arranged. Let Rob know the vibe and timing of your event and he'll shape the performance around it.",
  },
  {
    q: "Can Rob learn a specific song for our event?",
    a: "Yes — special requests for first dances, ceremony songs, or crowd favourites can usually be accommodated if requested at least two weeks before the event. Rob will confirm feasibility and may send through a quick demo video.",
  },
];

const faqLdJson = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const metadata: Metadata = {
  title: { absolute: "Book Rob Thompson — Blues Musician | Eastern Cape" },
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
      <header
        className="relative px-6 md:px-10 pt-20 pb-16 text-center"
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
          Book Rob Thompson
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-white/85" style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.55 }}>
          Hire Rob Thompson — Gqeberha&apos;s Delta blues and rock guitarist — for weddings, corporate functions, private parties, and venue nights across the Eastern Cape and beyond. Pick your date below and secure it with a R1,000 deposit (or pay in full), and Rob will confirm your booking within 24 hours. The balance is settled on the night of the show, and travel outside Gqeberha can be quoted on request.
        </p>
        </div>
      </header>
      <BookingForm />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLdJson) }}
      />
      <section className="px-6 md:px-10 py-20 max-w-4xl mx-auto">
        <h2
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "clamp(32px, 4vw, 52px)",
            lineHeight: 1,
            letterSpacing: "-0.01em",
            color: "#ffffff",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Booking FAQs
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3
                style={{
                  fontFamily: "var(--font-anton)",
                  fontSize: "clamp(20px, 2vw, 24px)",
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                }}
              >
                {f.q}
              </h3>
              <p
                className="text-white/80"
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "clamp(15px, 1.2vw, 17px)",
                  lineHeight: 1.6,
                }}
              >
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
