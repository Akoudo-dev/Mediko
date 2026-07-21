import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarPlus, Stethoscope } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatusBadge from "@/components/StatusBadge";
import CancelAppointmentButton from "@/components/dashboard/CancelAppointmentButton";
import { auth } from "@/lib/auth";
import { findUserById, listAppointmentsForUser } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Mon Espace | Muhiris Doctor",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const dbUser = await findUserById(session.user.id);
  if (!dbUser) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const appointments = await listAppointmentsForUser(session.user.id);
  const upcoming = appointments.filter((a) => a.status !== "cancelled");

  return (
    <>
      <Header />
      <main className="bg-bg-tint-alt">
        <div className="mx-auto max-w-[1100px] px-6 py-12 sm:px-10 lg:px-0">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-brand-blue">Mon espace patient</p>
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-brand-navy sm:text-3xl">
              Bonjour {session.user.name ?? session.user.email} 
            </h1>
            <p className="text-sm text-text-muted">{session.user.email}</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-[0px_6.5px_27.4px_rgba(0,134,255,0.08)]">
              <p className="text-3xl font-bold text-brand-navy">
                {upcoming.length}
              </p>
              <p className="text-sm text-text-muted">
                Rendez-vous actifs (hors annulés)
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-[0px_6.5px_27.4px_rgba(0,134,255,0.08)]">
              <p className="text-3xl font-bold text-brand-navy">
                {appointments.length}
              </p>
              <p className="text-sm text-text-muted">
                Rendez-vous au total
              </p>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-brand-navy">
              Mes rendez-vous
            </h2>
            <Link
              href="/book"
              className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm text-white transition-colors hover:bg-brand-blue-light"
            >
              <CalendarPlus className="size-4" />
              Nouveau rendez-vous
            </Link>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {appointments.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-10 text-center">
                <Stethoscope className="size-8 text-brand-blue" />
                <p className="text-text-muted">
                  Vous n&apos;avez aucun rendez-vous pour le moment.
                </p>
                <Link
                  href="/book"
                  className="rounded-lg bg-brand-blue px-5 py-2 text-sm text-white transition-colors hover:bg-brand-blue-light"
                >
                  Prendre rendez-vous
                </Link>
              </div>
            ) : (
              appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="flex flex-col gap-3 rounded-2xl bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-black">
                      {appt.doctorName}
                    </p>
                    <p className="text-sm text-text-muted">
                      {appt.specialty} ·{" "}
                      {new Date(appt.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={appt.status} />
                    {appt.status !== "cancelled" && (
                      <CancelAppointmentButton id={appt.id} />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
