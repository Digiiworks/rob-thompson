import Image from "next/image";

const images = [
  {
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=85&fm=webp",
    alt: "Rob Thompson live on stage with electric guitar",
    span: "md:col-span-7 md:row-span-2",
    h: "h-[520px] md:h-full",
  },
  {
    src: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=1200&q=85&fm=webp",
    alt: "Acoustic blues guitar performance close-up",
    span: "md:col-span-5",
    h: "h-[320px]",
  },
  {
    src: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=1200&q=85&fm=webp",
    alt: "Live music crowd in dark venue",
    span: "md:col-span-5",
    h: "h-[280px]",
  },
  {
    src: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=1200&q=85&fm=webp",
    alt: "Blues guitarist silhouetted by stage lights",
    span: "md:col-span-4",
    h: "h-[420px]",
  },
  {
    src: "https://images.unsplash.com/photo-1466428996289-fb355538da1b?w=1200&q=85&fm=webp",
    alt: "Speakeasy bar live performance",
    span: "md:col-span-4",
    h: "h-[420px]",
  },
  {
    src: "https://images.unsplash.com/photo-1438557068880-c5f474830377?w=1200&q=85&fm=webp",
    alt: "Vintage electric guitar headstock detail",
    span: "md:col-span-4",
    h: "h-[420px]",
  },
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

        <div className="grid md:grid-cols-12 grid-rows-[repeat(2,minmax(0,1fr))] gap-4 md:gap-6 auto-rows-fr">
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
