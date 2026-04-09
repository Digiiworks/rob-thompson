import "server-only";
import nodemailer from "nodemailer";

export interface BookingEmailData {
  name: string;
  email: string;
  event_type: string;
  event_date: string;
  start_time: string;
  duration_hours: number;
  guest_count: number;
  venue_name: string;
  venue_address: string;
  notes?: string | null;
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error("SMTP config missing (SMTP_HOST / SMTP_USER / SMTP_PASS)");
  }
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: (process.env.SMTP_SECURE ?? "true") === "true",
    auth: { user, pass },
  });
  return transporter;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function escape(s: string | number | null | undefined): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderBookingConfirmationHtml(d: BookingEmailData): string {
  const v = {
    NAME: escape(d.name.split(" ")[0] || d.name),
    EVENT_TYPE: escape(d.event_type),
    EVENT_DATE: escape(formatDate(d.event_date)),
    START_TIME: escape(d.start_time),
    DURATION: escape(d.duration_hours),
    GUESTS: escape(d.guest_count),
    VENUE_NAME: escape(d.venue_name),
    VENUE_ADDRESS: escape(d.venue_address),
  };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="dark only" />
<meta name="supported-color-schemes" content="dark only" />
<title>You're booked in — Rob Thompson</title>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Fraunces:ital,opsz,wght@0,9..144,400;1,9..144,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<style>
@media (max-width:600px){
  .px{padding-left:28px!important;padding-right:28px!important}
  .hero{font-size:64px!important}
  .grid-cell{display:block!important;width:100%!important;padding:14px 0!important;border-right:0!important}
}
</style>
</head>
<body style="margin:0;padding:0;background:#0f0b09;font-family:'Fraunces',Georgia,serif;color:#f3ebdc;-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#0f0b09;">Your booking with Rob Thompson is confirmed. He'll be in touch within 24 hours.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0f0b09;">
<tr><td align="center" style="padding:48px 20px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#16110e;border:1px solid rgba(243,235,220,0.12);">
<tr><td class="px" style="padding:32px 44px 0 44px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(243,235,220,0.55);">ROB&nbsp;THOMPSON&nbsp;&nbsp;·&nbsp;&nbsp;LIVE&nbsp;MUSIC</td>
<td align="right" style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#c14a1a;">◆&nbsp;CONFIRMED</td>
</tr></table>
<div style="height:1px;background:rgba(243,235,220,0.18);margin-top:24px;line-height:1px;font-size:1px;">&nbsp;</div>
</td></tr>
<tr><td class="px" style="padding:56px 44px 8px 44px;">
<p style="margin:0 0 20px;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(243,235,220,0.6);">001 / Booking Received</p>
<h1 class="hero" style="margin:0;font-family:'Anton','Arial Narrow',Arial,sans-serif;font-weight:400;font-size:86px;line-height:0.85;letter-spacing:-0.01em;color:#f3ebdc;text-transform:uppercase;">You're<br /><em style="font-family:'Fraunces',Georgia,serif;font-style:italic;font-weight:400;color:#c14a1a;text-transform:none;">booked&nbsp;in.</em></h1>
</td></tr>
<tr><td class="px" style="padding:28px 44px 8px 44px;">
<p style="margin:0;font-family:'Fraunces',Georgia,serif;font-size:18px;line-height:1.55;color:rgba(243,235,220,0.85);">Hi <span style="color:#f3ebdc;">${v.NAME}</span>,</p>
<p style="margin:14px 0 0;font-family:'Fraunces',Georgia,serif;font-size:18px;line-height:1.6;color:rgba(243,235,220,0.82);">Thanks for booking Rob. Your request is in, your deposit is noted, and Rob will personally confirm the details within the next <em style="color:#c14a1a;font-style:italic;">24 hours</em>.</p>
</td></tr>
<tr><td class="px" style="padding:36px 44px 8px 44px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid rgba(243,235,220,0.18);">
<tr><td style="padding:22px 24px 10px;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(243,235,220,0.55);">002 / Event Details</td></tr>
<tr><td style="padding:0 24px 22px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td class="grid-cell" width="50%" valign="top" style="padding:10px 18px 10px 0;border-right:1px solid rgba(243,235,220,0.12);">
<div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(243,235,220,0.5);">Event</div>
<div style="margin-top:6px;font-family:'Fraunces',Georgia,serif;font-size:19px;color:#f3ebdc;">${v.EVENT_TYPE}</div>
</td>
<td class="grid-cell" width="50%" valign="top" style="padding:10px 0 10px 18px;">
<div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(243,235,220,0.5);">Date</div>
<div style="margin-top:6px;font-family:'Fraunces',Georgia,serif;font-size:19px;color:#f3ebdc;">${v.EVENT_DATE}</div>
</td>
</tr>
<tr><td colspan="2" style="height:1px;background:rgba(243,235,220,0.1);line-height:1px;font-size:1px;">&nbsp;</td></tr>
<tr>
<td class="grid-cell" width="50%" valign="top" style="padding:14px 18px 10px 0;border-right:1px solid rgba(243,235,220,0.12);">
<div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(243,235,220,0.5);">Start</div>
<div style="margin-top:6px;font-family:'Fraunces',Georgia,serif;font-size:19px;color:#f3ebdc;">${v.START_TIME} · ${v.DURATION}h</div>
</td>
<td class="grid-cell" width="50%" valign="top" style="padding:14px 0 10px 18px;">
<div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(243,235,220,0.5);">Guests</div>
<div style="margin-top:6px;font-family:'Fraunces',Georgia,serif;font-size:19px;color:#f3ebdc;">${v.GUESTS}</div>
</td>
</tr>
<tr><td colspan="2" style="height:1px;background:rgba(243,235,220,0.1);line-height:1px;font-size:1px;">&nbsp;</td></tr>
<tr><td colspan="2" style="padding:14px 0 4px;">
<div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(243,235,220,0.5);">Venue</div>
<div style="margin-top:6px;font-family:'Fraunces',Georgia,serif;font-size:19px;color:#f3ebdc;">${v.VENUE_NAME}</div>
<div style="margin-top:2px;font-family:'Fraunces',Georgia,serif;font-size:15px;font-style:italic;color:rgba(243,235,220,0.65);">${v.VENUE_ADDRESS}</div>
</td></tr>
</table>
</td></tr></table>
</td></tr>
<tr><td class="px" style="padding:32px 44px 8px;">
<p style="margin:0 0 12px;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(243,235,220,0.55);">003 / Payment</p>
<p style="margin:0 0 18px;font-family:'Fraunces',Georgia,serif;font-size:17px;line-height:1.55;color:rgba(243,235,220,0.82);">To secure your booking, please settle the deposit via EFT to the account below. The remaining balance is payable directly to Rob on or before the event night.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid rgba(243,235,220,0.18);">
<tr><td style="padding:18px 22px;">
<div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(243,235,220,0.5);">Account Holder</div>
<div style="margin-top:4px;font-family:'Fraunces',Georgia,serif;font-size:18px;color:#f3ebdc;">RE Thompson</div>
<div style="height:1px;background:rgba(243,235,220,0.1);margin:14px 0;line-height:1px;font-size:1px;">&nbsp;</div>
<div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(243,235,220,0.5);">Bank</div>
<div style="margin-top:4px;font-family:'Fraunces',Georgia,serif;font-size:18px;color:#f3ebdc;">Capitec Bank</div>
<div style="height:1px;background:rgba(243,235,220,0.1);margin:14px 0;line-height:1px;font-size:1px;">&nbsp;</div>
<div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(243,235,220,0.5);">Account Number</div>
<div style="margin-top:4px;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:18px;color:#f3ebdc;letter-spacing:0.04em;">13479249080</div>
<div style="height:1px;background:rgba(243,235,220,0.1);margin:14px 0;line-height:1px;font-size:1px;">&nbsp;</div>
<div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(243,235,220,0.5);">Reference</div>
<div style="margin-top:4px;font-family:'Fraunces',Georgia,serif;font-size:18px;color:#f3ebdc;">${v.NAME} · ${v.EVENT_DATE}</div>
</td></tr></table>
</td></tr>
<tr><td class="px" align="left" style="padding:28px 44px 44px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:#c14a1a;">
<a href="https://wa.me/27768967076" style="display:inline-block;padding:16px 30px;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#f3ebdc;text-decoration:none;">Chat with Rob on WhatsApp →</a>
</td></tr></table>
</td></tr>
<tr><td class="px" style="padding:0 44px 40px;">
<div style="height:1px;background:rgba(243,235,220,0.18);margin-bottom:24px;line-height:1px;font-size:1px;">&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(243,235,220,0.45);">Rob Thompson · Gqeberha, ZA</td>
<td align="right" style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;"><a href="https://www.robthompson.co.za" style="color:rgba(243,235,220,0.55);text-decoration:none;">robthompson.co.za</a></td>
</tr></table>
</td></tr>
</table>
<p style="margin:22px 0 0;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(243,235,220,0.35);">You're receiving this because you booked Rob Thompson for a live performance.</p>
</td></tr></table>
</body></html>`;
}

export async function sendBookingConfirmation(data: BookingEmailData): Promise<void> {
  const html = renderBookingConfirmationHtml(data);
  const fromName = process.env.SMTP_FROM_NAME ?? "Rob Thompson";
  const fromEmail = process.env.SMTP_FROM_EMAIL ?? process.env.SMTP_USER!;
  const notify = process.env.BOOKING_NOTIFY_EMAIL;

  const t = getTransporter();
  await t.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: data.email,
    bcc: notify || undefined,
    subject: "You're booked in — Rob Thompson",
    html,
  });
}
