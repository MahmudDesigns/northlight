import Providers from "@/components/Providers";
import Loader from "@/components/Loader";
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import Studio from "@/components/Studio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/**
 * Northlight Studio — single-page portfolio.
 * Black cover plate (hero → marquee → stats), the paper index (work, studio,
 * contact), then black plates again for voices and the footer.
 */
export default function Page() {
  return (
    <Providers>
      <Loader />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Work />
        <Studio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </Providers>
  );
}
