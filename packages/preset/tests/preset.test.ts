import { describe, expect, it } from 'vitest';
import { primitiveTokens, semanticTokens, slotRecipes, tiroxPandaConfig } from '../src';
import {
  conformsToTiroxPreset,
  presetConformance,
  validatePresetConformance,
} from '../src/conformance';
import { contrastRatio, validateSemanticContrast } from '../src/contrast';
import { createThemeCssVariables, resolveSystemTheme, resolveTheme } from '../src/theme';

describe('preset conformance', () => {
  it('exposes required token categories and semantic mappings', () => {
    expect(primitiveTokens.colors.blue[9]).toBeDefined();
    expect(primitiveTokens.motion.normal).toBeDefined();
    expect(primitiveTokens.layers.dialog).toBeDefined();
    expect(semanticTokens.colors.text.default).toBeDefined();
    expect(semanticTokens.colors.action.primary).toBeDefined();
    expect(tiroxPandaConfig.globalCss?.['[data-theme="dark"]']).toEqual({
      color: '{colors.gray.1}',
      background: '{colors.gray.12}',
    });
    expect(tiroxPandaConfig.globalCss?.['.dark']).toEqual({
      color: '{colors.gray.1}',
      background: '{colors.gray.12}',
    });
  });

  it('exposes typed slot recipes with default variants', () => {
    expect(slotRecipes.button.slots).toEqual(['root', 'icon']);
    expect(slotRecipes.button.defaultVariants).toEqual({ variant: 'solid', size: 'md' });
    expect(slotRecipes.button.base.root._reducedMotion).toEqual({ transition: 'none' });
    expect(slotRecipes.input.base.root._reducedMotion).toEqual({ transition: 'none' });
    expect(slotRecipes.dialog.base.root._reducedMotion).toEqual({ transition: 'none' });
    expect(slotRecipes.tooltip.base.content._reducedMotion).toEqual({ transition: 'none' });
  });

  it('passes the shared six-component preset contract', () => {
    expect(conformsToTiroxPreset()).toBe(true);
    expect(presetConformance.requiredRecipes).toHaveLength(6);
  });

  it('validates custom presets without requiring the default token values', () => {
    const custom = {
      primitiveTokens: Object.fromEntries(
        presetConformance.requiredTokenGroups.map((key) => [key, {}]),
      ),
      semanticTokens: {
        colors: Object.fromEntries(
          presetConformance.requiredSemanticGroups.map((key) => [key, {}]),
        ),
      },
      slotRecipes: Object.fromEntries(presetConformance.requiredRecipes.map((key) => [key, {}])),
    };
    expect(validatePresetConformance(custom).passes).toBe(true);
    expect(
      validatePresetConformance({ ...custom, slotRecipes: { button: {} } }).missingRecipes,
    ).toContain('input');
  });

  it('passes the semantic contrast gate', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBe(21);
    expect(validateSemanticContrast().every((check) => check.passes)).toBe(true);
    expect(
      validateSemanticContrast([
        { name: 'custom', foreground: '#000000', background: '#ffffff' },
      ])[0]?.passes,
    ).toBe(true);
    expect(
      validateSemanticContrast([
        { name: 'custom-failure', foreground: '#777777', background: '#ffffff' },
      ])[0]?.passes,
    ).toBe(false);
  });

  it('resolves themes without browser globals and supports system fallback', () => {
    expect(resolveTheme('dark')).toBe('dark');
    expect(resolveTheme('system')).toBe('light');
    expect(resolveTheme('system', 'dark')).toBe('dark');
    expect(resolveSystemTheme(() => ({ matches: true }))).toBe('dark');
    expect(resolveSystemTheme(() => ({ matches: false }))).toBe('light');
    expect(resolveSystemTheme()).toBe('light');
  });

  it('generates root-scoped theme variables with a custom selector', () => {
    const css = createThemeCssVariables(undefined, { darkSelector: '.dark' });
    expect(css).toContain(':root {');
    expect(css).toContain('--tx-color-surface-default: #fcfcfd;');
    expect(css).toContain('.dark {');
    expect(css).toContain('--tx-color-surface-default: #1f2024;');
  });
});
