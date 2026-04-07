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
    <article className="group relative grid grid-cols-12 gap-6 items-baseline py-10 border-t border-[#16110e]/20 first:border-t-0 hover:bg-[#16110e] hover:text-[#f3ebdc] hover:dark-zone transition-colors duration-300 cursor-default">
      {/* Day */}
      <div className="col-span-3 md:col-span-2 pl-2 md:pl-6">
        <div className="flex items-baseline gap-1">
          <span
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(72px, 10vw, 132px)",
              lineHeight: 0.85,
            }}
            className="group-hover:text-[#c14a1a] transition-colors"
          >
            {day}
          </span>
          <span
            className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-70"
            style={{ alignSelf: "flex-start", marginTop: 8 }}
          >
            {month}<br />{year}
          </span>
        </div>
      </div>

      {/* Title + venue */}
      <div className="col-span-9 md:col-span-7">
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
      <div className="col-span-12 md:col-span-3 md:text-right pr-2 md:pr-6 flex md:flex-col md:items-end gap-4 md:gap-3">
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
        ) : (
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-60">
            ◆ Free Entry
          </span>
        )}
      </div>
    </article>
  );
}
