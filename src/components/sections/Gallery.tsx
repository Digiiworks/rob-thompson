import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";

const images = [
  {
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=85&fm=webp",
    alt: "Rob Thompson live on stage with electric guitar",
    h: 520,
  },
  {
    src: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=1200&q=85&fm=webp",
    alt: "Acoustic blues guitar performance close-up",
    h: 380,
  },
  {
    src: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=1200&q=85&fm=webp",
    alt: "Live music crowd in dark venue",
    h: 460,
  },
  {
    src: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=1200&q=85&fm=webp",
    alt: "Blues guitarist silhouetted by stage lights",
    h: 420,
  },
  {
    src: "https://images.unsplash.com/photo-1466428996289-fb355538da1b?w=1200&q=85&fm=webp",
    alt: "Speakeasy bar live performance",
    h: 500,
  },
  {
    src: "https://images.unsplash.com/photo-1438557068880-c5f474830377?w=1200&q=85&fm=webp",
    alt: "Vintage electric guitar headstock detail",
    h: 360,
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-[#0a0a0a] py-20 md:py-[100px] px-6 border-t border-[#1a1a1a]"
    >
      <SectionTitle eyebrow="Gallery" title="Live on Stage" />
      <div className="max-w-[1200px] mx-auto mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img.src}
            className="relative overflow-hidden border border-[#1a1a1a] hover:border-[#cc2929] transition-colors group"
            style={{ height: img.h }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
