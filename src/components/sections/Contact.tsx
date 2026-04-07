import Link from "next/link";
import { Phone, Mail, Camera, Facebook } from "lucide-react";
import { SITE } from "@/lib/utils";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-[#f3ebdc] text-[#16110e] py-24 md:py-36 px-6 md:px-10"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-60">
            006 / Get In Touch
          </span>
          <span className="hairline flex-1 max-w-[160px]" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-end">
          <div className="lg:col-span-7">
            <h2 style={{ fontSize: "clamp(54px, 9vw, 140px)", lineHeight: 0.85 }}>
              Drop
              <br />
              Rob a<br />
              <em
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  textTransform: "none",
                  color: "#7a1818",
                  fontVariationSettings: "'opsz' 144, 'SOFT' 100",
                }}
              >
                line.
              </em>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p
              className="opacity-80"
              style={{ fontFamily: "var(--font-fraunces)", fontSize: 18, lineHeight: 1.55 }}
            >
              Based in Gqeberha (Port Elizabeth), Eastern Cape. Easiest way to
              reach Rob is WhatsApp — but the inbox stays open too.
            </p>

            <ul className="mt-10 space-y-6 border-t border-[#16110e]/20 pt-8">
              <ContactRow icon={<Phone size={18} />} label="Bookings & Enquiries" value={SITE.phone} href={`tel:${SITE.phoneRaw}`} />
              <ContactRow icon={<Mail size={18} />} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
              <ContactRow icon={<Camera size={18} />} label="Instagram" value="@robthompsonband" href={SITE.instagram} external />
              <ContactRow icon={<Facebook size={18} />} label="Facebook" value="/RobThompsonBand" href={SITE.facebook} external />
            </ul>

            <div className="flex flex-wrap gap-4 mt-10">
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
                WhatsApp Rob →
              </a>
              <Link href="/book" className="btn-secondary">
                Book Online
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <li className="group">
      <p className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-60 mb-1">
        {label}
      </p>
      <a
        href={href}
        {...linkProps}
        className="flex items-center gap-3 hover:text-[#7a1818] transition-colors"
        style={{ fontFamily: "var(--font-fraunces)", fontSize: 22, fontWeight: 500 }}
      >
        <span className="text-[#7a1818] opacity-80">{icon}</span>
        {value}
      </a>
    </li>
  );
}
