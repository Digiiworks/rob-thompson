import Image from "next/image";

const images = [
  { src: "/photos/rob-01.jpg", alt: "Rob Thompson live on stage", span: "md:col-span-8", h: "h-[360px] md:h-[560px]" },
  { src: "/photos/rob-02.jpg", alt: "Rob Thompson performing",     span: "md:col-span-4", h: "h-[260px] md:h-[560px]" },
  { src: "/photos/rob-03.jpg", alt: "Rob Thompson acoustic set",   span: "md:col-span-4", h: "h-[260px] md:h-[440px]" },
  { src: "/photos/rob-04.jpg", alt: "Rob Thompson live",           span: "md:col-span-5", h: "h-[260px] md:h-[440px]" },
  { src: "/photos/rob-01.jpg", alt: "Rob Thompson on stage",       span: "md:col-span-3", h: "h-[260px] md:h-[440px]" },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative bg-[#16110e] text-[#f3ebdc] dark-zone py-24 md:py-36 px-6 md:px-10"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-60">
            005 / Field Notes
          </span>
          <span className="hairline flex-1 max-w-[160px]" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <h2 style={{ fontSize: "clamp(54px, 8vw, 130px)", lineHeight: 0.85 }}>
            Live<br />
            <em
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontWeight: 400,
                textTransform: "none",
                color: "#c14a1a",
                fontVariationSettings: "'opsz' 144",
              }}
            >
              on stage.
            </em>
          </h2>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-60 max-w-xs md:text-right">
            A handful of nights, years deep into a long catalogue.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-4 md:gap-6">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={`relative overflow-hidden border border-[#f3ebdc]/20 ${img.span} ${img.h}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-[1.04] transition-transform duration-700"
              />
              <span className="absolute bottom-3 left-3 font-mono text-[9px] tracking-[0.2em] uppercase text-[#f3ebdc]/80 bg-[#16110e]/60 px-2 py-1">
                {String(i + 1).padStart(3, "0")} / Live
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
