import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { listAllAppointments } from "@/lib/repository";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
  }

  return NextResponse.json({ appointments: await listAllAppointments() });
}
