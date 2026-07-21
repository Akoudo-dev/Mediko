import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ | Muhiris Doctor",
};

const faqs = [
  {
    q: "Comment prendre rendez-vous ?",
    a: "Cliquez sur « Book Now » dans le menu, choisissez un médecin et une date, puis confirmez.",
  },
  {
    q: "Puis-je me connecter avec mon compte Google ?",
    a: "Oui, la page de connexion propose Google ainsi qu'une connexion par email et mot de passe.",
  },
  {
    q: "Les consultations OPD nécessitent-elles un rendez-vous ?",
    a: "Non, consultez simplement les horaires sur la page OPD et présentez-vous directement.",
  },
];

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <div className="bg-bg-tint px-6 py-14 text-center sm:px-10 lg:px-[116px]">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-brand-navy sm:text-4xl">
            Questions Fréquentes
          </h1>
        </div>
        <section className="bg-white">
          <div className="mx-auto flex max-w-[720px] flex-col gap-6 px-6 py-16 sm:px-10">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-2xl bg-bg-tint-soft p-6">
                <p className="font-[family-name:var(--font-display)] font-bold text-brand-navy">
                  {item.q}
                </p>
                <p className="mt-2 text-sm text-text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
