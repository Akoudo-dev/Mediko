import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/repository";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = body?.name as string | undefined;
  const email = body?.email as string | undefined;
  const password = body?.password as string | undefined;

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Nom, email et mot de passe sont requis." },
      { status: 400 },
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Le mot de passe doit contenir au moins 6 caractères." },
      { status: 400 },
    );
  }

  if (await findUserByEmail(email)) {
    return NextResponse.json(
      { error: "Un compte existe déjà avec cet email." },
      { status: 409 },
    );
  }

  const user = await createUser({ name, email, password, role: "client" });

  return NextResponse.json({
    id: user.id,
    email: user.email,
    name: user.name,
  });
}
