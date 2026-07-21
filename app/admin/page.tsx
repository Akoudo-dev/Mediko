import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Users, Stethoscope, CalendarCheck, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatusBadge from "@/components/StatusBadge";
import AppointmentStatusSelect from "@/components/admin/AppointmentStatusSelect";
import DoctorManager from "@/components/admin/DoctorManager";
import { auth } from "@/lib/auth";
import {
  countUsers,
  findUserById,
  listAllAppointments,
  listAllUsers,
  listDoctors,
} from "@/lib/repository";

export const metadata: Metadata = {
  title: "Admin | Muhiris Doctor",
};

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }
  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const dbUser = await findUserById(session.user.id);
  if (!dbUser) {
    redirect("/login?callbackUrl=/admin");
  }

  const appointments = await listAllAppointments();
  const users = await listAllUsers();
  const doctors = await listDoctors(false);
  const totalUsers = await countUsers();

  const stats = [
    {
      label: "Patients inscrits",
      value: totalUsers,
      icon: Users,
    },
    {
      label: "Médecins",
      value: doctors.length,
      icon: Stethoscope,
    },
    {
      label: "Rendez-vous",
      value: appointments.length,
      icon: CalendarCheck,
    },
    {
      label: "En attente",
      value: appointments.filter((a) => a.status === "pending").length,
      icon: Clock,
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-bg-tint-alt">
        <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-10 lg:px-0">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-brand-blue">Espace administrateur</p>
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-brand-navy sm:text-3xl">
              Tableau de bord
            </h1>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-2 rounded-2xl bg-white p-5 shadow-[0px_6.5px_27.4px_rgba(0,134,255,0.08)]"
              >
                <stat.icon className="size-5 text-brand-blue" />
                <p className="text-2xl font-bold text-brand-navy">
                  {stat.value}
                </p>
                <p className="text-xs text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-brand-navy">
              Rendez-vous
            </h2>
            <div className="mt-4 overflow-x-auto rounded-2xl bg-white">
              {appointments.length === 0 ? (
                <p className="p-6 text-sm text-text-muted">
                  Aucun rendez-vous pour le moment.
                </p>
              ) : (
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-black/5 text-xs text-text-muted">
                      <th className="px-5 py-3 font-medium">Patient</th>
                      <th className="px-5 py-3 font-medium">Médecin</th>
                      <th className="px-5 py-3 font-medium">Date</th>
                      <th className="px-5 py-3 font-medium">Statut</th>
                      <th className="px-5 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appt) => (
                      <tr
                        key={appt.id}
                        className="border-b border-black/5 last:border-0"
                      >
                        <td className="px-5 py-3">
                          <p className="font-medium text-black">
                            {appt.patientName}
                          </p>
                          <p className="text-xs text-text-muted">
                            {appt.patientEmail}
                          </p>
                        </td>
                        <td className="px-5 py-3">
                          <p>{appt.doctorName}</p>
                          <p className="text-xs text-text-muted">
                            {appt.specialty}
                          </p>
                        </td>
                        <td className="px-5 py-3">
                          {new Date(appt.date).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="px-5 py-3">
                          <StatusBadge status={appt.status} />
                        </td>
                        <td className="px-5 py-3">
                          <AppointmentStatusSelect
                            id={appt.id}
                            status={appt.status as "pending" | "confirmed" | "cancelled"}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-brand-navy">
              Médecins
            </h2>
            <div className="mt-4">
              <DoctorManager initialDoctors={doctors} />
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-brand-navy">
              Utilisateurs
            </h2>
            <div className="mt-4 overflow-x-auto rounded-2xl bg-white">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-black/5 text-xs text-text-muted">
                    <th className="px-5 py-3 font-medium">Nom</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Rôle</th>
                    <th className="px-5 py-3 font-medium">Fournisseur</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-black/5 last:border-0">
                      <td className="px-5 py-3">{u.name}</td>
                      <td className="px-5 py-3 text-text-muted">{u.email}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            u.role === "admin"
                              ? "bg-brand-blue/10 text-brand-blue"
                              : "bg-black/5 text-black"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-text-muted">
                        {u.provider}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
