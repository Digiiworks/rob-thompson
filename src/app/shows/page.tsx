import type { Metadata } from "next";
import Shows from "@/components/sections/Shows";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Upcoming Live Shows",
  description:
    "Upcoming live performances by Rob Thompson — Delta blues and rock shows across Gqeberha, Port Elizabeth and the Eastern Cape. View dates, venues and book tickets.",
  alternates: { canonical: "/shows" },
};

export default function ShowsPage() {
  return (
    <main className="pt-24">
      <Shows />
    </main>
  );
}
