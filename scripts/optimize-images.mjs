// Curate + optimize a SMALL subset of real project imagery into public/images.
// Resizes to max 1600px wide at ~80% quality. Run: npm run optimize-images
// The full ~116MB library is intentionally NOT committed; only this subset is.
import sharp from 'sharp';
import { mkdir, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const LIB = '/tmp/Job-Portfolio/assets/Project Pictures';
const OUT = resolve(ROOT, 'public/images');

// [sourcePath, outName, label]
const JOBS = [
  // Hero RevealFrame pair — Ado Hall of Worship (raw wireframe -> finished render)
  [`${LIB}/Ado Hall of Worship/ADO CENTER RAW 1.jpg`, 'ado-raw.jpg', 'Ado hall — structural model'],
  [`${LIB}/Ado Hall of Worship/Image8_005.png`, 'ado-finished.jpg', 'Ado hall — finished render'],
  [`${LIB}/Ado Hall of Worship/Image10_002.png`, 'ado-finished-alt.jpg', 'Ado hall — finished render (alt)'],
  // Services / featured work
  [`${LIB}/SchemaProjects/BIG SCHEMA RAW 1.jpg`, 'schema-massing.jpg', 'Architectural massing model'],
  [`${LIB}/SchemaProjects/LOFT RAW 1.jpg`, 'loft-raw.jpg', 'Loft — design model'],
  [`${LIB}/Design For Ikeja confencens room/Image2_050.png`, 'ikeja-interior.jpg', 'Ikeja conference room — interior render'],
  [`${LIB}/Design For Ikeja confencens room/Image6_014.png`, 'ikeja-interior-2.jpg', 'Ikeja conference room — interior render 2'],
  [`${LIB}/Landsacpe Projects/NEW HOTEL 1.jpg`, 'landscape-plan.jpg', 'Landscape site plan'],
];

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function run() {
  await mkdir(OUT, { recursive: true });
  let ok = 0;
  for (const [src, name] of JOBS) {
    if (!(await exists(src))) {
      console.warn(`SKIP (missing): ${src}`);
      continue;
    }
    const dest = resolve(OUT, name);
    await sharp(src)
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(dest);
    const meta = await sharp(dest).metadata();
    console.log(`OK  ${name}  (${meta.width}x${meta.height})`);
    ok++;
  }
  console.log(`\nDone: ${ok}/${JOBS.length} images written to public/images`);
}

run().catch((e) => { console.error(e); process.exit(1); });
