import Link from "next/link";
import { Camera } from "lucide-react";
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
      {/* Oversized wordmark */}
      <div className="border-b border-[#f3ebdc]/15 px-6 md:px-10 pt-16 pb-10">
        <div className="max-w-[1400px] mx-auto">
          <p
            className="leading-[0.78] tracking-[-0.01em]"
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(96px, 18vw, 280px)",
              color: "#f3ebdc",
            }}
          >
            ROB&nbsp;
            <em
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#c14a1a",
                fontVariationSettings: "'opsz' 144, 'SOFT' 100",
              }}
            >
              T.
            </em>
          </p>
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
            className="hover:text-[#c14a1a]"
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: 18,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Digiiworks
          </a>
        </div>
      </div>

      <div className="border-t border-[#f3ebdc]/15 px-6 md:px-10 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-3 font-mono text-[10px] tracking-[0.18em] uppercase opacity-60">
          <span>© {new Date().getFullYear()} Rob Thompson · All Rights Reserved</span>
          <span>Gqeberha · Eastern Cape · ZA</span>
        </div>
      </div>

      <p
        aria-hidden="true"
        style={{
          fontSize: 1,
          color: "transparent",
          position: "absolute",
          left: -9999,
        }}
      >
        Rob Thompson | Delta Blues Musician | Gqeberha | Port Elizabeth | Eastern
        Cape | South Africa | live music | book musician | wedding band | private
        event entertainment
      </p>
    </footer>
  );
}
