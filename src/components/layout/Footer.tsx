import Link from "next/link";
import Image from "next/image";
import { Camera } from "lucide-react";

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);
import { SITE } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/shows", label: "Shows" },
  { href: "/book", label: "Book" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#16110e] text-[#f3ebdc] dark-zone overflow-hidden">
      {/* Oversized wordmark — stacked editorial */}
      <div className="relative border-b border-[#f3ebdc]/15 px-6 md:px-10 pt-20 pb-12 overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative">
          {/* Coordinates / meta strip */}
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase opacity-50 mb-8">
            <span>33° 57′ S · 25° 36′ E</span>
            <span className="hidden sm:inline">Side B / Outro</span>
            <span>Est. MMIX</span>
          </div>

          {/* Stacked wordmark — DELTA / & ROCK */}
          <div className="relative">
            <h2
              className="text-[#f3ebdc]"
              style={{
                fontFamily: "var(--font-anton)",
                fontSize: "clamp(72px, 14vw, 220px)",
                lineHeight: 0.82,
                letterSpacing: "-0.015em",
                textShadow: "0 2px 30px rgba(0,0,0,0.55)",
              }}
            >
              DELTA
              <br />
              <span className="inline-flex items-baseline gap-4 md:gap-8">
                <em
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#c14a1a",
                    fontVariationSettings: "'opsz' 144, 'SOFT' 100",
                    fontSize: "0.95em",
                    lineHeight: 1,
                  }}
                >
                  &amp;
                </em>
                ROCK
              </span>
            </h2>

            {/* Tagline tucked under */}
            <p
              className="absolute right-0 bottom-2 hidden md:block max-w-[280px] text-right opacity-80"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: 17,
                lineHeight: 1.45,
                color: "#e9b27a",
                fontVariationSettings: "'opsz' 60, 'SOFT' 100",
              }}
            >
              Six strings, fifteen years deep, one Eastern Cape bluesman.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-60 mb-3">
            ◆ The Player
          </p>
          <p style={{ fontFamily: "var(--font-fraunces)", fontSize: 17, lineHeight: 1.55 }}>
            Rob Thompson — Delta blues &amp; rock guitarist. Based in
            Gqeberha, available across the Eastern Cape and beyond.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-60 mb-4">
            ◆ Sitemap
          </p>
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:text-[#c14a1a] transition-colors"
                  style={{
                    fontFamily: "var(--font-anton)",
                    fontSize: 16,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-60 mb-4">
            ◆ Direct
          </p>
          <ul className="space-y-2" style={{ fontFamily: "var(--font-fraunces)", fontSize: 16 }}>
            <li><a href={`tel:${SITE.phoneRaw}`} className="hover:text-[#c14a1a]">{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`} className="hover:text-[#c14a1a] break-all">{SITE.email}</a></li>
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#c14a1a]"
              >
                <Camera size={16} /> @robthompsonband
              </a>
            </li>
            <li>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#c14a1a]"
              >
                <FacebookIcon size={16} /> /RobThompsonBand
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 md:text-right">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-60 mb-4">
            ◆ Built by
          </p>
          <a
            href="https://digiiworks.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:opacity-100 opacity-80 transition-opacity"
          >
            <Image
              src="/digiiworks-logo.svg"
              alt="Built by Digiiworks"
              width={140}
              height={32}
              className="md:ml-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </a>
        </div>
      </div>

      <div className="border-t border-[#f3ebdc]/15 px-6 md:px-10 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-3 font-mono text-[10px] tracking-[0.18em] uppercase opacity-60">
          <span>© {new Date().getFullYear()} Rob Thompson · All Rights Reserved</span>
          <span>Gqeberha · Eastern Cape · ZA</span>
        </div>
      </div>

    </footer>
  );
}
