"use server";

import { createServerClient } from "@/lib/supabase";
import { sendBookingConfirmation } from "@/lib/email";

export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  event_date: string;
  event_type: string;
  venue_name: string;
  venue_address: string;
  start_time: string;
  duration_hours: number;
  guest_count: number;
  notes?: string;
  payment_option: "deposit_now" | "full_now";
  yoco_deposit_reference?: string | null;
}

export interface BookingResult {
  ok: boolean;
  bookingId?: string;
  error?: string;
}

export async function submitBooking(
  payload: BookingPayload,
): Promise<BookingResult> {
  try {
    const supabase = createServerClient();

    // Upsert client by email
    const { data: client, error: clientErr } = await supabase
      .from("clients")
      .upsert(
        {
          name: payload.name,
          email: payload.email.toLowerCase().trim(),
          phone: payload.phone,
        },
        { onConflict: "email" },
      )
      .select("id")
      .single();

    if (clientErr || !client) {
      console.error("[booking] client upsert failed:", clientErr);
      return { ok: false, error: "Failed to save your details. Please try again." };
    }

    const depositPaid =
      payload.payment_option === "deposit_now" && !!payload.yoco_deposit_reference;

    const { data: booking, error: bookingErr } = await supabase
      .from("bookings")
      .insert({
        client_id: client.id,
        event_date: payload.event_date,
        event_type: payload.event_type,
        venue_name: payload.venue_name,
        venue_address: payload.venue_address,
        start_time: payload.start_time,
        duration_hours: payload.duration_hours,
        guest_count: payload.guest_count,
        notes: payload.notes ?? null,
        status: "pending",
        payment_option: payload.payment_option,
        deposit_paid: depositPaid,
        yoco_deposit_reference: payload.yoco_deposit_reference ?? null,
      })
      .select("id")
      .single();

    if (bookingErr || !booking) {
      console.error("[booking] insert failed:", bookingErr);
      return { ok: false, error: "Could not create your booking. Please try again." };
    }

    // Fire-and-log confirmation email — never block the booking on mail failure
    try {
      await sendBookingConfirmation({
        name: payload.name,
        email: payload.email,
        event_type: payload.event_type,
        event_date: payload.event_date,
        start_time: payload.start_time,
        duration_hours: payload.duration_hours,
        guest_count: payload.guest_count,
        venue_name: payload.venue_name,
        venue_address: payload.venue_address,
        notes: payload.notes ?? null,
      });
    } catch (mailErr) {
      console.error("[booking] confirmation email failed:", mailErr);
    }

    return { ok: true, bookingId: booking.id };
  } catch (e) {
    console.error("[booking] unexpected error:", e);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
