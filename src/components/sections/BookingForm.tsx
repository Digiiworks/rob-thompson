"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { SITE } from "@/lib/utils";
import { submitBooking } from "@/app/actions/booking";

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z
    .string()
    .min(10, "Phone number required")
    .regex(/^(\+27|0)[0-9 ]{8,}$/, "Use +27XXXXXXXXX or 0XXXXXXXXX format"),
  event_date: z.string().min(1, "Pick a date"),
  event_type: z.string().min(1, "Pick an event type"),
  venue_name: z.string().min(2, "Venue name required"),
  venue_address: z.string().min(4, "Venue address required"),
  start_time: z.string().min(1, "Start time required"),
  duration_hours: z.number().min(1).max(8),
  guest_count: z.number().min(1, "Guest count required"),
  notes: z.string().optional(),
  payment_option: z.enum(["deposit_now", "full_now"]),
});

export type BookingValues = z.infer<typeof schema>;

const eventTypes = [
  "Private Party",
  "Corporate Event",
  "Venue / Bar Night",
  "Wedding",
  "Festival",
  "Other",
];

export default function BookingForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { duration_hours: 2, payment_option: "deposit_now" },
  });

  const values = watch();

  async function next() {
    const fields: (keyof BookingValues)[] =
      step === 1
        ? ["name", "email", "phone"]
        : ["event_date", "event_type", "venue_name", "venue_address", "start_time", "duration_hours", "guest_count"];
    const ok = await trigger(fields);
    if (ok) setStep((s) => (s + 1) as 1 | 2 | 3);
  }

  async function onSubmit(data: BookingValues) {
    const result = await submitBooking({ ...data, yoco_deposit_reference: null });
    if (!result.ok) {
      toast.error(result.error ?? "Booking failed");
      return;
    }
    toast.success("Booking received");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section
        id="book"
        className="relative bg-[#f3ebdc] text-[#16110e] py-24 md:py-36 px-6 md:px-10"
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-60 mb-6">
            ◆ Confirmed
          </p>
          <h2 style={{ fontSize: "clamp(56px, 9vw, 130px)", lineHeight: 0.85 }}>
            You&apos;re
            <br />
            <em
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontWeight: 400,
                fontVariationSettings: "'opsz' 144, 'SOFT' 100",
                color: "#7a1818",
                textTransform: "none",
              }}
            >
              booked in.
            </em>
          </h2>
          <p
            className="mt-8 max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-fraunces)", fontSize: 19, lineHeight: 1.5 }}
          >
            Rob will confirm your booking within 24 hours. A confirmation has
            been sent to <em className="text-[#7a1818]">{values.email}</em>.
          </p>
          <div className="mt-10">
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Chat with Rob on WhatsApp →
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="book"
      className="relative bg-[#ece2cc] text-[#16110e] py-24 md:py-36 px-6 md:px-10 border-t border-[#16110e]/15"
    >
      <Toaster position="top-center" toastOptions={{ style: { background: "#16110e", color: "#f3ebdc", fontFamily: "var(--font-fraunces)" } }} />

      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-60">
            004 / Hire The Band
          </span>
          <span className="hairline flex-1 max-w-[160px]" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2 style={{ fontSize: "clamp(56px, 8vw, 120px)", lineHeight: 0.85 }}>
              Book
              <br />
              Rob<span style={{ color: "#7a1818" }}>.</span>
            </h2>
            <p
              className="mt-8 max-w-md opacity-80"
              style={{ fontFamily: "var(--font-fraunces)", fontSize: 18, lineHeight: 1.55 }}
            >
              Private events · Corporate functions · Weddings · Venue nights.
              A R1,000 deposit secures your date — balance due after the
              performance.
            </p>
            <div className="mt-10 hidden lg:block">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-60 mb-3">
                Step {step} of 3
              </p>
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-[3px] flex-1 ${
                      s <= step ? "bg-[#7a1818]" : "bg-[#16110e]/15"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-7 border-t border-[#16110e]/30 pt-10"
          >
            {step === 1 && (
              <div className="space-y-8">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-60">
                  ◆ Your Details
                </p>
                <Field label="Full Name" error={errors.name?.message}>
                  <input {...register("name")} className="field" />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <input type="email" {...register("email")} className="field" />
                </Field>
                <Field label="Phone" error={errors.phone?.message}>
                  <input
                    {...register("phone")}
                    className="field"
                    placeholder="+27 76 000 0000"
                  />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-60">
                  ◆ Event Details
                </p>
                <div className="grid sm:grid-cols-2 gap-8">
                  <Field label="Event Date" error={errors.event_date?.message}>
                    <input type="date" min={tomorrow()} {...register("event_date")} className="field" />
                  </Field>
                  <Field label="Event Type" error={errors.event_type?.message}>
                    <select {...register("event_type")} className="field">
                      <option value="">Select…</option>
                      {eventTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Venue Name" error={errors.venue_name?.message}>
                  <input {...register("venue_name")} className="field" />
                </Field>
                <Field label="Venue Address" error={errors.venue_address?.message}>
                  <input {...register("venue_address")} className="field" />
                </Field>
                <div className="grid sm:grid-cols-3 gap-8">
                  <Field label="Start Time" error={errors.start_time?.message}>
                    <input type="time" {...register("start_time")} className="field" />
                  </Field>
                  <Field label="Duration" error={errors.duration_hours?.message}>
                    <select {...register("duration_hours", { valueAsNumber: true })} className="field">
                      <option value={1}>1 hour</option>
                      <option value={2}>2 hours</option>
                      <option value={3}>3 hours</option>
                      <option value={4}>4+ hours</option>
                    </select>
                  </Field>
                  <Field label="Guests" error={errors.guest_count?.message}>
                    <input type="number" {...register("guest_count", { valueAsNumber: true })} className="field" />
                  </Field>
                </div>
                <Field label="Notes / Special Requests" error={errors.notes?.message}>
                  <textarea {...register("notes")} className="field" rows={3} />
                </Field>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-60">
                  ◆ Review &amp; Confirm
                </p>

                <dl className="grid grid-cols-2 gap-y-4 gap-x-6 border-y border-[#16110e]/20 py-8">
                  <Row k="Name" v={values.name} />
                  <Row k="Email" v={values.email} />
                  <Row k="Phone" v={values.phone} />
                  <Row k="Date" v={values.event_date} />
                  <Row k="Type" v={values.event_type} />
                  <Row k="Venue" v={values.venue_name} />
                  <Row k="Address" v={values.venue_address} />
                  <Row k="Time" v={values.start_time} />
                  <Row k="Duration" v={`${values.duration_hours}h`} />
                  <Row k="Guests" v={String(values.guest_count ?? "")} />
                </dl>

                <div className="space-y-4">
                  <PaymentOption
                    value="deposit_now"
                    title="Pay R1,000 Deposit"
                    desc="Balance due after performance. Locks in your date."
                    register={register("payment_option")}
                  />
                  <PaymentOption
                    value="full_now"
                    title="Pay In Full"
                    desc="Send me a full invoice within 24 hours."
                    register={register("payment_option")}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#16110e]/20">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                  className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-70 hover:opacity-100 hover:text-[#7a1818]"
                >
                  ← Back
                </button>
              ) : (
                <Link
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-70 hover:text-[#7a1818]"
                >
                  Or WhatsApp Rob →
                </Link>
              )}

              {step < 3 ? (
                <button type="button" onClick={next} className="btn-primary">
                  Next →
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting} className="btn-primary">
                  {isSubmitting
                    ? "Sending…"
                    : values.payment_option === "deposit_now"
                      ? "Confirm & Pay →"
                      : "Submit Enquiry →"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="field-label">{label}</span>
      {children}
      {error && (
        <p className="mt-2 text-[#7a1818] italic" style={{ fontFamily: "var(--font-fraunces)", fontSize: 13 }}>
          {error}
        </p>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v?: string }) {
  return (
    <>
      <dt className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-60">{k}</dt>
      <dd style={{ fontFamily: "var(--font-fraunces)", fontSize: 16 }}>{v || "—"}</dd>
    </>
  );
}

function PaymentOption({
  value,
  title,
  desc,
  register,
}: {
  value: string;
  title: string;
  desc: string;
  register: ReturnType<ReturnType<typeof useForm<BookingValues>>["register"]>;
}) {
  return (
    <label className="block border border-[#16110e]/30 p-6 cursor-pointer hover:border-[#7a1818] hover:bg-[#16110e]/5 transition-colors">
      <div className="flex items-start gap-4">
        <input type="radio" value={value} {...register} className="mt-2 accent-[#7a1818]" />
        <div>
          <p
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: 22,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {title}
          </p>
          <p
            className="mt-1 opacity-80"
            style={{ fontFamily: "var(--font-fraunces)", fontSize: 15 }}
          >
            {desc}
          </p>
        </div>
      </div>
    </label>
  );
}
