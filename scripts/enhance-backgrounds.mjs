import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "scenes");
mkdirSync(outDir, { recursive: true });

/**
 * Upscale the painted scene backdrops so the browser stretches them far less
 * when they fill the viewport. Lanczos resampling plus a mild unsharp mask
 * recovers crispness that bilinear browser scaling would otherwise smear.
 */
const TARGET_WIDTH = 1920;

const JOBS = [
  { src: "Background1.jpg", out: "kame.webp" },
  { src: "Background2.jpg", out: "namek.webp" },
  { src: "Background3.jpg", out: "wasteland.webp" },
];

for (const job of JOBS) {
  const input = join(root, "public", job.src);
  const meta = await sharp(input).metadata();
  const scale = (TARGET_WIDTH / meta.width).toFixed(2);

  await sharp(input)
    .resize({ width: TARGET_WIDTH, kernel: "lanczos3" })
    .sharpen({ sigma: 0.9, m1: 0.4, m2: 0.4 })
    .webp({ quality: 86, effort: 6 })
    .toFile(join(outDir, job.out));

  const outMeta = await sharp(join(outDir, job.out)).metadata();
  console.log(
    `${job.out}  ${meta.width}x${meta.height} -> ${outMeta.width}x${outMeta.height} (${scale}x)`
  );
}

console.log("Enhanced scenes written to", outDir);
