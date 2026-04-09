"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    // Respect users who prefer reduced motion — skip parallax.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    let ticking = false;
    const update = () => {
      // translate background at ~40% of scroll — transform-based so it
      // works on iOS/Android (background-attachment: fixed is broken on mobile).
      const y = window.scrollY * 0.4;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0b0805] text-[#f3ebdc] dark-zone">
      {/* Full-bleed background — close-up blues guitarist (parallax) */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[15%] h-[130%] will-change-transform"
      >
        <Image
          src="/photos/vectorink-upscaled-image.jpg"
          alt="Rob Thompson playing his Les Paul live — blues and rock guitarist from Gqeberha"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={85}
          className="object-cover object-center opacity-95"
        />
      </div>
      {/* Painterly gradient overlay — vignette + bottom fade to cream for marquee handoff */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(120% 90% at 70% 40%, rgba(11,8,5,0.20) 0%, rgba(11,8,5,0.70) 55%, rgba(11,8,5,0.92) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,8,5,0.85) 0%, rgba(11,8,5,0) 22%, rgba(11,8,5,0) 60%, rgba(11,8,5,0.95) 100%)",
        }}
      />

      {/* Top hairline meta bar */}
      <div className="absolute top-24 md:top-28 left-0 right-0 z-20 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase opacity-80">
          <span>33° 57′ S &nbsp;·&nbsp; 25° 36′ E</span>
          <span className="hidden sm:block">Gqeberha · Eastern Cape · ZA</span>
          <span>Vol. 01 / Side A</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-44 md:pt-52 pb-32 md:pb-40">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          {/* Big numbered label */}
          <div className="md:col-span-3 order-2 md:order-1">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-70 mb-3">
              Now playing
            </p>
            <p
              className="text-[#c14a1a]"
              style={{
                fontFamily: "var(--font-anton)",
                fontSize: 38,
                lineHeight: 0.9,
                letterSpacing: "0.02em",
              }}
            >
              BLUES<br />&amp; ROCK
            </p>
          </div>

          {/* Massive headline */}
          <div className="md:col-span-9 order-1 md:order-2">
            <h1
              style={{
                fontFamily: "var(--font-anton)",
                fontSize: "clamp(68px, 13vw, 180px)",
                lineHeight: 0.82,
                letterSpacing: "-0.015em",
                textShadow: "0 2px 30px rgba(0,0,0,0.55)",
              }}
            >
              ROB
              <br />
              THOMPSON
            </h1>
          </div>
        </div>

        {/* Bottom row — quote and CTAs */}
        <div className="grid md:grid-cols-12 gap-8 mt-16 md:mt-24 items-end">
          <div className="md:col-span-7">
            <p
              className="max-w-2xl"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(18px, 1.55vw, 22px)",
                lineHeight: 1.5,
                fontWeight: 400,
                color: "#f3ebdc",
              }}
            >
              Raw, soul-on-the-floor blues from the Eastern Cape.
              <em
                style={{
                  fontVariationSettings: "'opsz' 60, 'SOFT' 100",
                  color: "#e9b27a",
                }}
              >
                {" "}
                Fifteen years on stage. A hundred venues deep.{" "}
              </em>
              Available for private events, weddings, corporate nights and
              anywhere a six-string deserves to be heard.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/book" className="btn-primary">
                Book Rob →
              </Link>
              <Link href="/shows" className="btn-secondary">
                Upcoming Shows
              </Link>
            </div>
          </div>

          {/* Side meta column */}
          <div className="md:col-span-4 md:col-start-9 md:text-right">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-70 mb-2">
              ◆ Live Booking
            </p>
            <p
              style={{
                fontFamily: "var(--font-anton)",
                fontSize: 30,
                letterSpacing: "0.04em",
                color: "#f3ebdc",
              }}
            >
              BOOKINGS AVAILABLE
            </p>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-60 mt-1">
              CONTACT ROB · FOR AVAILABLE DATES
            </p>
          </div>
        </div>
      </div>

      {/* Marquee strip — black → cream handoff */}
      <div className="relative z-[5] border-y border-[#f3ebdc]/20 bg-[#16110e] overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap py-5 md:py-7">
          {Array.from({ length: 2 }).map((_, copy) => (
            <div key={copy} className="flex shrink-0">
              {[
                "GQEBERHA",
                "BLUES & ROCK",
                "EASTERN CAPE",
                "LIVE GUITAR",
                "PORT ELIZABETH",
                "ROCK & SOUL",
                "BOOK NOW",
              ].map((word, i) => (
                <span
                  key={`${copy}-${i}`}
                  className="flex items-center gap-10 px-10"
                  style={{
                    fontFamily: "var(--font-anton)",
                    fontSize: "clamp(38px, 6vw, 88px)",
                    letterSpacing: "0.02em",
                    color: "#f3ebdc",
                  }}
                >
                  {word}
                  <span
                    style={{
                      color: "#c14a1a",
                      fontSize: "0.6em",
                      fontFamily: "var(--font-fraunces)",
                      fontStyle: "italic",
                    }}
                  >
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
