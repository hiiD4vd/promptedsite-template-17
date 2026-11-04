import manifest from './assets.json';
const base = import.meta.env.VITE_MEDIA_BASE_URL || manifest.baseUrl;
export function mediaUrl(value: string): string {
  if (!value.startsWith('/') || value.startsWith('//')) return value;
  return base.replace(/\/$/, '') + value;
}
