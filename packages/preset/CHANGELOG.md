# @tirox-ui/preset

## 0.1.1

### Patch Changes

- Fix Node ESM imports in the published preset build and generate complete declarations from the TypeScript sources.

## 0.1.0

### Patch Changes

- 9a0ebee: Clean preset build output before compilation so published artifacts cannot retain stale internal files.
- 9a0ebee: Declare scoped packages as public for package-first publishing.
- 9a0ebee: Rebuild package artifacts automatically before publishing.
- 9a0ebee: Add custom preset conformance and contrast validation APIs, SSR-safe theme variable helpers, and explicit sanitized SVG, canvas asset, and hydration-state utilities. Normalize all Solid foundation components behind shared contracts and native adapters.
- 9a0ebee: Declare the public packages side-effect free and enforce explicit export metadata for tree-shaking.
