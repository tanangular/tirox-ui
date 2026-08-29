# Solid behavior adapter spike

Status: exploratory; no public API decision has been made.

## Decision boundary

Tirox public components depend on shared behavior contracts. A behavior
implementation is eligible only when it passes the same contract vectors for
keyboard interaction, focus management, ARIA semantics, controlled and
uncontrolled state, deterministic IDs, SSR/hydration, and cleanup.

## Candidates

| Candidate    | Role                                         | Current decision                                |
| ------------ | -------------------------------------------- | ----------------------------------------------- |
| Native DOM   | Simple primitives and compatibility fallback | Enabled for Checkbox                            |
| Zag machines | Framework-neutral behavior candidate         | Spike next; do not expose directly              |
| Ark UI Solid | Thin adapter target                          | Blocked until Solid 2 matrix passes             |
| Kobalte      | Solid-specific fallback candidate            | Blocked until Solid 2 peer support is validated |

## Zag spike scope

Start with Checkbox and Dialog. The initial probe is available as
`pnpm zag:spike`; it measures whether the machine and Solid adapter can load
under the pinned Solid 2 RC before testing DOM behavior. The spike must not
change the public `@tirox-ui/solid` exports or enable an adapter until API
mapping, SSR/hydration output, keyboard/focus behavior, bundle impact, and
listener/observer cleanup pass review.

### Current probe result

`@zag-js/solid@1.43.3` is blocked under `solid-js@2.0.0-rc.3`: its
`@solid-primitives/keyed` dependency imports the legacy `solid-js/web`
subpath, which is not exported by the Solid 2 RC package. This is a real
compatibility failure, not a reason to add a Vite alias. Keep the native
adapter active and re-run the probe when Zag publishes a Solid 2-compatible
adapter or when a reviewed patch is available.

Kobalte `0.13.13` is also not an immediate replacement: its declared peer
dependency is `solid-js@^1.9.8`. It remains a candidate for a separately
validated adapter, but it must not be treated as Solid 2-compatible solely
because its package can be installed with a peer warning.
