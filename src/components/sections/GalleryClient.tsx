"use client";

import Image from "next/image";
import { useState } from "react";

type MediaItem = {
  type: "photo" | "video";
  src: string;
  alt: string;
  poster?: string;
};

const media: MediaItem[] = [
  { type: "photo", src: "/photos/rob-01.jpg", alt: "Rob Thompson live on stage" },
  { type: "photo", src: "/photos/rob-02.jpg", alt: "Rob Thompson performing" },
  { type: "photo", src: "/photos/rob-03.jpg", alt: "Rob Thompson acoustic set" },
  { type: "photo", src: "/photos/rob-04.jpg", alt: "Rob Thompson live" },
  { type: "photo", src: "/photos/rob-05.jpg", alt: "Rob Thompson on stage" },
];

type Filter = "all" | "photo" | "video";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "photo", label: "Photos" },
  { key: "video", label: "Videos" },
];

export default function GalleryClient() {
  const [filter, setFilter] = useState<Filter>("all");

  const items = filter === "all" ? media : media.filter((m) => m.type === filter);

  return (
    <section className="px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-center mb-14">
          <div
            role="tablist"
            aria-label="Filter gallery"
            className="inline-flex items-center gap-2 border border-[#f3ebdc]/20 rounded-full p-1.5 bg-[#f3ebdc]/[0.03] backdrop-blur-sm"
          >
            {filters.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.key)}
                  className={`font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase px-5 md:px-6 py-2.5 rounded-full transition-all duration-300 ${
                    active
                      ? "bg-[#c14a1a] text-[#f3ebdc]"
                      : "text-[#f3ebdc]/70 hover:text-[#f3ebdc]"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 font-mono text-[11px] tracking-[0.2em] uppercase opacity-50">
            Coming soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {items.map((item, i) => (
              <div
                key={`${item.src}-${i}`}
                className="group relative overflow-hidden border border-[#f3ebdc]/20 aspect-[4/5]"
              >
                <div className="absolute inset-0 transform-gpu will-change-transform transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
                  {item.type === "photo" ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <video
                      src={item.src}
                      poster={item.poster}
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <span className="absolute bottom-3 left-3 font-mono text-[9px] tracking-[0.2em] uppercase text-[#f3ebdc]/80 bg-[#16110e]/60 px-2 py-1 pointer-events-none">
                  {String(i + 1).padStart(3, "0")} / {item.type === "photo" ? "Photo" : "Video"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
