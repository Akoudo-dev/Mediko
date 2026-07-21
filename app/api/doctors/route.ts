import { NextResponse } from "next/server";
import { listDoctors } from "@/lib/repository";

export async function GET() {
  return NextResponse.json({ doctors: await listDoctors(true) });
}
