"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
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

const inputCls =
  "w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white px-4 py-3 focus:border-[#cc2929] focus:outline-none";
const labelCls = "block text-[#999] uppercase mb-2";

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
    defaultValues: {
      duration_hours: 2,
      payment_option: "deposit_now",
    },
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
    // Phase 4 will insert the YoCo popup here when payment_option === "deposit_now"
    // and pass the resulting charge token through as yoco_deposit_reference.
    const result = await submitBooking({
      ...data,
      yoco_deposit_reference: null,
    });

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
        className="bg-[#0a0a0a] py-20 md:py-[100px] px-6 border-t border-[#1a1a1a]"
      >
        <div className="max-w-2xl mx-auto bg-[#1a1a1a] border border-[#2a2a2a] p-12 text-center">
          <p
            className="text-[#cc2929] uppercase mb-4"
            style={{
              fontFamily: "var(--font-oswald)",
              fontSize: 14,
              letterSpacing: "0.2em",
            }}
          >
            ✓ Confirmed
          </p>
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(48px, 8vw, 64px)",
              lineHeight: 1,
            }}
          >
            You&apos;re Booked In!
          </h2>
          <p
            className="text-[#bbb] mb-2"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: 17 }}
          >
            Rob will confirm your booking within 24 hours.
          </p>
          <p
            className="text-[#999] mb-8"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15 }}
          >
            A confirmation has been sent to {values.email}
          </p>
          <Button href={SITE.whatsapp} external>
            Chat with Rob on WhatsApp
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="book"
      className="bg-[#0a0a0a] py-20 md:py-[100px] px-6 border-t border-[#1a1a1a]"
    >
      <Toaster position="top-center" />
      <SectionTitle
        eyebrow="Book Live Music"
        title="Book Rob for Your Event in Gqeberha & the Eastern Cape"
        subtitle="Private events · Corporate functions · Weddings · Venues · A R1,000 deposit secures your date."
      />

      {/* Progress dots */}
      <div className="max-w-2xl mx-auto mt-12 mb-10 flex items-center justify-center gap-3">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 w-12 transition-colors ${
              s <= step ? "bg-[#cc2929]" : "bg-[#2a2a2a]"
            }`}
          />
        ))}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto bg-[#111] border border-[#2a2a2a] p-8 md:p-12"
      >
        {step === 1 && (
          <div className="space-y-6">
            <h3
              className="text-white"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: 32,
                letterSpacing: "0.02em",
              }}
            >
              Step 1 — Your Details
            </h3>
            <Field label="Full Name" error={errors.name?.message}>
              <input {...register("name")} className={inputCls} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input
                type="email"
                {...register("email")}
                className={inputCls}
              />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <input {...register("phone")} className={inputCls} placeholder="+27 76 000 0000" />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3
              className="text-white"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: 32,
                letterSpacing: "0.02em",
              }}
            >
              Step 2 — Event Details
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Event Date" error={errors.event_date?.message}>
                <input
                  type="date"
                  min={tomorrow()}
                  {...register("event_date")}
                  className={inputCls}
                />
              </Field>
              <Field label="Event Type" error={errors.event_type?.message}>
                <select {...register("event_type")} className={inputCls}>
                  <option value="">Select…</option>
                  {eventTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Venue Name" error={errors.venue_name?.message}>
              <input {...register("venue_name")} className={inputCls} />
            </Field>
            <Field label="Venue Address" error={errors.venue_address?.message}>
              <input {...register("venue_address")} className={inputCls} />
            </Field>
            <div className="grid sm:grid-cols-3 gap-6">
              <Field label="Start Time" error={errors.start_time?.message}>
                <input
                  type="time"
                  {...register("start_time")}
                  className={inputCls}
                />
              </Field>
              <Field label="Duration" error={errors.duration_hours?.message}>
                <select
                  {...register("duration_hours", { valueAsNumber: true })}
                  className={inputCls}
                >
                  <option value={1}>1 hour</option>
                  <option value={2}>2 hours</option>
                  <option value={3}>3 hours</option>
                  <option value={4}>4+ hours</option>
                </select>
              </Field>
              <Field label="Guests" error={errors.guest_count?.message}>
                <input
                  type="number"
                  {...register("guest_count", { valueAsNumber: true })}
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label="Notes" error={errors.notes?.message}>
              <textarea {...register("notes")} className={inputCls} rows={4} />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3
              className="text-white"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: 32,
                letterSpacing: "0.02em",
              }}
            >
              Step 3 — Review &amp; Payment
            </h3>
            <dl
              className="bg-[#0a0a0a] border border-[#2a2a2a] p-6 grid grid-cols-2 gap-y-3 text-sm"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
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

            <div className="space-y-3">
              <label className="block bg-[#0a0a0a] border border-[#2a2a2a] p-5 cursor-pointer hover:border-[#cc2929]">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    value="deposit_now"
                    {...register("payment_option")}
                    className="mt-1 accent-[#cc2929]"
                  />
                  <div>
                    <p className="text-white" style={{ fontFamily: "var(--font-oswald)", fontSize: 16, fontWeight: 600 }}>
                      Pay Deposit Now — R1,000
                    </p>
                    <p className="text-[#999] mt-1" style={{ fontSize: 13 }}>
                      Balance due after performance. Protects against cancellation.
                    </p>
                  </div>
                </div>
              </label>
              <label className="block bg-[#0a0a0a] border border-[#2a2a2a] p-5 cursor-pointer hover:border-[#cc2929]">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    value="full_now"
                    {...register("payment_option")}
                    className="mt-1 accent-[#cc2929]"
                  />
                  <div>
                    <p className="text-white" style={{ fontFamily: "var(--font-oswald)", fontSize: 16, fontWeight: 600 }}>
                      Pay in Full
                    </p>
                    <p className="text-[#999] mt-1" style={{ fontSize: 13 }}>
                      We&apos;ll calculate your total and send a full invoice within 24 hours.
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-10">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
              className="text-[#999] uppercase hover:text-white"
              style={{
                fontFamily: "var(--font-oswald)",
                fontSize: 14,
                letterSpacing: "0.1em",
              }}
            >
              ← Back
            </button>
          ) : (
            <span />
          )}
          {step < 3 ? (
            <Button onClick={next}>Next →</Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Submitting…"
                : values.payment_option === "deposit_now"
                  ? "Proceed to Payment"
                  : "Submit Enquiry"}
            </Button>
          )}
        </div>
      </form>
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
      <label
        className={labelCls}
        style={{
          fontFamily: "var(--font-oswald)",
          fontSize: 12,
          letterSpacing: "0.15em",
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          className="text-[#cc2929] mt-1"
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13 }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v?: string }) {
  return (
    <>
      <dt className="text-[#666] uppercase" style={{ fontSize: 11, letterSpacing: "0.15em" }}>
        {k}
      </dt>
      <dd className="text-white">{v || "—"}</dd>
    </>
  );
}
