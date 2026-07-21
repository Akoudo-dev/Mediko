/**
 * One-time setup script: downloads the real photo exports from Figma
 * (currently hot-linked via temporary figma.com URLs) into /public/images,
 * then rewrites lib/assets.ts to point at the local files.
 *
 * Why this exists: figma.com/api/mcp/asset/... URLs are short-lived. Run
 * this ONCE, right after generating/updating the project, while the links
 * are still fresh.
 *
 * Usage:
 *   node scripts/setup-images.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public", "images");

const assets = [
  {
    name: "hero-doctor.png",
    url: "https://www.figma.com/api/mcp/asset/57239c64-e3ff-4fde-8edc-6e54c58d798b",
    exportName: "heroDoctorPhoto",
  },
  {
    name: "about-us.png",
    url: "https://www.figma.com/api/mcp/asset/70d3f5ad-8533-47f0-87e0-e20b0a3157be",
    exportName: "aboutUsPhoto",
  },
  {
    name: "gallery-a.png",
    url: "https://www.figma.com/api/mcp/asset/ac4fe764-c3b8-4a3e-9e7a-20d5f5f17a4b",
    exportName: "galleryPhotoA",
  },
  {
    name: "gallery-b.png",
    url: "https://www.figma.com/api/mcp/asset/7df07bc4-f30c-4f42-984d-86325831fa87",
    exportName: "galleryPhotoB",
  },
  {
    name: "gallery-c.png",
    url: "https://www.figma.com/api/mcp/asset/dc022b16-5086-4da3-aa69-a71cd76c3435",
    exportName: "galleryPhotoC",
  },
  {
    name: "gallery-d.png",
    url: "https://www.figma.com/api/mcp/asset/a3b37f63-2f79-41df-9aa0-5f5d59a8cc43",
    exportName: "galleryPhotoD",
  },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const results = [];
  for (const asset of assets) {
    process.stdout.write(`Downloading ${asset.name}... `);
    try {
      const res = await fetch(asset.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      await writeFile(path.join(OUT_DIR, asset.name), buffer);
      console.log(`OK (${(buffer.length / 1024).toFixed(0)} KB)`);
      results.push(asset);
    } catch (err) {
      console.log(`FAILED (${err.message})`);
      console.log(
        `  -> The Figma link for ${asset.name} has probably expired.`,
      );
      console.log(
        "  -> Re-export it from Figma (or ask Claude to re-fetch it) and re-run this script.",
      );
    }
  }

  if (results.length === 0) {
    console.log("\nNo images were downloaded — lib/assets.ts left untouched.");
    return;
  }

  const lines = [
    "/**",
    " * Local photo assets (downloaded from Figma via scripts/setup-images.mjs).",
    " */",
  ];
  for (const asset of results) {
    lines.push(
      `export const ${asset.exportName} = "/images/${asset.name}";`,
    );
  }

  await writeFile(
    path.join(process.cwd(), "lib", "assets.ts"),
    lines.join("\n") + "\n",
  );

  console.log(
    `\nDone. lib/assets.ts now points at ${results.length} local image(s) in /public/images.`,
  );
}

main();
