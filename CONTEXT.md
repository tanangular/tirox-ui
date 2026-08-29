# Tirox UI context glossary

This is the compact current glossary. ADRs under `docs/adr` are historical records and are not rewritten.

- **Tirox UI** — the framework-neutral design-system project with Solid foundation components and future renderer adapters.
- **Package-first** — publish independently consumable packages with explicit exports and open-source recipes.
- **Semantic compatibility** — preserve component concepts, props, states, anatomy, and composition patterns without promising React/runtime identity.
- **Design foundations** — Radix UI guides semantic API and composition; Ark UI is the intended behavior foundation; Park UI and Panda CSS guide recipes, tokens, slots, and theming. These are layered references, not a promise of Radix React runtime compatibility or direct Park UI implementation reuse.
- **Behavior adapter** — thin framework adapter over Ark UI; owns interaction semantics, ARIA, keyboard, and state transitions.
- **Adapter selection** — future config-level choice of a validated behavior implementation, initially advanced/experimental and not a v1 public API.
- **Adapter boundary** — internal seam between the stable Tirox contract and native, Zag, Ark, or other behavior implementations; internal paths are not public.
- **Preset** — `@tirox-ui/preset`, the shared Panda input contract for tokens, recipes, themes, and conformance vectors.
- **Token contract** — primitive and semantic values for color, typography, spacing/sizing, radius, shadows, motion, and layers.
- **Recipe** — statically extractable Panda style definition, normally semantic-token based, with typed variants and slots.
- **Theme** — root-scoped token values selected through `data-theme` or class; supports default light/dark and custom presets.
- **Foundation components** — `Button`, `Input`, `Checkbox`, `Select`, `Dialog`, and `Tooltip`, delivered in that order.
- **Acceptance contract** — the required per-component slice: API, behavior, styling, a11y, SSR/hydration, visual checks, docs, and exports.
- **Semantic state** — stable `data-*` attributes derived from behavior, suitable for styling and tests.
- **Renderer extension** — a separate package for motion, native SVG, or canvas; it shares contracts but not renderer-specific implementation.
- **Canvas overlay** — synchronized DOM accessibility/focus layer for canvas-rendered interaction.
- **SSR/hydration** — server output and client attachment must be deterministic, including IDs and portals.
- **Solid SSR boundary** — v1 supports Solid server rendering and deterministic hydration; render-time core paths must not depend on browser globals or server-framework internals.
- **SolidStart integration** — application-owned server functions, queries, actions, and routes may provide data to Tirox components, while Tirox remains framework/runtime-neutral within its Solid package.
- **RSC boundary** — Tirox does not implement React Server Components, React Flight, or React server/client component interoperability; Solid SSR is a different contract.
- **Safe content boundary** — default escaped content plus an explicit consumer-sanitized branded HTML/asset escape hatch.
- **Compatibility matrix** — tested package/framework/browser versions; required in versioned docs and releases.
- **Performance budget** — measured absolute and regression limits for bundle/CSS, SSR/hydration, interaction, and docs Web Vitals.
- **Security boundary** — UI state is presentation only; authorization, secrets, sanitization ownership, and trust decisions remain with the application.
- **Component/docs slice** — behavior and executable documentation change together and consume real workspace packages.
- **Adapter conformance** — the requirement that every selectable adapter passes the same API, behavior, accessibility, SSR/hydration, visual, and cleanup vectors.
- **Formatting contract** — every edited `*.mjs`, `*.js`, `*.ts`, `*.tsx`, or `*.jsx` file must pass `oxfmt`; `oxfmt --check .` is a completion and CI gate.
