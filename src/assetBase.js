const viteBase =
  typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL
    ? import.meta.env.BASE_URL
    : null;

const nextBase =
  typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : null;

const fallbackBase = '/';

export const ASSET_BASE_URL = viteBase || nextBase || fallbackBase;

export function withAssetBase(path) {
  const cleanPath = String(path || '').replace(/^\/+/, '');
  const base = String(ASSET_BASE_URL || '/');
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${cleanPath}`;
}
