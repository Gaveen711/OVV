/**
 * Encodes the master hero footage into web-ready variants.
 *
 * Source lives outside the bundle (public/videos/_source/) so the 4K master is
 * never shipped. Outputs are written to public/videos/.
 *
 *   node scripts/encode-hero.mjs [path/to/master.mp4]
 *
 * Every MP4 gets +faststart so the moov atom sits at the head of the file and
 * the browser can start painting after the first few hundred KB instead of
 * waiting for the whole download.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpeg from 'ffmpeg-static';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, process.argv[2] ?? 'public/videos/_source/hero-master.mp4');
const videoDir = resolve(root, 'public/videos');
const imageDir = resolve(root, 'public/images');

if (!existsSync(source)) {
  console.error(`Master file not found: ${source}`);
  process.exit(1);
}
mkdirSync(videoDir, { recursive: true });
mkdirSync(imageDir, { recursive: true });

// Shared: strip audio (the hero is always muted), force yuv420p for Safari,
// and pin a 2s keyframe interval so seeking/looping stays cheap.
const common = ['-an', '-pix_fmt', 'yuv420p', '-g', '60', '-keyint_min', '60'];

const jobs = [
  {
    label: 'hero-1080.mp4',
    args: [
      '-vf', 'scale=1920:-2',
      '-c:v', 'libx264', '-profile:v', 'high', '-level', '4.0',
      '-preset', 'slow', '-crf', '25',
      '-maxrate', '4M', '-bufsize', '8M',
      ...common,
      '-movflags', '+faststart',
    ],
  },
  {
    label: 'hero-720.mp4',
    args: [
      '-vf', 'scale=1280:-2',
      '-c:v', 'libx264', '-profile:v', 'main', '-level', '3.1',
      '-preset', 'slow', '-crf', '27',
      '-maxrate', '2M', '-bufsize', '4M',
      ...common,
      '-movflags', '+faststart',
    ],
  },
  {
    label: 'hero-1080.webm',
    args: [
      '-vf', 'scale=1920:-2',
      // VP9's CRF scale runs higher than x264's for equivalent quality; 37 here
      // is visually on par with the CRF 25 MP4 above but meaningfully smaller.
      '-c:v', 'libvpx-vp9', '-crf', '37', '-b:v', '0',
      '-row-mt', '1', '-tile-columns', '2', '-deadline', 'good', '-cpu-used', '2',
      ...common,
    ],
  },
  {
    label: 'hero-720.webm',
    args: [
      '-vf', 'scale=1280:-2',
      '-c:v', 'libvpx-vp9', '-crf', '41', '-b:v', '0',
      '-row-mt', '1', '-tile-columns', '1', '-deadline', 'good', '-cpu-used', '2',
      ...common,
    ],
  },
];

const mb = (p) => (statSync(p).size / 1024 / 1024).toFixed(1);

for (const { label, args } of jobs) {
  const out = resolve(videoDir, label);
  console.log(`> ${label}`);
  execFileSync(ffmpeg, ['-y', '-hide_banner', '-loglevel', 'error', '-i', source, ...args, out], {
    stdio: 'inherit',
  });
  console.log(`  ${mb(out)} MB`);
}

// Poster = frame 1 of the encode, so the still and the video's first painted
// frame are identical and there is no visible swap.
const poster = resolve(imageDir, 'hero-poster.jpg');
console.log('> hero-poster.jpg');
execFileSync(
  ffmpeg,
  ['-y', '-hide_banner', '-loglevel', 'error', '-i', source, '-frames:v', '1',
   '-vf', 'scale=1920:-2', '-q:v', '4', poster],
  { stdio: 'inherit' }
);
console.log(`  ${mb(poster)} MB`);

console.log(`\nSource was ${mb(source)} MB.`);
