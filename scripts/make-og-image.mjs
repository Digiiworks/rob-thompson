#!/usr/bin/env node
// Generate a 1200x630 OG image from a hero photo + SVG text overlay.
// Run: node scripts/make-og-image.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const src = path.join(root, "public", "photos", "rob-04.jpg");
const out = path.join(root, "public", "og-image.jpg");

const W = 1200;
const H = 630;

// SVG overlay: gradient + headline + subhead + accent
const overlaySvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(11,8,5,0.30)"/>
      <stop offset="55%" stop-color="rgba(11,8,5,0.80)"/>
      <stop offset="100%" stop-color="rgba(11,8,5,0.96)"/>
    </linearGradient>
    <linearGradient id="gleft" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(11,8,5,0.85)"/>
      <stop offset="60%" stop-color="rgba(11,8,5,0.20)"/>
      <stop offset="100%" stop-color="rgba(11,8,5,0)"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#gleft)"/>

  <!-- coordinate strip -->
  <text x="60" y="80" font-family="Helvetica,Arial,sans-serif" font-size="18" letter-spacing="3" fill="#f3ebdc" opacity="0.7">
    33° 57′ S · 25° 36′ E · GQEBERHA
  </text>

  <!-- main wordmark -->
  <text x="60" y="280" font-family="Impact,Helvetica,Arial,sans-serif" font-size="160" font-weight="900" fill="#f3ebdc" letter-spacing="-3">
    ROB
  </text>
  <text x="60" y="430" font-family="Impact,Helvetica,Arial,sans-serif" font-size="160" font-weight="900" fill="#f3ebdc" letter-spacing="-3">
    THOMPSON
  </text>

  <!-- italic accent -->
  <text x="60" y="500" font-family="Georgia,Times,serif" font-style="italic" font-size="42" fill="#c14a1a">
    delta blues &amp; rock
  </text>

  <!-- subhead -->
  <text x="60" y="555" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#f3ebdc" opacity="0.85">
    Live blues for weddings, events &amp; venues across the Eastern Cape.
  </text>

  <!-- right meta -->
  <text x="${W - 60}" y="80" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="18" letter-spacing="3" fill="#f3ebdc" opacity="0.7">
    EST. 2009
  </text>
  <text x="${W - 60}" y="555" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#f3ebdc" opacity="0.85">
    robthompson.co.za
  </text>
</svg>`;

await sharp(src)
  .resize(W, H, { fit: "cover", position: "attention" })
  .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(out);

console.log(`✓ Wrote ${out} (${W}×${H})`);
