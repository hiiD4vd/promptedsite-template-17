import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';

const manifest = JSON.parse(
  await fs.readFile(new URL('../src/config/assets.json', import.meta.url), 'utf8'),
);
const files = Object.entries(manifest.files);
let index = 0;

async function download(name) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(`${manifest.baseUrl}/${name}`, {
        headers: { Origin: 'http://localhost:3000' },
        signal: AbortSignal.timeout(60_000),
      });
      if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      return { response, bytes };
    } catch (error) {
      lastError = error;
      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 500));
      }
    }
  }
  throw lastError;
}

await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (index < files.length) {
      const [name, meta] = files[index++];
      const { response, bytes } = await download(name);
      const digest = createHash('sha256').update(bytes).digest('hex');
      if (bytes.length !== meta.bytes || digest !== meta.sha256) {
        throw new Error(`${name}: checksum mismatch`);
      }
      if (response.headers.get('content-type')?.split(';')[0] !== meta.contentType) {
        throw new Error(`${name}: wrong MIME type`);
      }
      const cors = response.headers.get('access-control-allow-origin');
      if (!['*', 'http://localhost:3000'].includes(cors)) {
        throw new Error(`${name}: CORS missing`);
      }
    }
  }),
);

console.log(`Verified ${files.length} CDN assets, hashes, MIME types and CORS.`);
