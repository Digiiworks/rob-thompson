import type { Metadata } from "next";
import BookingForm from "@/components/sections/BookingForm";

export const metadata: Metadata = {
  title: "Book Rob Thompson",
  description:
    "Book Rob Thompson for your private event, corporate function, wedding or venue night in Gqeberha and the Eastern Cape. Secure your date with a R1,000 deposit online.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <div className="pt-24">
      <BookingForm />
    </div>
  );
}
