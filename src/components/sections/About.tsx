import Image from "next/image";

const stats = [
  { icon: "🎸", label: "15+ Years Performing" },
  { icon: "🎤", label: "100+ Live Venues" },
  { icon: "📍", label: "Based in Gqeberha" },
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#0a0a0a] py-20 md:py-[100px] px-6"
    >
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-stretch">
        <div className="relative h-[420px] md:h-[560px] border-l-2 border-[#cc2929]">
          <Image
            src="https://images.unsplash.com/photo-1525362081669-2b476bb628c3?w=900&q=85&fm=webp"
            alt="Rob Thompson playing acoustic Delta blues guitar"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
          />
        </div>

        <div className="md:pl-10 flex flex-col justify-center">
          <p
            className="text-[#cc2929] uppercase mb-4"
            style={{
              fontFamily: "var(--font-oswald)",
              fontSize: 13,
              letterSpacing: "0.2em",
              fontWeight: 500,
            }}
          >
            About Rob
          </p>
          <h2
            className="text-white mb-6"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(36px, 5vw, 52px)",
              lineHeight: 1,
            }}
          >
            Gqeberha&apos;s Premier Blues Guitarist
          </h2>
          <p
            className="text-[#bbb] mb-6"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 17,
              lineHeight: 1.7,
            }}
          >
            Rob Thompson is Gqeberha&apos;s most celebrated Delta blues and rock
            guitarist — delivering raw, soulful performances that move rooms and
            fill venues across the Eastern Cape. From intimate speakeasy sets to
            headline shows, Rob brings the spirit of the Mississippi Delta to the
            South African stage.
          </p>
          <blockquote
            className="border-l-2 border-[#cc2929] pl-5 my-6 text-[#ddd] italic"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 17,
              lineHeight: 1.6,
            }}
          >
            “The blues isn&apos;t just music — it&apos;s a conversation between
            the guitar and the soul.”
          </blockquote>
          <ul className="flex flex-wrap gap-6 mt-4">
            {stats.map((s) => (
              <li
                key={s.label}
                className="text-[#999]"
                style={{ fontFamily: "var(--font-oswald)", fontSize: 14 }}
              >
                <span className="mr-2">{s.icon}</span>
                {s.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
