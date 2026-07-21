import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  createAppointment,
  findUserById,
  listAppointmentsForUser,
} from "@/lib/repository";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const appointments = await listAppointmentsForUser(session.user.id);
  return NextResponse.json({ appointments });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  // The JWT can outlive the database row it points to (e.g. after a
  // `prisma migrate reset`, or if the account was deleted). Catch that
  // here with a clear message instead of letting the FK constraint throw
  // a raw 500.
  const dbUser = await findUserById(session.user.id);
  if (!dbUser) {
    return NextResponse.json(
      {
        error:
          "Votre session n'est plus valide. Déconnectez-vous puis reconnectez-vous.",
      },
      { status: 401 },
    );
  }

  const body = await req.json().catch(() => null);
  const doctorName = body?.doctorName as string | undefined;
  const specialty = body?.specialty as string | undefined;
  const date = body?.date as string | undefined;
  const doctorId = body?.doctorId as string | undefined;

  if (!doctorName || !specialty || !date) {
    return NextResponse.json(
      { error: "Médecin, spécialité et date sont requis." },
      { status: 400 },
    );
  }

  const appointment = await createAppointment({
    userId: dbUser.id,
    patientName: dbUser.name ?? session.user.email ?? "Patient",
    patientEmail: dbUser.email ?? "",
    doctorId,
    doctorName,
    specialty,
    date,
  });

  return NextResponse.json({ appointment });
}
