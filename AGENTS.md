# Tirox UI — repository rules

## Goal and package map

Tirox UI is a package-first, open-source UI system. The v1 foundation targets SolidJS 2.x and provides semantic compatibility with Radix-inspired APIs, Ark UI behavior, Park UI/Panda CSS styling, and replaceable design tokens.

- `packages/solid` → `@tirox-ui/solid`, Solid components.
- `packages/preset` → `@tirox-ui/preset`, framework-neutral Panda inputs, tokens, recipes, and conformance vectors.
- `apps/docs` → Astro executable documentation and theming playground. Interactive Solid examples stay behind the tested runtime compatibility matrix.
- `@tirox-ui/svelte` is experimental only after Solid foundation acceptance; it uses an Ark UI Svelte adapter and the same preset contract.
- Renderer extensions (`motion`, `svg`, `canvas`) remain separate packages and must not leak renderer assumptions into core.

Use pnpm workspaces and the committed lockfile. Package versions are independent; compatibility policy and release notes are shared.

## Architecture and API

- Design foundations are layered: Radix UI informs semantic API, compound composition,
  props, slots, and anatomy; Ark UI is the intended behavior foundation behind Tirox
  adapters; Park UI and Panda CSS inform recipes, slots, tokens, and theming. Tirox
  preserves these concepts without promising Radix React runtime compatibility or
  depending directly on Park UI component implementations.
- Behavior is a thin Ark UI adapter; semantic state, ARIA, keyboard behavior, and controlled/uncontrolled state belong to behavior.
- Styling is consumer-owned Panda generation from `@tirox-ui/preset`; consumers own final Panda configuration and CSS generation.
- Expose explicit package exports only. Internal paths are not public contracts.
- Use Solid-native reactive APIs, typed native props/events, typed refs, minimal imperative handles, and limited typed polymorphism.
- Components use Radix-like compound namespaces (`Dialog.Root`, `Dialog.Content`) and stable public slots only for necessary anatomy.
- IDs are deterministic and SSR-safe, with explicit user overrides. Portals are SSR-safe and accept typed container overrides.
- Stable semantic `data-*` state attributes are part of the styling/test contract.
- Adapter selection is a future config-level extension, not a current public API. Until all six v1 foundation components pass their acceptance contract, use the native adapter internally and keep Ark/Zag/Kobalte adapters experimental.
- A future adapter config may select a default or per-component adapter, but only from adapters that pass the shared conformance suite and compatibility matrix. It must be build-time/config-time validated, deterministic across SSR and hydration, and must not expose internal adapter paths.

## Styling and theme contract

`@tirox-ui/preset` is the single source of recipe truth. It contains primitive and semantic tokens for color, typography, spacing/sizing, radius, shadows, motion, and z-index/layers; recipes primarily consume semantic tokens. The default uses Radix-inspired 12-step scales, light/dark themes, root-scoped variables via `data-theme`/class, and replace/extend support for custom presets.

Recipes must be statically extractable or explicitly generated for dynamic variants. Animated components are mandatory: CSS-first motion, optional JS orchestration, reduced-motion support, behavior-owned semantic state, motion-owned visual lifecycle, presence lifecycle, and deferred unmount for exit.

## Accessibility, SSR, and security

Implement against WAI-ARIA APG and WCAG 2.2 AA. Test keyboard, focus, names/roles/states, reduced motion, SSR, hydration, and portal behavior. UI visibility/disabled state is never authorization.

The v1 runtime contract is Solid SSR plus deterministic hydration. Components must render without browser globals during server render; IDs, portals, initial UI state, and serialized hydration data must remain stable across server and client. Tirox may be used inside SolidStart server functions, queries, actions, and routes, but those server boundaries belong to the application/framework. Tirox does not implement or promise React Server Components (RSC), React Flight, or React server/client component interoperability.

Safe-by-default text, children, attributes, and URLs are required. Raw HTML is an explicit consumer-sanitized branded escape hatch; SVG/canvas assets use context-aware validation. Hydration state is allowlisted, safely serialized, and contains no secrets, tokens, cookies, PII, or authorization state. No package telemetry; docs analytics are opt-in and disclosed. Maintain a threat model and review it before v1 and whenever a trust boundary changes.

Do not import server-only modules, SolidStart internals, `window`, or `document` from render-time core paths. Browser-only behavior must be deferred to the appropriate client lifecycle. If a server-specific helper becomes necessary, add a separately reviewed server subpath/package rather than weakening the universal component contract.

## Foundation acceptance contract

Deliver and release-gate this order: `Button → Input → Checkbox → Select → Dialog → Tooltip`. Every slice includes contract/types, Ark adapter or native behavior, recipe, semantic states, accessibility, controlled/uncontrolled behavior, SSR/hydration tests, representative visual regression, docs/API metadata, and explicit exports. Svelte requires parity across all six before stable release.

## Workflow and CI

Develop component and docs as one vertical slice: write contract tests first, implement behavior and recipe, add executable docs, then run conformance, accessibility, SSR/hydration, visual, and type/API metadata checks. Examples consume workspace packages, never mocks.

SolidStart integration tests are separate from package SSR tests and must cover server functions, queries/actions, serialization, and hydration without treating server data as authorization. Astro documentation may consume SSR-safe components, but its static build is not evidence of SolidStart server-function compatibility.

CI gates are layered: every PR runs typecheck/lint/unit/SSR; component changes add accessibility/docs/contrast/visual checks; release or critical changes add exports, compatibility matrix, audit, provenance, and performance budgets. Benchmark before setting absolute and regression budgets; warn in development and block release/critical changes. Test latest and previous major Chromium, Firefox, and WebKit.

Do not implement or document a public adapter-switch config before v1 completion. After v1, introduce it as an advanced/experimental configuration with explicit fallback rules, per-component capability validation, no runtime adapter switching, and identical public contracts across adapters.

## Release and docs

Canonical docs are English and versioned. Every public breaking change requires a migration guide, semver release note, and compatibility-matrix update. Use prerelease channels (for example `next`) until acceptance is complete. Code and recipes are MIT; docs/assets may have separate licensing where necessary.

When the complete v1 plan and acceptance contract pass all required gates, create a Git commit containing the finished v1 implementation. Do not create that commit for intermediate slices or while any required gate is blocked.

## Source of truth

Historical decisions remain in [`docs/adr`](docs/adr). Current terminology is in [`CONTEXT.md`](CONTEXT.md), and tested versions are in [`docs/compatibility.md`](docs/compatibility.md). Solid 2, Panda, and Park UI references are linked from the project documentation; implementation must preserve their relevant upstream compatibility constraints.
