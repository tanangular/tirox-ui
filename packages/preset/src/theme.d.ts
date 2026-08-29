export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';
export type ThemeVariables = Readonly<Record<string, string>>;
export declare const defaultThemeVariables: Readonly<Record<ResolvedTheme, ThemeVariables>>;
export declare function resolveTheme(mode: ThemeMode, systemTheme?: ResolvedTheme): ResolvedTheme;
export declare function resolveSystemTheme(
  matchMedia?: (query: string) => { matches: boolean },
): ResolvedTheme;
export declare function createThemeCssVariables(
  variables?: Readonly<Record<ResolvedTheme, ThemeVariables>>,
  options?: { rootSelector?: string; darkSelector?: string },
): string;
