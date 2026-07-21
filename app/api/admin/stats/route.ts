import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { countUsers, listAllAppointments, listDoctors } from "@/lib/repository";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
  }

  const appointments = await listAllAppointments();
  const totalUsers = await countUsers();
  const doctors = await listDoctors(false);

  return NextResponse.json({
    totalUsers,
    totalDoctors: doctors.length,
    totalAppointments: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  });
}
