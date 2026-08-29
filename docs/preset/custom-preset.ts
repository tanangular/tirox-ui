import {
  createThemeCssVariables,
  defineTiroxPandaConfig,
  primitiveTokens,
  semanticTokens,
  slotRecipes,
  validatePresetConformance,
  validateSemanticContrast,
} from '@tirox-ui/preset';

/** Consumer-owned config: replace semantic values while retaining the shared recipe contract. */
export const customPreset = defineTiroxPandaConfig({
  theme: {
    semanticTokens: {
      colors: {
        action: {
          primary: { value: '{colors.blue.11}' },
          primaryHover: { value: '{colors.blue.12}' },
        },
      },
    },
  },
});

export const customPresetContract = validatePresetConformance({
  primitiveTokens,
  semanticTokens,
  slotRecipes,
});

export const customContrast = validateSemanticContrast([
  { name: 'custom-primary', foreground: '#ffffff', background: '#1d4ed8' },
]);

export const customThemeCss = createThemeCssVariables({
  light: {
    '--tx-color-surface-default': '#ffffff',
    '--tx-color-text-default': '#111827',
  },
  dark: {
    '--tx-color-surface-default': '#111827',
    '--tx-color-text-default': '#f9fafb',
  },
});
