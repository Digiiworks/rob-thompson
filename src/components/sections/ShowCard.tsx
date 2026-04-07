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
  const monthYear = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  const time = formatTime(p.start_time);

  return (
    <article className="bg-[#1a1a1a] border border-[#2a2a2a] p-8 flex flex-col">
      <div>
        <p
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: 56,
            color: "#cc2929",
            lineHeight: 0.9,
          }}
        >
          {day}
        </p>
        <p
          className="text-[#999] uppercase mt-1"
          style={{
            fontFamily: "var(--font-oswald)",
            fontSize: 13,
            letterSpacing: "0.15em",
          }}
        >
          {monthYear}
        </p>
      </div>

      <div className="my-5 h-px bg-[#cc2929]" />

      <h3
        className="text-white"
        style={{
          fontFamily: "var(--font-oswald)",
          fontSize: 19,
          fontWeight: 600,
          lineHeight: 1.3,
        }}
      >
        {p.venue_name}
      </h3>
      {p.venue_address && (
        <p
          className="text-[#999] mt-2"
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14 }}
        >
          {p.venue_address}
        </p>
      )}
      {time && (
        <p
          className="text-[#999] mt-1"
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14 }}
        >
          {time}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-6">
        <span
          className="text-white"
          style={{ fontFamily: "var(--font-oswald)", fontSize: 15 }}
        >
          {p.ticket_price ? `R${p.ticket_price.toFixed(0)}` : "Free Entry"}
        </span>
        {p.is_sold_out ? (
          <span
            className="px-3 py-1 bg-[#2a2a2a] text-[#999] uppercase"
            style={{
              fontFamily: "var(--font-oswald)",
              fontSize: 12,
              letterSpacing: "0.15em",
            }}
          >
            Sold Out
          </span>
        ) : p.ticket_url ? (
          <a
            href={p.ticket_url}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#cc2929] text-[#cc2929] px-4 py-2 uppercase hover:bg-[#cc2929] hover:text-white transition-colors"
            style={{
              fontFamily: "var(--font-oswald)",
              fontSize: 12,
              letterSpacing: "0.15em",
            }}
          >
            Get Tickets
          </a>
        ) : (
          <span
            className="text-[#666] uppercase"
            style={{
              fontFamily: "var(--font-oswald)",
              fontSize: 12,
              letterSpacing: "0.15em",
            }}
          >
            Free Entry
          </span>
        )}
      </div>
    </article>
  );
}
