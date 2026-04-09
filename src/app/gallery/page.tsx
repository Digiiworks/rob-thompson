import type { Metadata } from "next";
import GalleryClient from "@/components/sections/GalleryClient";

export const metadata: Metadata = {
  title: { absolute: "Gallery — Rob Thompson Live Photos & Videos" },
  description:
    "Photos and videos of Rob Thompson performing live — blues and rock shows across Gqeberha, Port Elizabeth and the Eastern Cape.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | Rob Thompson",
    description:
      "Live photos and videos from Rob Thompson's shows across the Eastern Cape.",
    url: "https://www.robthompson.co.za/gallery",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rob Thompson live on stage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Rob Thompson",
    description: "Live photos and videos from Rob Thompson.",
    images: ["/og-image.jpg"],
  },
};

export default function GalleryPage() {
  return (
    <div className="bg-[#16110e] text-[#f3ebdc] dark-zone pt-16">
      <header className="max-w-4xl mx-auto px-6 md:px-10 pt-10 pb-4 text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-60">
            Gallery
          </span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "clamp(54px, 8vw, 130px)",
            lineHeight: 0.85,
            letterSpacing: "-0.01em",
            marginTop: "20px",
          }}
        >
          Live<br />
          <em
            style={{
              fontFamily: "var(--font-fraunces)",
              fontStyle: "italic",
              fontWeight: 400,
              textTransform: "none",
              color: "#c14a1a",
              fontVariationSettings: "'opsz' 144",
            }}
          >
            on stage.
          </em>
        </h1>
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-60 mt-8 max-w-md mx-auto">
          A growing archive of nights on the road.
        </p>
      </header>

      <GalleryClient />
    </div>
  );
}
