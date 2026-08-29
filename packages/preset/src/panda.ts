import { defineConfig } from '@pandacss/dev';
import { primitiveTokens, semanticTokens } from './tokens.js';
import { slotRecipes } from './recipes.js';

export const tiroxPandaConfig = defineConfig({
  theme: {
    tokens: {
      colors: Object.fromEntries(
        Object.entries(primitiveTokens.colors).map(([scale, values]) => [
          scale,
          Object.fromEntries(Object.entries(values).map(([step, value]) => [step, { value }])),
        ]),
      ),
      spacing: Object.fromEntries(
        Object.entries(primitiveTokens.spacing).map(([key, value]) => [key, { value }]),
      ),
      radii: Object.fromEntries(
        Object.entries(primitiveTokens.radii).map(([key, value]) => [key, { value }]),
      ),
      shadows: Object.fromEntries(
        Object.entries(primitiveTokens.shadows).map(([key, value]) => [key, { value }]),
      ),
      durations: Object.fromEntries(
        Object.entries(primitiveTokens.motion).map(([key, value]) => [key, { value }]),
      ),
      zIndex: Object.fromEntries(
        Object.entries(primitiveTokens.layers).map(([key, value]) => [key, { value }]),
      ),
    },
    semanticTokens: {
      colors: Object.fromEntries(
        Object.entries(semanticTokens.colors).map(([group, values]) => [
          group,
          Object.fromEntries(Object.entries(values).map(([key, value]) => [key, { value }])),
        ]),
      ),
      shadows: Object.fromEntries(
        Object.entries(semanticTokens.shadows).map(([key, value]) => [key, { value }]),
      ),
    },
    slotRecipes: Object.fromEntries(
      Object.entries(slotRecipes).map(([name, recipe]) => [
        name,
        { className: `tx-${name}`, ...recipe },
      ]),
    ),
  },
  conditions: { reducedMotion: '@media (prefers-reduced-motion: reduce)' },
  globalCss: {
    ':root': { color: '{colors.text.default}', background: '{colors.surface.default}' },
    '[data-theme="dark"]': {
      color: '{colors.gray.1}',
      background: '{colors.gray.12}',
    },
    '.dark': {
      color: '{colors.gray.1}',
      background: '{colors.gray.12}',
    },
  },
});

export const defineTiroxPandaConfig = (config: Parameters<typeof defineConfig>[0] = {}) =>
  defineConfig({
    ...tiroxPandaConfig,
    ...config,
    theme: { ...tiroxPandaConfig.theme, ...config.theme },
  });
