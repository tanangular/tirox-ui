# Tirox UI

Package-first, Solid-native UI components with a replaceable Panda CSS token
contract.

## Status

The project is currently an alpha prerelease. The v1 foundation targets
SolidJS 2.x and is delivered in this order:

`Button → Input → Checkbox → Select → Dialog → Tooltip`

The runtime currently uses Solid-native adapters while Ark UI compatibility
with SolidJS 2 is being evaluated. Do not treat the alpha release as a stable
v1 release.

## Packages

- `@tirox-ui/solid` — Solid components, native props/events, semantic states,
  SSR-safe IDs, portals, and security boundary helpers.
- `@tirox-ui/preset` — framework-neutral Panda tokens, themes, slot recipes,
  contrast validation, and preset conformance APIs.
- `apps/docs` — executable Astro documentation and theme playground.

Consumers own final Panda configuration and CSS generation. Custom presets must
conform to the shared token, recipe, theme, contrast, and conformance contracts.

## Development

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
pnpm test:e2e
```

Use `pnpm format` with Oxfmt and `pnpm lint` with Oxlint. The full release
validation is available through `pnpm release:check`; it requires a Git
repository with a `main` ref for Changesets status.

## Documentation and compatibility

- [Foundation component guidance](docs/components.md)
- [Compatibility matrix](docs/compatibility.md)
- [Release policy](docs/release.md)
- [Security policy](SECURITY.md)
- [Current terminology](CONTEXT.md)

Canonical documentation is English and versioned. Svelte and renderer-specific
packages remain outside the v1 stable scope until their defined parity and
conformance gates are complete.
