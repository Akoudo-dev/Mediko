import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Specialties from "@/components/Specialties";

export const metadata: Metadata = {
  title: "Nos Spécialités | Muhiris Doctor",
};

export default function SpecialtiesPage() {
  return (
    <>
      <Header />
      <main>
        <div className="bg-bg-tint px-6 py-14 text-center sm:px-10 lg:px-[116px]">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-brand-navy sm:text-4xl">
            Nos Spécialités
          </h1>
          <p className="mx-auto mt-3 max-w-[520px] text-sm text-text-muted sm:text-base">
            Toutes nos équipes médicales, réunies pour prendre soin de vous à
            chaque étape.
          </p>
        </div>
        <Specialties />
      </main>
      <Footer />
    </>
  );
}
