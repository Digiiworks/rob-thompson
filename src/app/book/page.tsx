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
    <div>
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
      <section className="relative px-6 md:px-10 py-24" style={{ background: "#16110e" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(122,24,24,0.22), transparent 70%), radial-gradient(40% 40% at 100% 100%, rgba(201,169,107,0.10), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="relative max-w-4xl mx-auto">
          <span
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "0.72rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#c9a96b",
              display: "block",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            002 / The Details
          </span>
          <h2
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(34px, 4.5vw, 60px)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              color: "#f3ebdc",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Booking FAQs
          </h2>
          <div
            style={{
              width: 64,
              height: 2,
              background: "#7a1818",
              margin: "0 auto 3rem",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {faqs.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                style={{
                  background: "rgba(243,235,220,0.04)",
                  border: "1px solid rgba(243,235,220,0.14)",
                  borderRadius: 4,
                  padding: "1.25rem 1.5rem",
                  color: "#f3ebdc",
                }}
              >
                <summary
                  style={{
                    listStyle: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    fontFamily: "var(--font-anton)",
                    fontSize: "clamp(18px, 1.7vw, 23px)",
                    letterSpacing: "0.005em",
                    color: "#f3ebdc",
                  }}
                >
                  <span>{f.q}</span>
                  <span
                    aria-hidden
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: "1.4rem",
                      lineHeight: 1,
                      color: "#c9a96b",
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </summary>
                <p
                  style={{
                    marginTop: "0.9rem",
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "clamp(15px, 1.2vw, 17px)",
                    lineHeight: 1.75,
                    color: "#f3ebdc",
                    opacity: 0.92,
                  }}
                >
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
