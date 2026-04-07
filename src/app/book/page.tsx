import type { Metadata } from "next";
import BookingForm from "@/components/sections/BookingForm";

export const metadata: Metadata = {
  title: "Book Rob",
  description:
    "Book Rob Thompson for your private event, corporate function, wedding or venue night in Gqeberha and the Eastern Cape. Secure your date with a R1,000 deposit online.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book Rob Thompson — Live Blues for Your Event",
    description:
      "Hire Rob Thompson for weddings, corporate functions, private parties and venue nights across the Eastern Cape. R1,000 deposit secures your date.",
    url: "https://www.robthompson.co.za/book",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rob Thompson live performance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Rob Thompson",
    description: "Live blues for weddings, corporate events and venues in the Eastern Cape.",
    images: ["/og-image.jpg"],
  },
};

export default function BookPage() {
  return (
    <div className="pt-24">
      <h1 className="sr-only">
        Book Rob Thompson — Live Blues Musician for Weddings, Private Events and Corporate Functions in the Eastern Cape
      </h1>
      <BookingForm />
    </div>
  );
}
