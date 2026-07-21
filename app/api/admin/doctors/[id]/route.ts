import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { deleteDoctor, setDoctorActive } from "@/lib/repository";

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
  const active = body?.active as boolean | undefined;

  if (typeof active !== "boolean") {
    return NextResponse.json({ error: "Champ 'active' requis." }, { status: 400 });
  }

  await setDoctorActive(id, active);
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
  await deleteDoctor(id);
  return NextResponse.json({ ok: true });
}
