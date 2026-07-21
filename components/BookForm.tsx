"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Doctor } from "@/lib/repository";

export default function BookForm({
  preselectedDoctorId,
}: {
  preselectedDoctorId: string;
}) {
  const { data: session, status } = useSession();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorId, setDoctorId] = useState(preselectedDoctorId);
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data.doctors ?? []))
      .catch(() => setError("Impossible de charger la liste des médecins."));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const doctor = doctors.find((d) => d.id === doctorId);
    if (!doctor) {
      setError("Merci de choisir un médecin.");
      return;
    }
    if (!date) {
      setError("Merci de choisir une date.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        date,
      }),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Une erreur est survenue.");
      return;
    }

    setSubmitted(true);
  }

  return (
    <>
      <Header />
      <main>
        <div className="bg-bg-tint px-6 py-14 text-center sm:px-10 lg:px-[116px]">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-brand-navy sm:text-4xl">
            Prendre Rendez-vous
          </h1>
          <p className="mx-auto mt-3 max-w-[520px] text-sm text-text-muted sm:text-base">
            Réservez une consultation avec l&apos;un de nos médecins en
            quelques clics.
          </p>
        </div>

        <section className="bg-white">
          <div className="mx-auto max-w-[560px] px-6 py-16 sm:px-10">
            {status === "loading" ? (
              <div className="flex justify-center py-10">
                <Loader2 className="size-6 animate-spin text-brand-blue" />
              </div>
            ) : status === "unauthenticated" ? (
              <div className="flex flex-col items-center gap-4 rounded-3xl bg-bg-tint-soft p-10 text-center">
                <p className="font-[family-name:var(--font-display)] text-xl font-bold text-brand-navy">
                  Connectez-vous pour réserver
                </p>
                <p className="text-sm text-text-muted">
                  Créez un compte patient ou connectez-vous pour prendre
                  rendez-vous et suivre vos consultations depuis votre
                  tableau de bord.
                </p>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/login?callbackUrl=${encodeURIComponent(
                      "/book" +
                        (preselectedDoctorId
                          ? `?doctorId=${preselectedDoctorId}`
                          : ""),
                    )}`}
                    className="rounded-lg bg-brand-blue px-6 py-3 text-sm text-white transition-colors hover:bg-brand-blue-light"
                  >
                    Se connecter
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-lg border border-brand-blue px-6 py-3 text-sm text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
                  >
                    Créer un compte
                  </Link>
                </div>
              </div>
            ) : submitted ? (
              <div className="flex flex-col items-center gap-4 rounded-3xl bg-bg-tint-soft p-10 text-center">
                <CheckCircle2 className="size-12 text-brand-blue" />
                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-brand-navy">
                  Rendez-vous confirmé !
                </h2>
                <p className="text-sm text-text-muted">
                  Votre demande a été enregistrée. Suivez son statut depuis
                  votre tableau de bord.
                </p>
                <Link
                  href="/dashboard"
                  className="mt-2 rounded-lg bg-brand-blue px-6 py-3 text-sm text-white transition-colors hover:bg-brand-blue-light"
                >
                  Voir mon tableau de bord
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 rounded-3xl bg-bg-tint-soft p-8 sm:p-10"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-black">
                    Nom complet
                  </label>
                  <input
                    disabled
                    value={session?.user?.name ?? session?.user?.email ?? ""}
                    className="rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-sm text-text-muted outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-black">
                    Email
                  </label>
                  <input
                    disabled
                    value={session?.user?.email ?? ""}
                    className="rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-sm text-text-muted outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-black">
                    Médecin
                  </label>
                  <select
                    required
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue"
                  >
                    <option value="">Choisir un médecin</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} — {doctor.specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-black">
                    Date souhaitée
                  </label>
                  <input
                    required
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().slice(0, 10)}
                    className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue"
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-light disabled:opacity-60"
                >
                  {loading && <Loader2 className="size-4 animate-spin" />}
                  {loading ? "Envoi..." : "Confirmer le rendez-vous"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
