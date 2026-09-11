import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "figures");
mkdirSync(outDir, { recursive: true });

/**
 * Key out a near-white background by flood-filling inward from the image
 * border. Interior whites (armour, sword blades, highlights) are preserved
 * because they aren't connected to the edge. A short halo-erosion pass eats
 * the anti-aliased white fringe so the sprite sits cleanly on any backdrop.
 *
 * `removeEnclosedAbove` (optional) drops large enclosed pockets of trapped
 * background — only safe for poses with no large legitimate white areas.
 */
async function keyOutWhite(
  input,
  output,
  { threshold = 234, halo = 208, removeEnclosedAbove } = {}
) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const total = width * height;
  const visited = new Uint8Array(total);

  const isWhite = (p) => {
    const i = p * 4;
    return data[i] >= threshold && data[i + 1] >= threshold && data[i + 2] >= threshold;
  };

  const stack = [];
  const push = (p) => {
    if (!visited[p] && isWhite(p)) {
      visited[p] = 1;
      stack.push(p);
    }
  };

  for (let x = 0; x < width; x += 1) {
    push(x);
    push((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    push(y * width);
    push(y * width + width - 1);
  }

  while (stack.length) {
    const p = stack.pop();
    const x = p % width;
    const y = (p / width) | 0;
    if (x + 1 < width) push(p + 1);
    if (x - 1 >= 0) push(p - 1);
    if (y + 1 < height) push(p + width);
    if (y - 1 >= 0) push(p - width);
  }

  // Erode the light fringe touching removed pixels, 8-neighbourhood, twice.
  for (let pass = 0; pass < 2; pass += 1) {
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const p = y * width + x;
        if (visited[p]) continue;
        const i = p * 4;
        if (data[i] < halo || data[i + 1] < halo || data[i + 2] < halo) continue;
        let touches = false;
        for (let dy = -1; dy <= 1 && !touches; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
            if (visited[ny * width + nx]) {
              touches = true;
              break;
            }
          }
        }
        if (touches) visited[p] = 1;
      }
    }
  }

  // Optionally drop large enclosed near-white pockets.
  if (removeEnclosedAbove) {
    const isCand = (p) => {
      if (visited[p]) return false;
      const i = p * 4;
      return data[i] >= threshold && data[i + 1] >= threshold && data[i + 2] >= threshold;
    };
    const seen = new Uint8Array(total);
    for (let start = 0; start < total; start += 1) {
      if (seen[start] || !isCand(start)) continue;
      const component = [];
      const queue = [start];
      seen[start] = 1;
      while (queue.length) {
        const p = queue.pop();
        component.push(p);
        const x = p % width;
        const y = (p / width) | 0;
        const consider = (n) => {
          if (n >= 0 && n < total && !seen[n] && isCand(n)) {
            seen[n] = 1;
            queue.push(n);
          }
        };
        if (x + 1 < width) consider(p + 1);
        if (x - 1 >= 0) consider(p - 1);
        if (y + 1 < height) consider(p + width);
        if (y - 1 >= 0) consider(p - width);
      }
      if (component.length > removeEnclosedAbove) {
        for (const p of component) visited[p] = 1;
      }
    }
  }

  for (let p = 0; p < total; p += 1) {
    if (visited[p]) data[p * 4 + 3] = 0;
  }

  // Strip any uniform 1px frame baked into the source scan (e.g. a grey
  // border) that survived the key because it wasn't near-white.
  stripEdgeFrame(data, width, height);

  await sharp(data, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 1 })
    .resize({ width: 600, withoutEnlargement: true })
    .webp({ quality: 90, effort: 6 })
    .toFile(output);

  const meta = await sharp(output).metadata();
  console.log(`${output} -> ${meta.width}x${meta.height}`);
}

/** Remove a fully-opaque 1-4px frame left over from a scanned source. */
function stripEdgeFrame(data, width, height) {
  const opaque = (p) => data[p * 4 + 3] > 10;
  const lineOpaque = (line) => {
    let count = 0;
    for (const p of line) if (opaque(p)) count += 1;
    return count / line.length;
  };
  const clear = (line) => {
    for (const p of line) data[p * 4 + 3] = 0;
  };

  const edges = [
    (layer) => Array.from({ length: height }, (_, y) => y * width + layer),
    (layer) => Array.from({ length: height }, (_, y) => y * width + (width - 1 - layer)),
    (layer) => Array.from({ length: width }, (_, x) => layer * width + x),
    (layer) => Array.from({ length: width }, (_, x) => (height - 1 - layer) * width + x),
  ];

  for (const build of edges) {
    for (let layer = 0; layer < 4; layer += 1) {
      const line = build(layer);
      if (lineOpaque(line) < 0.98) break;
      clear(line);
    }
  }
}

const JOBS = [
  { src: "Flying_goku.jpg", out: "flying-goku.webp", removeEnclosedAbove: 2000 },
  { src: "Trunks.jpg", out: "trunks.webp" },
  { src: "Goku.jpg", out: "goku.webp" },
  { src: "Vegeta.jpg", out: "vegeta.webp" },
  { src: "Piccolo.jpg", out: "piccolo.webp" },
  { src: "Gohan.jpg", out: "gohan.webp" },
];

for (const job of JOBS) {
  await keyOutWhite(join(root, "public", job.src), join(outDir, job.out), {
    removeEnclosedAbove: job.removeEnclosedAbove,
  });
}

console.log("Figure cut-outs written to", outDir);
