import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import {
  deleteAppointment,
  updateAppointmentStatus,
} from "@/lib/repository";

type Status = "pending" | "confirmed" | "cancelled";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);

  const status = body?.status as Status | undefined;

  if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }

  await updateAppointmentStatus(id, status);

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
  }

  const { id } = await params;

  await deleteAppointment(id);

  return NextResponse.json({ ok: true });
}