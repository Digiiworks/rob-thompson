import Link from "next/link";
import { Phone, Mail } from "lucide-react";

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
  </svg>
);
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
              <ContactRow icon={<InstagramIcon size={18} />} label="Instagram" value="@robthompsonband" href={SITE.instagram} external />
              <ContactRow icon={<FacebookIcon size={18} />} label="Facebook" value="/RobThompsonBand" href={SITE.facebook} external />
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
