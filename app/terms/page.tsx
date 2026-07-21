import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Conditions Générales | Muhiris Doctor",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <div className="bg-bg-tint px-6 py-14 text-center sm:px-10 lg:px-[116px]">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-brand-navy sm:text-4xl">
            Conditions Générales
          </h1>
        </div>
        <section className="bg-white">
          <div className="mx-auto flex max-w-[720px] flex-col gap-4 px-6 py-16 text-sm leading-relaxed text-text-muted sm:px-10">
            <p>
              En utilisant les services de Muhiris Doctor, vous acceptez nos
              conditions d&apos;utilisation. Ce site est une démonstration à
              but illustratif ; aucune donnée médicale réelle n&apos;est
              collectée ou traitée.
            </p>
            <p>
              Toute prise de rendez-vous via ce site sera confirmée par notre
              équipe avant toute consultation effective.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
