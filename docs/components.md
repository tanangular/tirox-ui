# Foundation component guidance

This is the canonical behavior guidance for the v1 Solid foundation. Examples
use the public `@tirox-ui/solid` exports; styling comes from the consumer's
Panda generation using `@tirox-ui/preset`.

## Shared rules

- Native props and events remain typed and pass through where applicable.
- Controlled props are the source of truth; `default*` props initialize local
  state for uncontrolled usage.
- Stable `data-scope`, `data-part`, and semantic state attributes are styling
  and test contracts, not authorization signals.
- IDs are deterministic during SSR and hydration. Supply an explicit ID when
  integrating with external labels or descriptions.
- Text and children are escaped by default. Do not use UI state as a security
  decision or authorization boundary.

## Button

Use `Button` for an actionable control. The default type is `button`, and
`loading` exposes `aria-busy` plus a stable loading state. Use a real link for
navigation rather than treating a button as a link.

## Input

Use `Input` with a native label or accessible name. `invalid` maps to
`aria-invalid` and `data-invalid`; validation messages must be associated with
`aria-describedby` by the application.

## Checkbox

Compose `Checkbox.Root`, `Checkbox.Control`, and `Checkbox.Indicator`. Use
`checked` with `onCheckedChange` for controlled state, or `defaultChecked` for
uncontrolled state. The hidden native input remains the form and accessibility
source of truth.

## Select

Compose `Select.Root` and `Select.Item` with native option semantics. Use
`value`/`onValueChange` for controlled state and `defaultValue` otherwise.
Native keyboard, form submission, and change events remain available.

## Dialog

Compose `Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`, `Dialog.Title`,
`Dialog.Description`, and `Dialog.Close`. Always provide a meaningful title.
Use controlled `open` when the application owns lifecycle; `defaultOpen` is
for local state. Wrap content in `Dialog.Portal` when it must render outside
the local stacking context; an explicit `container` must be a trusted DOM
element owned by the application. Dialog state is presentation state and must
not protect data.

## Tooltip

Compose `Tooltip.Root`, `Tooltip.Trigger`, and `Tooltip.Content`. Tooltip
content is supplementary and must not be the only way to expose essential
instructions. Keyboard focus opens the tooltip, and the trigger/content ID
relationship is represented through `aria-describedby`.

## Adapter boundary

The v1 implementation uses native behavior for Solid 2 compatibility. Ark,
Zag, Kobalte, and future adapter selection remain experimental until each
adapter passes the shared conformance, SSR/hydration, accessibility, visual,
performance, and security checks.
