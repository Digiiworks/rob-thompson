"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/shows", label: "Shows" },
  { href: "/book", label: "Book Rob" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        scrolled
          ? "bg-[rgba(10,10,10,0.95)] backdrop-blur-md border-b border-[#2a2a2a]"
          : "bg-transparent",
      )}
    >
      <nav className="max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: 28,
            color: "#cc2929",
            letterSpacing: "0.04em",
          }}
        >
          ROB THOMPSON
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[#999] hover:text-white transition-colors uppercase"
                style={{
                  fontFamily: "var(--font-oswald)",
                  fontSize: 14,
                  letterSpacing: "0.1em",
                  fontWeight: 500,
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button href="/book">Book Now</Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-white p-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[#111] border-t border-[#2a2a2a]">
          <ul className="flex flex-col p-6 gap-5">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-white uppercase block"
                  style={{
                    fontFamily: "var(--font-oswald)",
                    fontSize: 16,
                    letterSpacing: "0.1em",
                  }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Button href="/book" className="w-full">
                Book Now
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
