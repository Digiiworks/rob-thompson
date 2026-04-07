import Link from "next/link";
import ShowCard from "./ShowCard";
import { getUpcomingPerformances } from "@/lib/performances";

export default async function Shows() {
  const performances = await getUpcomingPerformances();

  return (
    <section
      id="shows"
      className="relative bg-[#f3ebdc] text-[#16110e] py-24 md:py-36 px-6 md:px-10"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-60">
            003 / Tour Schedule
          </span>
          <span className="hairline flex-1 max-w-[160px]" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <h2
            style={{
              fontSize: "clamp(54px, 8.5vw, 130px)",
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

        {performances.length === 0 ? (
          <div className="text-center py-24 border-y border-[#16110e]/20">
            <p
              className="opacity-70 mb-6"
              style={{ fontFamily: "var(--font-fraunces)", fontSize: 19 }}
            >
              No shows on the books right now. Check back soon — or hire Rob
              for your next event.
            </p>
            <Link href="/book" className="btn-primary">
              Book Rob →
            </Link>
          </div>
        ) : (
          <div>
            {performances.map((p) => (
              <ShowCard key={p.id} p={p} />
            ))}
            <div className="border-t border-[#16110e]/20" />
          </div>
        )}
      </div>
    </section>
  );
}
