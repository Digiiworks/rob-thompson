#!/usr/bin/env node
// Manage Rob Thompson's gigs.
// Usage:
//   node scripts/manage-gigs.mjs list [past|upcoming|all]
//   node scripts/manage-gigs.mjs add
//   node scripts/manage-gigs.mjs update <id-or-date>
//   node scripts/manage-gigs.mjs delete <id-or-date>
//
// IDs can be the full UUID or the event_date (YYYY-MM-DD). When matching by
// date, the script will refuse to update/delete if multiple rows share the
// same date (you'll be shown the IDs to disambiguate).

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

const HEADERS = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  "Content-Type": "application/json",
};

async function api(path, init = {}) {
  const res = await fetch(`${URL_BASE}/rest/v1/performances${path}`, {
    ...init,
    headers: { ...HEADERS, ...(init.headers ?? {}) },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

const isUuid = (s) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s);

async function findRow(idOrDate) {
  const filter = isUuid(idOrDate)
    ? `?id=eq.${idOrDate}`
    : isDate(idOrDate)
      ? `?event_date=eq.${idOrDate}`
      : null;
  if (!filter) throw new Error(`Not a UUID or YYYY-MM-DD: ${idOrDate}`);
  const rows = await api(`${filter}&select=*`);
  if (rows.length === 0) throw new Error(`No row found for ${idOrDate}`);
  if (rows.length > 1) {
    console.error(`\n⚠️  Multiple rows for ${idOrDate}:`);
    rows.forEach((r) =>
      console.error(`  ${r.id}  ${r.event_date}  ${r.title}`)
    );
    console.error(`\nRe-run with the UUID to disambiguate.\n`);
    process.exit(1);
  }
  return rows[0];
}

async function listCmd(filter = "all") {
  const today = new Date().toISOString().split("T")[0];
  let q = "?select=id,event_date,title,venue_name,ticket_price,is_sold_out&order=event_date.desc";
  if (filter === "upcoming") q = `?event_date=gte.${today}&select=id,event_date,title,venue_name,ticket_price,is_sold_out&order=event_date`;
  if (filter === "past") q = `?event_date=lt.${today}&select=id,event_date,title,venue_name,ticket_price,is_sold_out&order=event_date.desc`;
  const rows = await api(q);
  console.log(`\n${rows.length} gig${rows.length === 1 ? "" : "s"} (${filter})\n`);
  rows.forEach((r) => {
    const price = r.ticket_price ? `R${r.ticket_price}` : "free";
    const sold = r.is_sold_out ? " · SOLD OUT" : "";
    console.log(`${r.event_date}  ${price.padEnd(6)}  ${r.title}  @ ${r.venue_name}${sold}`);
    console.log(`            ${r.id}\n`);
  });
}

async function deleteCmd(idOrDate) {
  const row = await findRow(idOrDate);
  const rl = createInterface({ input, output });
  const ans = await rl.question(
    `\nDelete this gig?\n  ${row.event_date}  ${row.title} @ ${row.venue_name}\n  ${row.id}\n\nType DELETE to confirm: `
  );
  rl.close();
  if (ans.trim() !== "DELETE") {
    console.log("Aborted.");
    return;
  }
  await api(`?id=eq.${row.id}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
  console.log(`✓ Deleted ${row.id}`);
}

async function updateCmd(idOrDate) {
  const row = await findRow(idOrDate);
  console.log(`\nEditing: ${row.event_date}  ${row.title} @ ${row.venue_name}`);
  console.log(`Press Enter to keep existing value.\n`);

  const rl = createInterface({ input, output });
  const ask = async (label, current) => {
    const a = (await rl.question(`${label} [${current ?? ""}]: `)).trim();
    return a === "" ? current : a;
  };
  const askNum = async (label, current) => {
    const a = (await rl.question(`${label} [${current ?? ""}]: `)).trim();
    if (a === "") return current;
    if (a.toLowerCase() === "null") return null;
    return Number(a);
  };
  const askBool = async (label, current) => {
    const a = (await rl.question(`${label} [${current ? "y" : "n"}]: `)).trim().toLowerCase();
    if (a === "") return current;
    return a === "y" || a === "yes" || a === "true";
  };

  const patch = {
    title: await ask("Title", row.title),
    venue_name: await ask("Venue name", row.venue_name),
    venue_address: await ask("Venue address", row.venue_address),
    event_date: await ask("Event date (YYYY-MM-DD)", row.event_date),
    start_time: await ask("Start time (HH:MM)", row.start_time?.slice(0, 5)),
    ticket_price: await askNum("Ticket price (Rand, blank=keep, 'null'=clear)", row.ticket_price),
    ticket_url: await ask("Ticket URL", row.ticket_url),
    description: await ask("Description", row.description),
    poster_url: await ask("Poster URL", row.poster_url),
    is_sold_out: await askBool("Sold out?", row.is_sold_out),
    is_public: await askBool("Public?", row.is_public),
  };
  rl.close();

  // Auto-derive is_past from new date
  patch.is_past = new Date(patch.event_date) < new Date();

  await api(`?id=eq.${row.id}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(patch),
  });
  console.log(`\n✓ Updated ${row.id}`);
}

async function addCmd() {
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
  const poster_url = (await ask("Poster URL (optional, e.g. /events/foo.jpg)")) || null;
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
    poster_url,
    is_public: true,
    is_sold_out: false,
    is_past: new Date(event_date) < new Date(),
  };

  const [row] = await api("", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  console.log(`\n✓ Added: ${row.title} — ${row.event_date}\n  ${row.id}`);
}

const [, , cmd, arg] = process.argv;

try {
  switch (cmd) {
    case "list":
      await listCmd(arg ?? "all");
      break;
    case "add":
      await addCmd();
      break;
    case "update":
    case "edit":
      if (!arg) throw new Error("Usage: manage-gigs.mjs update <uuid|YYYY-MM-DD>");
      await updateCmd(arg);
      break;
    case "delete":
    case "rm":
      if (!arg) throw new Error("Usage: manage-gigs.mjs delete <uuid|YYYY-MM-DD>");
      await deleteCmd(arg);
      break;
    default:
      console.error(`Usage:
  node scripts/manage-gigs.mjs list [past|upcoming|all]
  node scripts/manage-gigs.mjs add
  node scripts/manage-gigs.mjs update <uuid|YYYY-MM-DD>
  node scripts/manage-gigs.mjs delete <uuid|YYYY-MM-DD>`);
      process.exit(1);
  }
} catch (err) {
  console.error(`\n❌  ${err.message}\n`);
  process.exit(1);
}
