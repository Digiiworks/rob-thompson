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
    <footer className="bg-[#0a0a0a] border-t-2 border-[#cc2929]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <p
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: 28,
              color: "#cc2929",
              letterSpacing: "0.04em",
            }}
          >
            ROB THOMPSON
          </p>
          <p
            className="text-[#999] mt-2"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14 }}
          >
            Delta Blues &amp; Rock | Gqeberha
          </p>
        </div>

        <ul className="flex flex-col md:flex-row md:justify-center gap-4 md:gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[#666] hover:text-white transition-colors uppercase"
                style={{
                  fontFamily: "var(--font-oswald)",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col md:items-end gap-3">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Camera"
            className="text-[#999] hover:text-[#cc2929] transition-colors"
          >
            <Camera size={22} />
          </a>
          <a
            href="https://digiiworks.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666] hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-oswald)", fontSize: 12, letterSpacing: "0.1em" }}
          >
            Website by DigiWorks
          </a>
        </div>
      </div>

      <div className="border-t border-[#1a1a1a]">
        <div className="max-w-[1200px] mx-auto px-6 py-6 text-center">
          <p
            className="text-[#444]"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13 }}
          >
            © {new Date().getFullYear()} Rob Thompson. All rights reserved.
          </p>
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
