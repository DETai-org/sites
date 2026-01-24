const fs = require("fs/promises");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const sourcePublicDir = path.join(repoRoot, "packages", "static-assets", "public");
const targetSites = ["detai-site", "personal-site"];

async function ensureSourceExists() {
  await fs.mkdir(sourcePublicDir, { recursive: true });
}

async function syncToSite(siteName) {
  const targetPublicDir = path.join(repoRoot, siteName, "public");
  await fs.mkdir(targetPublicDir, { recursive: true });
  await fs.cp(sourcePublicDir, targetPublicDir, { recursive: true });
}

async function run() {
  await ensureSourceExists();
  await Promise.all(targetSites.map((siteName) => syncToSite(siteName)));
  console.log("Static assets synced:", targetSites.join(", "));
}

run().catch((error) => {
  console.error("Static assets sync failed:", error);
  process.exit(1);
});
