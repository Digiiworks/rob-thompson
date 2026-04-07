import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lost in the Mix · 404",
  description: "This page hit a wrong note. Head back to the main stage.",
};

export default function NotFound() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0b0805] text-[#f3ebdc] dark-zone flex items-center px-6 md:px-10">
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, rgba(122,24,24,0.15) 0%, rgba(11,8,5,0.85) 60%, rgba(11,8,5,0.98) 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full pt-32 pb-24">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-60 mb-6">
          ◆ Side D · Track 04
        </p>

        <h1
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: "clamp(120px, 22vw, 320px)",
            lineHeight: 0.82,
            letterSpacing: "-0.02em",
            textShadow: "0 2px 30px rgba(0,0,0,0.55)",
          }}
        >
          4
          <span
            style={{
              fontFamily: "var(--font-fraunces)",
              fontStyle: "italic",
              fontWeight: 400,
              fontVariationSettings: "'opsz' 144, 'SOFT' 100",
              color: "#c14a1a",
            }}
          >
            0
          </span>
          4
        </h1>

        <p
          className="mt-8 max-w-xl"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(20px, 1.6vw, 26px)",
            lineHeight: 1.45,
          }}
        >
          This page hit a{" "}
          <em
            style={{
              fontVariationSettings: "'opsz' 60, 'SOFT' 100",
              color: "#e9b27a",
            }}
          >
            wrong note.
          </em>{" "}
          The track you were after isn&apos;t in this set.
        </p>

        <div className="flex flex-wrap gap-4 mt-12">
          <Link href="/" className="btn-primary">
            Back to Main Stage →
          </Link>
          <Link href="/shows" className="btn-secondary">
            See Live Shows
          </Link>
        </div>

        <p className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-50 mt-16">
          Lost? Try the navigation up top — or{" "}
          <Link
            href="/#contact"
            className="underline underline-offset-4 hover:text-[#c14a1a]"
          >
            drop Rob a line
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
