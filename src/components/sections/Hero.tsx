import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1920&q=85&fm=webp"
        alt="Rob Thompson — blues guitarist performing live on a dark stage in Gqeberha"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(10,10,10,0.85) 100%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p
          className="text-[#cc2929] uppercase mb-5"
          style={{
            fontFamily: "var(--font-oswald)",
            fontSize: 14,
            letterSpacing: "0.25em",
            fontWeight: 500,
          }}
        >
          Live in Gqeberha, Eastern Cape
        </p>
        <h1
          className="text-white"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(64px, 12vw, 120px)",
            lineHeight: 0.9,
            letterSpacing: "0.02em",
          }}
        >
          ROB THOMPSON
        </h1>
        <p
          className="text-[#bbb] mt-6 mb-10"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(16px, 2vw, 20px)",
            fontWeight: 300,
          }}
        >
          Delta Blues &amp; Rock &nbsp;|&nbsp; Gqeberha, Eastern Cape
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/book">Book Rob Now</Button>
          <Button href="/shows" variant="secondary">
            Upcoming Shows
          </Button>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(to right, transparent, #cc2929, transparent)",
        }}
      />
    </section>
  );
}
