/**
 * Uploads the encoded hero video variants to Vercel Blob and prints the
 * resulting public URLs for pasting into App.jsx.
 *
 * Prerequisites:
 *   1. npm install --save-dev @vercel/blob
 *   2. A BLOB_READ_WRITE_TOKEN env var — create one in your Vercel project:
 *      Settings > Environment Variables > create BLOB_READ_WRITE_TOKEN
 *      then copy it to a local .env.local file (already gitignored):
 *        BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxx
 *
 * Run:
 *   node --env-file=.env.local scripts/upload-hero-blob.mjs
 */
import { put } from '@vercel/blob';
import { createReadStream, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Explicitly use the RW token — prevents the SDK from falling back to OIDC
// auth (VERCEL_OIDC_TOKEN), which is blocked for the "development" environment.
const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) throw new Error('BLOB_READ_WRITE_TOKEN is not set in .env.local');

const files = [
  { local: 'public/videos/hero-1080.mp4',  remote: 'hero/hero-1080.mp4',  type: 'video/mp4' },
  { local: 'public/videos/hero-720.mp4',   remote: 'hero/hero-720.mp4',   type: 'video/mp4' },
  { local: 'public/videos/hero-1080.webm', remote: 'hero/hero-1080.webm', type: 'video/webm' },
  { local: 'public/videos/hero-720.webm',  remote: 'hero/hero-720.webm',  type: 'video/webm' },
  { local: 'public/images/hero-poster.jpg',remote: 'hero/hero-poster.jpg', type: 'image/jpeg' },
];

const urls = {};

for (const { local, remote, type } of files) {
  const abs = resolve(root, local);
  const mb = (statSync(abs).size / 1024 / 1024).toFixed(1);
  process.stdout.write(`> ${local} (${mb} MB) ... `);

  const body = createReadStream(abs);
  const { url } = await put(remote, body, {
    access: 'public',
    contentType: type,
    addRandomSuffix: false,
    token,
  });

  urls[local] = url;
  console.log('ok');
  console.log(`  ${url}`);
}

console.log('\n--- paste into App.jsx mediaSrc / posterSrc ---\n');
console.log(`mediaSrc={{
  desktop: { webm: '${urls['public/videos/hero-1080.webm']}', mp4: '${urls['public/videos/hero-1080.mp4']}' },
  mobile:  { webm: '${urls['public/videos/hero-720.webm']}',  mp4: '${urls['public/videos/hero-720.mp4']}' },
}}`);
console.log(`posterSrc='${urls['public/images/hero-poster.jpg']}'`);
