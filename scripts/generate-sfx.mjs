import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "sfx");
mkdirSync(outDir, { recursive: true });

const SAMPLE_RATE = 22050;

function writeWav(path, samples) {
  const numSamples = samples.length;
  const buffer = Buffer.alloc(44 + numSamples * 2);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(numSamples * 2, 40);
  for (let i = 0; i < numSamples; i += 1) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.round(clamped * 32767), 44 + i * 2);
  }
  writeFileSync(path, buffer);
}

function tone({ freq, duration, type = "square", volume = 0.5, glide = 0 }) {
  const length = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(length);
  let phase = 0;
  for (let i = 0; i < length; i += 1) {
    const t = i / SAMPLE_RATE;
    const f = freq + glide * t;
    phase += (2 * Math.PI * f) / SAMPLE_RATE;
    let value;
    if (type === "square") value = Math.sign(Math.sin(phase));
    else if (type === "triangle") value = (2 / Math.PI) * Math.asin(Math.sin(phase));
    else value = Math.sin(phase);
    const attack = Math.min(1, t / 0.005);
    const decay = Math.exp(-t * (4 / Math.max(duration, 0.05)));
    samples[i] = value * volume * attack * decay;
  }
  return samples;
}

function sequence(parts) {
  const total = parts.reduce(
    (sum, part) => sum + Math.floor(SAMPLE_RATE * part.duration),
    0
  );
  const out = new Float32Array(total);
  let offset = 0;
  for (const part of parts) {
    const samples = tone(part);
    out.set(samples, offset);
    offset += samples.length;
  }
  return out;
}

writeWav(join(outDir, "blip.wav"), tone({ freq: 880, duration: 0.07, volume: 0.4 }));
writeWav(
  join(outDir, "confirm.wav"),
  sequence([
    { freq: 660, duration: 0.08, volume: 0.45 },
    { freq: 990, duration: 0.16, volume: 0.45 },
  ])
);
writeWav(
  join(outDir, "boot.wav"),
  sequence([
    { freq: 523, duration: 0.09, volume: 0.4 },
    { freq: 659, duration: 0.09, volume: 0.4 },
    { freq: 784, duration: 0.09, volume: 0.4 },
    { freq: 1046, duration: 0.22, volume: 0.45 },
  ])
);
writeWav(
  join(outDir, "error.wav"),
  tone({ freq: 200, duration: 0.28, type: "square", volume: 0.4, glide: -120 })
);

console.log("Wrote SFX to", outDir);
