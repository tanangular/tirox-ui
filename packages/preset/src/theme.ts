export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';
export type ThemeVariables = Readonly<Record<string, string>>;

export const defaultThemeVariables: Readonly<Record<ResolvedTheme, ThemeVariables>> = {
  light: {
    '--tx-color-surface-default': '#fcfcfd',
    '--tx-color-text-default': '#1f2024',
  },
  dark: {
    '--tx-color-surface-default': '#1f2024',
    '--tx-color-text-default': '#fcfcfd',
  },
};

/** Resolves a persisted theme without reading browser globals, so it is SSR-safe. */
export function resolveTheme(mode: ThemeMode, systemTheme: ResolvedTheme = 'light'): ResolvedTheme {
  if (mode === 'light' || mode === 'dark') return mode;
  return systemTheme;
}

/** Reads system preference only when the caller provides a browser matchMedia implementation. */
export function resolveSystemTheme(
  matchMedia?: (query: string) => { matches: boolean },
): ResolvedTheme {
  return matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function createThemeCssVariables(
  variables: Readonly<Record<ResolvedTheme, ThemeVariables>> = defaultThemeVariables,
  options: { rootSelector?: string; darkSelector?: string } = {},
): string {
  const rootSelector = options.rootSelector ?? ':root';
  const darkSelector = options.darkSelector ?? '[data-theme="dark"]';
  const render = (theme: ThemeVariables) =>
    Object.entries(theme)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n');
  return `${rootSelector} {\n${render(variables.light)}\n}\n\n${darkSelector} {\n${render(variables.dark)}\n}`;
}
