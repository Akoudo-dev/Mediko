import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { createDoctor, listDoctors } from "@/lib/repository";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
  }

  return NextResponse.json({ doctors: await listDoctors(false) });
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const name = body?.name as string | undefined;
  const specialty = body?.specialty as string | undefined;
  const bio = body?.bio as string | undefined;

  if (!name || !specialty) {
    return NextResponse.json(
      { error: "Nom et spécialité sont requis." },
      { status: 400 },
    );
  }

  const doctor = await createDoctor({ name, specialty, bio });
  return NextResponse.json({ doctor });
}
