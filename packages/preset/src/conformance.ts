import { primitiveTokens, semanticTokens } from './tokens.js';
import { slotRecipes } from './recipes.js';

export const presetConformance = {
  requiredTokenGroups: ['colors', 'spacing', 'radii', 'shadows', 'motion', 'layers'],
  requiredSemanticGroups: ['text', 'surface', 'border', 'action', 'focus'],
  requiredRecipes: ['button', 'input', 'checkbox', 'select', 'dialog', 'tooltip'],
} as const;

export interface TiroxPresetShape {
  primitiveTokens: { [key: string]: unknown };
  semanticTokens: { colors: { [key: string]: unknown } };
  slotRecipes: { [key: string]: unknown };
}

export interface PresetConformanceResult {
  passes: boolean;
  missingTokenGroups: string[];
  missingSemanticGroups: string[];
  missingRecipes: string[];
}

export function validatePresetConformance(
  preset: TiroxPresetShape = { primitiveTokens, semanticTokens, slotRecipes },
): PresetConformanceResult {
  const missingTokenGroups = presetConformance.requiredTokenGroups.filter(
    (key) => !(key in preset.primitiveTokens),
  );
  const missingSemanticGroups = presetConformance.requiredSemanticGroups.filter(
    (key) => !(key in preset.semanticTokens.colors),
  );
  const missingRecipes = presetConformance.requiredRecipes.filter(
    (key) => !(key in preset.slotRecipes),
  );
  return {
    passes: !missingTokenGroups.length && !missingSemanticGroups.length && !missingRecipes.length,
    missingTokenGroups,
    missingSemanticGroups,
    missingRecipes,
  };
}

export function conformsToTiroxPreset(
  preset: TiroxPresetShape = { primitiveTokens, semanticTokens, slotRecipes },
): boolean {
  return validatePresetConformance(preset).passes;
}
