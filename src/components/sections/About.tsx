import Image from "next/image";

const stats = [
  { n: "15+", label: "Years on stage" },
  { n: "100+", label: "Live venues" },
  { n: "01", label: "Hometown — Gqeberha" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-[#16110e] text-[#f3ebdc] dark-zone py-24 md:py-36 px-6 md:px-10 overflow-hidden"
    >
      {/* Section number */}
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-60">
            002 / The Player
          </span>
          <span className="hairline flex-1 max-w-[160px]" />
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
          {/* Image — left, offset */}
          <div className="md:col-span-5 md:col-start-1">
            <div
              className="relative aspect-[4/5] border border-[#f3ebdc]/30"
              style={{ boxShadow: "10px 10px 0 #7a1818" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1525362081669-2b476bb628c3?w=900&q=85&fm=webp"
                alt="Rob Thompson playing acoustic Delta blues guitar"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
            </div>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-50 mt-4">
              Photo · Live at Nineteen33 · Gqeberha
            </p>
          </div>

          {/* Copy — right, narrower */}
          <div className="md:col-span-6 md:col-start-7">
            <h2
              style={{
                fontSize: "clamp(48px, 7.5vw, 110px)",
                lineHeight: 0.85,
              }}
            >
              The Eastern
              <br />
              Cape&apos;s Own
              <br />
              <em
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontVariationSettings: "'opsz' 144, 'SOFT' 100",
                  color: "#c14a1a",
                  fontSize: "0.92em",
                  fontStyle: "italic",
                  fontWeight: 400,
                  textTransform: "none",
                  letterSpacing: "-0.02em",
                }}
              >
                bluesman.
              </em>
            </h2>

            <p
              className="mt-10 text-[#e7dec8] max-w-xl"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: 19,
                lineHeight: 1.55,
              }}
            >
              Rob Thompson plays the kind of blues you feel in your ribs.
              Born and raised in Gqeberha, he&apos;s spent the better part of
              two decades dragging Delta licks, slide guitar and Mississippi
              grit across every stage from speakeasies to festival main stages
              up and down the Eastern Cape.
            </p>

            <blockquote
              className="mt-10 pl-6 border-l-2 border-[#7a1818]"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: 22,
                lineHeight: 1.4,
                fontStyle: "italic",
                fontVariationSettings: "'opsz' 60, 'SOFT' 100",
                color: "#fbf6ec",
              }}
            >
              “The blues isn&apos;t just music — it&apos;s a conversation
              between the guitar and the soul.”
            </blockquote>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-[#f3ebdc]/20 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p
                    style={{
                      fontFamily: "var(--font-anton)",
                      fontSize: "clamp(40px, 5vw, 64px)",
                      lineHeight: 0.9,
                      color: "#c14a1a",
                    }}
                  >
                    {s.n}
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.16em] uppercase opacity-70 mt-2">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
