export type SanitizedHtml = string & { readonly __tiroxSanitizedHtml: unique symbol };
export type SanitizedSvg = string & { readonly __tiroxSanitizedSvg: unique symbol };

export interface CanvasAsset {
  src: string;
  type: 'image' | 'font';
}

export type SanitizedCanvasAsset = CanvasAsset & {
  readonly __tiroxSanitizedCanvasAsset: unique symbol;
};

export type HydrationValue =
  | string
  | number
  | boolean
  | null
  | HydrationValue[]
  | { readonly [key: string]: HydrationValue };

export function createSanitizedHtml(
  value: string,
  sanitize: (input: string) => string,
): SanitizedHtml {
  return sanitize(value) as SanitizedHtml;
}

export function createSanitizedSvg(
  value: string,
  sanitize: (input: string) => string,
): SanitizedSvg {
  const sanitized = sanitize(value);
  if (!isSafeSvg(sanitized)) throw new Error('Sanitized SVG contains unsafe markup or references.');
  return sanitized as SanitizedSvg;
}

export function createSanitizedCanvasAsset(
  asset: CanvasAsset,
  sanitize: (input: CanvasAsset) => CanvasAsset,
): SanitizedCanvasAsset {
  const sanitized = sanitize(asset);
  if (!isSafeUrl(sanitized.src, assetProtocols)) {
    throw new Error('Canvas asset URL uses an unsafe protocol.');
  }
  return sanitized as SanitizedCanvasAsset;
}

const forbiddenStateKeys = /(?:password|secret|token|cookie|authorization|credential|pii)/i;

export function serializeHydrationState<T extends Record<string, HydrationValue>>(
  state: T,
  allowedKeys: readonly (keyof T)[],
): string {
  const selected: Record<string, HydrationValue> = Object.create(null);
  for (const key of allowedKeys) {
    const name = String(key);
    if (forbiddenStateKeys.test(name) || name === '__proto__' || !Object.hasOwn(state, key)) {
      continue;
    }
    const value = state[key];
    if (value !== undefined) selected[name] = value;
  }
  assertSafeHydrationValue(selected);
  return JSON.stringify(selected)
    .replaceAll('<', '\\u003c')
    .replaceAll('>', '\\u003e')
    .replaceAll('&', '\\u0026')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029');
}

function assertSafeHydrationValue(value: HydrationValue): void {
  if (Array.isArray(value)) {
    value.forEach(assertSafeHydrationValue);
    return;
  }
  if (value !== null && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (forbiddenStateKeys.test(key) || key === '__proto__') {
        throw new Error(`Hydration state contains a forbidden key: ${key}`);
      }
      assertSafeHydrationValue(child);
    }
  }
}

const defaultProtocols = new Set(['http:', 'https:', 'mailto:', 'tel:']);
const assetProtocols = new Set(['http:', 'https:']);

function isSafeSvg(value: string): boolean {
  return !(
    /<\s*script\b/i.test(value) ||
    /\bon[a-z]+\s*=\s*["']/i.test(value) ||
    /(?:href|xlink:href)\s*=\s*["']\s*(?:javascript:|data:|https?:\/\/)/i.test(value)
  );
}

export function isSafeUrl(
  value: string,
  protocols: ReadonlySet<string> = defaultProtocols,
): boolean {
  try {
    return protocols.has(new URL(value, 'http://localhost').protocol);
  } catch {
    return false;
  }
}
