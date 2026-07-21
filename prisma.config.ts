import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Having a prisma.config.ts file disables Prisma CLI's automatic .env
// loading, so we load it ourselves here.
config();
config({ path: ".env.local", override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
