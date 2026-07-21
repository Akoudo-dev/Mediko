import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Specialties from "@/components/Specialties";
import StellarValues from "@/components/StellarValues";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <Specialties />
        <StellarValues />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
