export const revalidate = 300;

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Shows from "@/components/sections/Shows";
import BookingForm from "@/components/sections/BookingForm";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Shows />
      <BookingForm />
      <Gallery />
      <Contact />
    </>
  );
}
