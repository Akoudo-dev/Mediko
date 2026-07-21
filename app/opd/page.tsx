import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { opdSchedule } from "@/lib/data";

export const metadata: Metadata = {
  title: "OPD | Muhiris Doctor",
};

export default function OpdPage() {
  return (
    <>
      <Header />
      <main>
        <div className="bg-bg-tint px-6 py-14 text-center sm:px-10 lg:px-[116px]">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-brand-navy sm:text-4xl">
            Consultation Externe (OPD)
          </h1>
          <p className="mx-auto mt-3 max-w-[520px] text-sm text-text-muted sm:text-base">
            Consultez nos horaires et planifiez votre visite sans rendez-vous
            préalable.
          </p>
        </div>

        <section className="bg-white">
          <div className="mx-auto max-w-[720px] px-6 py-16 sm:px-10">
            <div className="flex flex-col gap-4">
              {opdSchedule.map((slot) => (
                <div
                  key={slot.day}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-bg-tint-soft px-6 py-5"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="size-5 text-brand-blue" />
                    <span className="font-medium text-black">{slot.day}</span>
                  </div>
                  <span className="text-text-muted">{slot.hours}</span>
                </div>
              ))}
            </div>

            <Link
              href="/book"
              className="mt-10 inline-flex items-center justify-center rounded-lg bg-brand-blue px-[30px] py-[14px] text-base text-white transition-colors hover:bg-brand-blue-light"
            >
              Réserver un créneau
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
