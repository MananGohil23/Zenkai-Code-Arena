import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "audio");
mkdirSync(outDir, { recursive: true });

const SR = 22050;

function writeWav(path, samples) {
  const n = samples.length;
  const buffer = Buffer.alloc(44 + n * 2);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + n * 2, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(SR, 24);
  buffer.writeUInt32LE(SR * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i += 1) {
    const v = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.round(v * 32767), 44 + i * 2);
  }
  writeFileSync(path, buffer);
}

const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);

function wave(type, phase) {
  if (type === "square") return Math.sign(Math.sin(phase));
  if (type === "triangle") return (2 / Math.PI) * Math.asin(Math.sin(phase));
  if (type === "saw") return 2 * (((phase / (2 * Math.PI)) % 1 + 1) % 1) - 1;
  return Math.sin(phase);
}

function envelope(t, dur, { a = 0.008, d = 0.06, s = 0.55, r = 0.12 } = {}) {
  if (t < a) return t / a;
  if (t < a + d) return 1 - (1 - s) * ((t - a) / d);
  if (t < dur) return s;
  const rt = t - dur;
  if (rt < r) return s * (1 - rt / r);
  return 0;
}

function addNote(buf, start, dur, freq, type, vol, envOpts) {
  const s0 = Math.floor(start * SR);
  const n = Math.floor((dur + (envOpts?.r ?? 0.12) + 0.02) * SR);
  let phase = 0;
  for (let i = 0; i < n; i += 1) {
    let idx = s0 + i;
    if (idx >= buf.length) idx -= buf.length; // wrap tail for a seamless loop
    if (idx < 0) continue;
    const t = i / SR;
    phase += (2 * Math.PI * freq) / SR;
    buf[idx] += wave(type, phase) * vol * envelope(t, dur, envOpts);
  }
}

function addKick(buf, start, vol) {
  const s0 = Math.floor(start * SR);
  const n = Math.floor(0.2 * SR);
  let phase = 0;
  for (let i = 0; i < n; i += 1) {
    const idx = s0 + i;
    if (idx >= buf.length) break;
    const t = i / SR;
    const f = 46 + 120 * Math.exp(-t * 22);
    phase += (2 * Math.PI * f) / SR;
    buf[idx] += Math.sin(phase) * vol * Math.exp(-t * 7);
  }
}

function addNoise(buf, start, dur, vol, decay) {
  const s0 = Math.floor(start * SR);
  const n = Math.floor(dur * SR);
  for (let i = 0; i < n; i += 1) {
    const idx = s0 + i;
    if (idx >= buf.length) break;
    const t = i / SR;
    buf[idx] += (Math.random() * 2 - 1) * vol * Math.exp(-t * decay);
  }
}

const THEMES = {
  goku: {
    bpm: 138,
    lead: "square",
    chords: [
      [60, 64, 67],
      [65, 69, 72],
      [67, 71, 74],
      [69, 72, 76],
    ],
    motif: [72, null, 76, 74, 72, 74, 76, 72, 69, null, 74, 72, 71, 74, 76, 79],
  },
  vegeta: {
    bpm: 124,
    lead: "saw",
    chords: [
      [62, 65, 69],
      [58, 62, 65],
      [65, 69, 72],
      [57, 61, 64],
    ],
    motif: [74, null, 73, 74, 77, 74, 73, 70, 72, null, 74, 77, 76, 73, 70, 69],
  },
  piccolo: {
    bpm: 104,
    lead: "triangle",
    chords: [
      [64, 67, 71],
      [60, 64, 67],
      [67, 71, 74],
      [62, 66, 69],
    ],
    motif: [71, null, null, 74, 76, null, 71, 67, 72, null, 74, 76, 71, null, 67, null],
  },
  gohan: {
    bpm: 118,
    lead: "square",
    chords: [
      [67, 71, 74],
      [64, 67, 71],
      [60, 64, 67],
      [62, 66, 69],
    ],
    motif: [79, 76, 74, 76, 79, 81, 79, 76, 72, 74, 76, 79, 81, 79, 76, 74],
  },
};

function buildTrack(theme) {
  const beat = 60 / theme.bpm;
  const beats = 16;
  const length = Math.floor(beats * beat * SR);
  const buf = new Float32Array(length);

  for (let bar = 0; bar < 4; bar += 1) {
    const chord = theme.chords[bar];
    const barStart = bar * 4 * beat;

    // Pad chord across the bar
    chord.forEach((note, i) => {
      addNote(buf, barStart, beat * 3.6, midi(note), "triangle", 0.06, {
        a: 0.05,
        d: 0.2,
        s: 0.4,
        r: 0.3,
      });
    });

    // Bass on each beat
    for (let b = 0; b < 4; b += 1) {
      addNote(buf, barStart + b * beat, beat * 0.8, midi(chord[0] - 24), "square", 0.14, {
        a: 0.006,
        d: 0.05,
        s: 0.5,
        r: 0.06,
      });
    }

    // Eighth-note arpeggio
    for (let e = 0; e < 8; e += 1) {
      const note = chord[e % chord.length] + (e >= 4 ? 12 : 0);
      addNote(buf, barStart + e * (beat / 2), beat * 0.42, midi(note), theme.lead, 0.05, {
        a: 0.005,
        d: 0.04,
        s: 0.3,
        r: 0.05,
      });
    }

    // Drums
    addKick(buf, barStart, 0.5);
    addKick(buf, barStart + 2 * beat, 0.5);
    addNoise(buf, barStart + beat, 0.16, 0.22, 22);
    addNoise(buf, barStart + 3 * beat, 0.16, 0.22, 22);
    for (let e = 0; e < 8; e += 1) {
      addNoise(buf, barStart + e * (beat / 2), 0.03, 0.06, 60);
    }
  }

  // Lead motif, one note per beat
  theme.motif.forEach((note, i) => {
    if (note == null) return;
    addNote(buf, i * beat, beat * 0.85, midi(note), theme.lead, 0.11, {
      a: 0.006,
      d: 0.05,
      s: 0.6,
      r: 0.08,
    });
  });

  // Normalise to a healthy peak.
  let peak = 0;
  for (let i = 0; i < buf.length; i += 1) peak = Math.max(peak, Math.abs(buf[i]));
  const gain = peak > 0 ? 0.9 / peak : 1;
  for (let i = 0; i < buf.length; i += 1) buf[i] *= gain;

  let sum = 0;
  for (let i = 0; i < buf.length; i += 1) sum += buf[i] * buf[i];
  return { buf, rms: Math.sqrt(sum / buf.length) };
}

for (const [name, theme] of Object.entries(THEMES)) {
  const { buf, rms } = buildTrack(theme);
  const out = join(outDir, `${name}.wav`);
  writeWav(out, buf);
  console.log(`${name}.wav  ${(buf.length / SR).toFixed(1)}s  rms=${rms.toFixed(3)}`);
}
console.log("Themes written to", outDir);
