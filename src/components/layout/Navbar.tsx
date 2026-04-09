"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home", n: "01" },
  { href: "/#about", label: "About", n: "02" },
  { href: "/shows", label: "Shows", n: "03" },
  { href: "/gallery", label: "Gallery", n: "04" },
  { href: "/book", label: "Book", n: "05" },
  { href: "/contact", label: "Contact", n: "06" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      e.preventDefault();
      router.push("/");
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      );
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-[#f3ebdc]/95 backdrop-blur-sm border-b border-[#16110e]/15 py-3 text-[#16110e]"
          : "bg-gradient-to-b from-[#0b0805]/80 to-transparent py-6 text-[#f3ebdc]"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <Link href="/" onClick={handleLogoClick} className="flex items-baseline gap-3 text-current cursor-pointer">
          <span
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: scrolled ? 22 : 26,
              letterSpacing: "0.04em",
              transition: "font-size .25s",
            }}
          >
            ROB&nbsp;THOMPSON
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-60">
            EST. 2009
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex items-baseline gap-1 text-current hover:text-[#7a1818] transition-colors"
              >
                <span className="font-mono text-[10px] opacity-50">{l.n}</span>
                <span
                  style={{
                    fontFamily: "var(--font-anton)",
                    fontSize: 15,
                    letterSpacing: "0.12em",
                  }}
                >
                  {l.label}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/book" className="btn-primary !py-3 !px-5 text-[12px]">
              Book Rob →
            </Link>
          </li>
        </ul>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-current p-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[#16110e] text-[#f3ebdc] dark-zone">
          <ul className="flex flex-col p-8 gap-6">
            {links.map((l) => (
              <li key={l.href} className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] opacity-60">{l.n}</span>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-anton)",
                    fontSize: 26,
                    letterSpacing: "0.05em",
                  }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="btn-primary"
              >
                Book Rob →
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
