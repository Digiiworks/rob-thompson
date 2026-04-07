import Link from "next/link";
import ShowCard from "./ShowCard";
import { getUpcomingPerformances, getPastPerformances } from "@/lib/performances";

export default async function Shows() {
  const [upcoming, past] = await Promise.all([
    getUpcomingPerformances(),
    getPastPerformances(10),
  ]);

  return (
    <section
      id="shows"
      className="relative bg-[#f3ebdc] text-[#16110e] py-24 md:py-32 px-6 md:px-10"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-60">
            003 / Tour Schedule
          </span>
          <span className="hairline flex-1 max-w-[160px]" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <h2
            style={{
              fontSize: "clamp(48px, 7vw, 110px)",
              lineHeight: 0.85,
              maxWidth: 900,
            }}
          >
            Upcoming
            <br />
            Live Shows<span style={{ color: "#7a1818" }}>.</span>
          </h2>
          <p
            className="md:max-w-xs md:text-right opacity-80"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: 17,
              lineHeight: 1.5,
            }}
          >
            Catch Rob live across Gqeberha, Port Elizabeth and the
            Eastern Cape. Want him at your event?{" "}
            <Link
              href="/book"
              className="text-[#7a1818] underline underline-offset-4 italic"
              style={{ fontVariationSettings: "'opsz' 60, 'SOFT' 100" }}
            >
              Book a date.
            </Link>
          </p>
        </div>

        {upcoming.length === 0 ? (
          <div className="text-center py-16 border-y border-[#16110e]/20">
            <p
              className="opacity-70 mb-6"
              style={{ fontFamily: "var(--font-fraunces)", fontSize: 19 }}
            >
              No shows on the books right now. Hire Rob for your next event.
            </p>
            <Link href="/book" className="btn-primary">
              Book Rob →
            </Link>
          </div>
        ) : (
          <div>
            {upcoming.map((p) => (
              <ShowCard key={p.id} p={p} />
            ))}
            <div className="border-t border-[#16110e]/20" />
          </div>
        )}

        {/* Past shows */}
        {past.length > 0 && (
          <div className="mt-24">
            <div className="flex items-end justify-between mb-10">
              <h3
                style={{
                  fontSize: "clamp(32px, 4.5vw, 64px)",
                  lineHeight: 0.9,
                }}
              >
                Past<br />
                <em
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontStyle: "italic",
                    textTransform: "none",
                    color: "#7a1818",
                    fontVariationSettings: "'opsz' 144",
                    fontWeight: 400,
                  }}
                >
                  shows.
                </em>
              </h3>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-60">
                {past.length} archived
              </span>
            </div>
            <div className="opacity-90">
              {past.map((p) => (
                <ShowCard key={p.id} p={p} />
              ))}
              <div className="border-t border-[#16110e]/20" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
