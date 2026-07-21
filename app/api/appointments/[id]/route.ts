import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  findAppointmentById,
  updateAppointmentStatus,
} from "@/lib/repository";

type Status = "pending" | "confirmed" | "cancelled";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Non authentifié." },
      { status: 401 },
    );
  }

  const { id } = await params;

  const appointment = await findAppointmentById(id);

  if (!appointment) {
    return NextResponse.json(
      { error: "Introuvable." },
      { status: 404 },
    );
  }

  if (
    appointment.userId !== session.user.id &&
    session.user.role !== "admin"
  ) {
    return NextResponse.json(
      { error: "Non autorisé." },
      { status: 403 },
    );
  }

  const body = await req.json().catch(() => null);

  const status = body?.status as Status | undefined;

  if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
    return NextResponse.json(
      { error: "Statut invalide." },
      { status: 400 },
    );
  }

  await updateAppointmentStatus(id, status);

  return NextResponse.json({ ok: true });
}