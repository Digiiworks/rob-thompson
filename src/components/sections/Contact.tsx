import { Phone, Mail, Camera } from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/utils";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#0a0a0a] py-20 md:py-[100px] px-6 border-t border-[#1a1a1a]"
    >
      <div className="max-w-2xl mx-auto bg-[#1a1a1a] border border-[#2a2a2a] p-10 md:p-14 text-center">
        <p
          className="text-[#cc2929] uppercase mb-4"
          style={{
            fontFamily: "var(--font-oswald)",
            fontSize: 13,
            letterSpacing: "0.2em",
            fontWeight: 500,
          }}
        >
          Contact
        </p>
        <h2
          className="text-white"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(40px, 6vw, 56px)",
            lineHeight: 1,
          }}
        >
          Get in Touch — Bookings &amp; Enquiries
        </h2>
        <p
          className="text-[#999] mt-4"
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16 }}
        >
          Based in Gqeberha (Port Elizabeth), Eastern Cape, South Africa
        </p>

        <ul className="mt-10 space-y-5 text-left max-w-md mx-auto">
          <li className="flex items-center gap-4">
            <Phone size={20} className="text-[#cc2929] shrink-0" />
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="text-white hover:text-[#cc2929]"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16 }}
            >
              {SITE.phone}
            </a>
          </li>
          <li className="flex items-center gap-4">
            <Mail size={20} className="text-[#cc2929] shrink-0" />
            <a
              href={`mailto:${SITE.email}`}
              className="text-white hover:text-[#cc2929] break-all"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16 }}
            >
              {SITE.email}
            </a>
          </li>
          <li className="flex items-center gap-4">
            <Camera size={20} className="text-[#cc2929] shrink-0" />
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#cc2929]"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16 }}
            >
              @robthompsonband
            </a>
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button href={SITE.whatsapp} external>
            WhatsApp Rob
          </Button>
          <Button href="/book" variant="secondary">
            Book Online
          </Button>
        </div>
      </div>
    </section>
  );
}
