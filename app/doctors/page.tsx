import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { listDoctors } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Nos Docteurs | Muhiris Doctor",
};

export default async function DoctorsPage() {
  const doctors = await listDoctors(true);

  return (
    <>
      <Header />
      <main>
        <div className="bg-bg-tint px-6 py-14 text-center sm:px-10 lg:px-[116px]">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-brand-navy sm:text-4xl">
            Nos Docteurs
          </h1>
          <p className="mx-auto mt-3 max-w-[520px] text-sm text-text-muted sm:text-base">
            Une équipe médicale expérimentée et dévouée, prête à vous
            accompagner.
          </p>
        </div>

        <section className="bg-white">
          <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 lg:px-[76px]">
            {doctors.length === 0 ? (
              <p className="text-center text-text-muted">
                Aucun médecin disponible pour le moment.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="flex flex-col items-center gap-4 rounded-[26px] bg-bg-tint-soft p-8 text-center shadow-[0px_6.5px_27.4px_rgba(0,134,255,0.08)]"
                  >
                    <div className="flex size-24 items-center justify-center rounded-full bg-bg-tint text-3xl font-bold text-brand-blue">
                      {doctor.name.split(" ").slice(-1)[0].charAt(0)}
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-display)] text-lg font-bold text-brand-navy">
                        {doctor.name}
                      </p>
                      <p className="text-sm text-brand-blue">
                        {doctor.specialty}
                      </p>
                      {doctor.bio && (
                        <p className="mt-2 max-w-[220px] text-xs text-text-muted">
                          {doctor.bio}
                        </p>
                      )}
                    </div>
                    <Link
                      href={`/book?doctorId=${doctor.id}`}
                      className="mt-2 rounded-lg bg-brand-blue px-5 py-2 text-sm text-white transition-colors hover:bg-brand-blue-light"
                    >
                      Prendre rendez-vous
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
