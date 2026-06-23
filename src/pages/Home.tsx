import { useEffect } from "react";
import Hero from "../sections/Hero";
import Gallery from "../sections/Gallery";
import Instant from "../sections/Instant";
import Footer from "../sections/Footer";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Hero />
      <Gallery />
      <Instant />
      <Footer />
    </main>
  );
}
