"use client";

import { useState, type ReactNode } from "react";

const PAGE_SIZE = 5;

export default function PastShowsToggle({
  cards,
  total,
}: {
  cards: ReactNode[];
  total: number;
}) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  if (!open) {
    return (
      <div className="mt-24 text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="btn-primary"
        >
          Click to view past events →
        </button>
      </div>
    );
  }

  const shown = cards.slice(0, visible);
  const hasMore = visible < cards.length;

  return (
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
          {total} archived
        </span>
      </div>
      <div className="opacity-90">
        {shown}
        <div className="border-t border-[#16110e]/20" />
      </div>
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="btn-primary"
          >
            Show more past events →
          </button>
        </div>
      )}
    </div>
  );
}
