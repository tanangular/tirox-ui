export interface ContrastCheck {
  name: string;
  foreground: string;
  background: string;
  ratio: number;
  passes: boolean;
}

export interface ContrastInput {
  name: string;
  foreground: string;
  background: string;
  minimumRatio?: number;
}

const defaultContrastInputs: readonly ContrastInput[] = [
  { name: 'text-on-surface', foreground: '#1f2024', background: '#fcfcfd' },
  { name: 'inverse-on-action', foreground: '#fcfcfd', background: '#0d74ce' },
  { name: 'danger-on-surface', foreground: '#ce2c31', background: '#fcfcfd' },
];

function luminance(hex: string): number {
  const value = hex.replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(value)) throw new Error(`Expected a six-digit hex color: ${hex}`);
  const channels = [0, 2, 4].map(
    (index) => Number.parseInt(value.slice(index, index + 2), 16) / 255,
  );
  const linear = channels.map((channel) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * linear[0]! + 0.7152 * linear[1]! + 0.0722 * linear[2]!;
}

export function contrastRatio(foreground: string, background: string): number {
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

export function validateSemanticContrast(
  checks: readonly ContrastInput[] = defaultContrastInputs,
): ContrastCheck[] {
  return checks.map(({ name, foreground, background, minimumRatio = 4.5 }) => ({
    name,
    foreground,
    background,
    ratio: contrastRatio(foreground, background),
    passes: contrastRatio(foreground, background) >= minimumRatio,
  }));
}
