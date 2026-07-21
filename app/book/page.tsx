import type { Metadata } from "next";
import BookForm from "@/components/BookForm";

export const metadata: Metadata = {
  title: "Prendre Rendez-vous | Muhiris Doctor",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ doctorId?: string }>;
}) {
  const { doctorId } = await searchParams;
  return <BookForm preselectedDoctorId={doctorId ?? ""} />;
}
