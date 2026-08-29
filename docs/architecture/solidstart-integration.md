# SolidStart integration boundary

`@tirox-ui/solid` is a universal component package. Its render-time core is
usable from Solid SSR and hydration, but it does not import SolidStart modules
or implement application server boundaries.

## Application-owned flow

SolidStart server functions, queries, actions, and routes may load data and
pass an allowlisted view model to Tirox components. The application owns
authorization, cookies, secrets, mutations, cache policy, and serialization
boundaries. A visible, hidden, or disabled component must never be treated as
an authorization decision.

```ts
const viewModel = serializeHydrationState({ theme: 'dark', selectedId: 'account-1' }, [
  'theme',
  'selectedId',
]);
```

Use `serializeHydrationState` for values that must be embedded in a hydration
payload. Do not serialize credentials, tokens, cookies, PII, authorization
state, or server-only objects. Keep server-specific helpers in the application
or a separately reviewed server package.

## Verification boundary

Package SSR tests verify deterministic markup, IDs, portals, and hydration-safe
component output. SolidStart application tests are a separate consumer concern
and should additionally cover the server function/query/action flow, the
allowlisted payload, and client hydration in the target SolidStart version.
The static Astro docs build is not evidence of SolidStart compatibility.
