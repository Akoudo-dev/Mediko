import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import type {
  User as PrismaUser,
  Doctor as PrismaDoctor,
  Appointment as PrismaAppointment,
} from "@prisma/client";

export type Role = "client" | "admin";

export type User = PrismaUser;
export type Doctor = PrismaDoctor;
export type Appointment = PrismaAppointment;

// ---- Users ----

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email: email.toLowerCase() } });
}

export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

export async function createUser(params: {
  name: string;
  email: string;
  password?: string;
  role?: Role;
  provider?: "credentials" | "google";
}): Promise<User> {
  const passwordHash = params.password
    ? bcrypt.hashSync(params.password, 10)
    : null;

  return prisma.user.create({
    data: {
      name: params.name,
      email: params.email.toLowerCase(),
      passwordHash,
      role: params.role ?? "client",
      provider: params.provider ?? "credentials",
    },
  });
}

export function verifyPassword(user: User, password: string): boolean {
  if (!user.passwordHash) return false;
  return bcrypt.compareSync(password, user.passwordHash);
}

export async function countUsers(): Promise<number> {
  return prisma.user.count();
}

export async function listAllUsers(): Promise<User[]> {
  return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
}

// ---- Doctors ----

export async function listDoctors(onlyActive = true): Promise<Doctor[]> {
  return prisma.doctor.findMany({
    where: onlyActive ? { active: true } : undefined,
    orderBy: { name: "asc" },
  });
}

export async function createDoctor(params: {
  name: string;
  specialty: string;
  bio?: string;
}): Promise<Doctor> {
  return prisma.doctor.create({
    data: {
      name: params.name,
      specialty: params.specialty,
      bio: params.bio ?? "",
      active: true,
    },
  });
}

export async function setDoctorActive(id: string, active: boolean) {
  await prisma.doctor.update({ where: { id }, data: { active } });
}

export async function deleteDoctor(id: string) {
  await prisma.doctor.delete({ where: { id } });
}

// ---- Appointments ----

export async function createAppointment(params: {
  userId: string;
  patientName: string;
  patientEmail: string;
  doctorId?: string;
  doctorName: string;
  specialty: string;
  date: string;
}): Promise<Appointment> {
  return prisma.appointment.create({
    data: {
      userId: params.userId,
      patientName: params.patientName,
      patientEmail: params.patientEmail,
      doctorId: params.doctorId ?? null,
      doctorName: params.doctorName,
      specialty: params.specialty,
      date: params.date,
      status: "pending",
    },
  });
}

export async function listAppointmentsForUser(
  userId: string,
): Promise<Appointment[]> {
  return prisma.appointment.findMany({
    where: { userId },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });
}

export async function listAllAppointments(): Promise<Appointment[]> {
  return prisma.appointment.findMany({
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });
}

export async function findAppointmentById(
  id: string,
): Promise<Appointment | null> {
  return prisma.appointment.findUnique({ where: { id } });
}

export async function updateAppointmentStatus(
  id: string,
  status: "pending" | "confirmed" | "cancelled",
) {
  await prisma.appointment.update({ where: { id }, data: { status } });
}

export async function deleteAppointment(id: string) {
  await prisma.appointment.delete({ where: { id } });
}
