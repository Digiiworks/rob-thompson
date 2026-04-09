import type { Metadata } from "next";
import Shows from "@/components/sections/Shows";
import { getUpcomingPerformances } from "@/lib/performances";
import { SITE } from "@/lib/utils";

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: "Rob Thompson Live Shows — Gqeberha & Eastern Cape" },
  description:
    "Upcoming live performances by Rob Thompson — blues and rock shows across Gqeberha, Port Elizabeth and the Eastern Cape. View dates, venues and book tickets.",
  alternates: { canonical: "/shows" },
  openGraph: {
    title: "Live Shows | Rob Thompson — Blues Musician Gqeberha",
    description:
      "Catch Rob Thompson live across Gqeberha, Port Elizabeth and the Eastern Cape — blues, rock and tribute shows.",
    url: "https://www.robthompson.co.za/shows",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rob Thompson live on stage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Shows | Rob Thompson",
    description: "Upcoming blues and rock shows across the Eastern Cape.",
    images: ["/og-image.jpg"],
  },
};

export default async function ShowsPage() {
  const upcoming = await getUpcomingPerformances();

  const events = upcoming.map((p) => ({
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: p.title,
    startDate: p.start_time
      ? `${p.event_date}T${p.start_time}+02:00`
      : p.event_date,
    eventStatus: p.is_sold_out
      ? "https://schema.org/EventScheduled"
      : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: p.venue_name,
      address: {
        "@type": "PostalAddress",
        streetAddress: p.venue_address ?? "",
        addressCountry: "ZA",
      },
    },
    image: p.poster_url ? `${SITE.url}${p.poster_url}` : `${SITE.url}/og-image.jpg`,
    description: p.description ?? `${p.title} live at ${p.venue_name}.`,
    performer: {
      "@type": "MusicGroup",
      name: "Rob Thompson",
      url: SITE.url,
    },
    organizer: {
      "@type": "Organization",
      name: "Rob Thompson Band",
      url: SITE.url,
    },
    ...(p.ticket_price && {
      offers: {
        "@type": "Offer",
        price: p.ticket_price,
        priceCurrency: "ZAR",
        url: p.ticket_url ?? `${SITE.url}/shows`,
        availability: p.is_sold_out
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      },
    }),
  }));

  return (
    <div className="pt-16">
      {events.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(events) }}
        />
      )}
      <header className="max-w-4xl mx-auto px-6 md:px-10 pt-10 pb-4 text-center">
        <h1
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "clamp(42px, 7vw, 88px)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
            marginTop: "35px",
          }}
        >
          Upcoming Live Shows
        </h1>
      </header>
      <Shows />
    </div>
  );
}
