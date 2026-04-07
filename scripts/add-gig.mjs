#!/usr/bin/env node
// Add a gig to Rob Thompson's performances table.
// Usage:  node scripts/add-gig.mjs
// Reads .env.local for SUPABASE_SERVICE_ROLE_KEY + NEXT_PUBLIC_SUPABASE_URL.

import { readFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "..", ".env.local");
const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const URL_BASE = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !KEY) {
  console.error("Missing Supabase env vars in .env.local");
  process.exit(1);
}

const rl = createInterface({ input, output });
const ask = async (q, def = "") => {
  const a = (await rl.question(`${q}${def ? ` [${def}]` : ""}: `)).trim();
  return a || def;
};

console.log("\n🎸  Add a new gig\n────────────────");
const title = await ask("Title", "Rob Thompson — Solo Acoustic");
const venue_name = await ask("Venue name");
const venue_address = await ask("Venue address");
const event_date = await ask("Date (YYYY-MM-DD)");
const start_time = await ask("Start time (HH:MM)", "19:00");
const priceRaw = await ask("Ticket price in Rand (blank = free)");
const ticket_url = (await ask("Ticket URL (optional)")) || null;
const description = (await ask("Description (optional)")) || null;
rl.close();

const body = {
  title,
  venue_name,
  venue_address: venue_address || null,
  event_date,
  start_time: start_time || null,
  ticket_price: priceRaw ? Number(priceRaw) : null,
  ticket_url,
  description,
  is_public: true,
  is_sold_out: false,
  is_past: new Date(event_date) < new Date(),
};

const res = await fetch(`${URL_BASE}/rest/v1/performances`, {
  method: "POST",
  headers: {
    apikey: KEY,
    Authorization: `Bearer ${KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  },
  body: JSON.stringify(body),
});

if (!res.ok) {
  console.error(`\n❌  Failed (${res.status}):`, await res.text());
  process.exit(1);
}
const [row] = await res.json();
console.log(`\n✅  Added: ${row.title} — ${row.event_date}\n   id: ${row.id}`);
