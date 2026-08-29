# Solid behavior adapters

The public components depend on internal behavior adapters, never on an
adapter's internal path. Each adapter must satisfy the shared component
contract and pass the same behavior, accessibility, SSR, and hydration tests.

## Current status

- `native/` is the Solid 2-compatible implementation for the foundation slice.
- Ark UI is not a v1 runtime dependency; its adapter is enabled only after the
  compatibility matrix passes.
- `ark/` is intentionally not enabled yet. Ark UI's current Solid adapter is
  tracked in `docs/compatibility.md` and will only be enabled after the Solid 2
  compatibility matrix passes.
- Zag feasibility is tracked separately before adding a runtime dependency.
