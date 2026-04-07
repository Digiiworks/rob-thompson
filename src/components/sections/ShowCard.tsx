import Image from "next/image";
import type { Performance } from "@/lib/performances";

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

function formatTime(t: string | null) {
  if (!t) return null;
  const [h, m] = t.split(":");
  return `${h}:${m}`;
}

export default function ShowCard({ p }: { p: Performance }) {
  const d = new Date(p.event_date + "T00:00:00");
  const day = d.getDate();
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();
  const time = formatTime(p.start_time);

  return (
    <article className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center py-10 border-t border-[#16110e]/20 first:border-t-0 hover:bg-[#16110e] hover:text-[#f3ebdc] hover:dark-zone transition-colors duration-300 cursor-default">
      {/* Mobile: poster + date side-by-side. Desktop: contents → both become direct grid children */}
      <div className="flex items-center gap-5 md:contents">
        {/* Poster */}
        {p.poster_url && (
          <div className="md:col-span-2 md:pl-6 shrink-0">
            <div
              className="relative aspect-[3/4] w-[120px] md:w-full md:max-w-[140px] border border-current/20 overflow-hidden shadow-[6px_6px_0_rgba(122,24,24,0.85)] group-hover:shadow-[6px_6px_0_#c14a1a] transition-shadow"
            >
              <Image
                src={p.poster_url}
                alt={`${p.title} poster`}
                fill
                sizes="140px"
                className="object-cover poster-img"
              />
            </div>
          </div>
        )}

        {/* Day */}
        <div className={p.poster_url ? "md:col-span-2 flex-1 md:flex-none" : "md:col-span-3 md:pl-6 flex-1 md:flex-none"}>
          <div className="flex items-baseline gap-3">
            <span
              style={{
                fontFamily: "var(--font-anton)",
                fontSize: "clamp(56px, 8vw, 120px)",
                lineHeight: 0.85,
              }}
              className="group-hover:text-[#c14a1a] transition-colors"
            >
              {day}
            </span>
            <span
              className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-70"
              style={{ alignSelf: "flex-start", marginTop: 10 }}
            >
              {month}<br />{year}
            </span>
          </div>
        </div>
      </div>

      {/* Title + venue */}
      <div className={p.poster_url ? "md:col-span-5" : "md:col-span-6"}>
        <h3
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(22px, 2.4vw, 32px)",
            fontWeight: 500,
            lineHeight: 1.15,
            textTransform: "none",
            letterSpacing: "-0.01em",
          }}
        >
          {p.title}
        </h3>
        <p
          className="mt-3 opacity-80"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: 17,
            lineHeight: 1.4,
          }}
        >
          {p.venue_name}
          {p.venue_address && (
            <>
              {" "}
              <span className="opacity-60">— {p.venue_address}</span>
            </>
          )}
        </p>
        {time && (
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-60 mt-3">
            Doors {time}
          </p>
        )}
      </div>

      {/* Price + CTA */}
      <div className="md:col-span-3 md:text-right md:pr-6 flex md:flex-col md:items-end gap-4 md:gap-3">
        <span
          style={{
            fontFamily: "var(--font-anton)",
            fontSize: 28,
            color: "#7a1818",
          }}
          className="group-hover:text-[#c14a1a] transition-colors"
        >
          {p.ticket_price ? `R${p.ticket_price.toFixed(0)}` : "FREE"}
        </span>
        {p.is_sold_out ? (
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-60">
            ◆ Sold Out
          </span>
        ) : p.ticket_url ? (
          <a
            href={p.ticket_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 hover:text-[#c14a1a] transition-colors"
          >
            Get Tickets →
          </a>
        ) : p.ticket_price ? (
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-60">
            ◆ Admission
          </span>
        ) : (
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-60">
            ◆ Free Entry
          </span>
        )}
      </div>
    </article>
  );
}
