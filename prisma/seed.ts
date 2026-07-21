import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// `prisma migrate dev` auto-loads .env, but running this file standalone
// via `tsx` does not — load both, with .env.local taking precedence.
config();
config({ path: ".env.local", override: true });

const prisma = new PrismaClient();

async function main() {
  const doctorCount = await prisma.doctor.count();

  if (doctorCount === 0) {
    await prisma.doctor.createMany({
      data: [
        {
          name: "Dr. Sarah Mitchell",
          specialty: "Cardiology",
          bio: "15 ans d'expérience en cardiologie interventionnelle.",
        },
        {
          name: "Dr. James Carter",
          specialty: "Neuro Surgery",
          bio: "Spécialiste en neurochirurgie mini-invasive.",
        },
        {
          name: "Dr. Amara Okoye",
          specialty: "Dentistry",
          bio: "Dentisterie générale et esthétique.",
        },
        {
          name: "Dr. Daniel Reyes",
          specialty: "Ophthalmology",
          bio: "Chirurgie oculaire et suivi de la vue.",
        },
        {
          name: "Dr. Lina Haddad",
          specialty: "General Diagnosis",
          bio: "Médecine générale et diagnostic précoce.",
        },
        {
          name: "Dr. Marcus Webb",
          specialty: "Pharmacy",
          bio: "Conseil pharmaceutique et gestion des traitements.",
        },
      ],
    });
    console.log("Seeded 6 doctors.");
  } else {
    console.log(`Doctors already seeded (${doctorCount}), skipping.`);
  }

  const admin = await prisma.user.findUnique({
    where: { email: "admin@muhirisdoctor.com" },
  });

  if (!admin) {
    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@muhirisdoctor.com",
        passwordHash: bcrypt.hashSync("admin1234", 10),
        role: "admin",
        provider: "credentials",
      },
    });
    console.log("Seeded admin account (admin@muhirisdoctor.com / admin1234).");
  } else {
    console.log("Admin account already exists, skipping.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
