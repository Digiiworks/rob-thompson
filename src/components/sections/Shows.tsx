import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import ShowCard from "./ShowCard";
import { getUpcomingPerformances } from "@/lib/performances";

export default async function Shows() {
  const performances = await getUpcomingPerformances();

  return (
    <section
      id="shows"
      className="bg-[#0a0a0a] py-20 md:py-[100px] px-6 border-t border-[#1a1a1a]"
    >
      <SectionTitle
        eyebrow="What's On"
        title="Upcoming Live Performances in Gqeberha"
        subtitle="Catch Rob Thompson live across Gqeberha, Port Elizabeth and the Eastern Cape"
      />

      <div className="max-w-[1200px] mx-auto mt-14">
        {performances.length === 0 ? (
          <div className="text-center py-16">
            <p
              className="text-[#999] mb-6"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: 18 }}
            >
              No upcoming shows scheduled. Check back soon — or book Rob for your
              next event.
            </p>
            <Link
              href="/book"
              className="text-[#cc2929] uppercase border-b border-[#cc2929] pb-1"
              style={{
                fontFamily: "var(--font-oswald)",
                fontSize: 14,
                letterSpacing: "0.15em",
              }}
            >
              Book Rob
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {performances.map((p) => (
              <ShowCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
