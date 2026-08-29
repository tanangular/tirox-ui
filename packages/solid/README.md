# @tirox-ui/solid

Solid-native foundation components for the Tirox UI system.

```tsx
import { Button, Dialog } from '@tirox-ui/solid';

<Button>Save</Button>;

<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Title>Preferences</Dialog.Title>
  </Dialog.Content>
</Dialog.Root>;
```

The v1 foundation is `Button`, `Input`, `Checkbox`, `Select`, `Dialog`, and
`Tooltip`. Components use Solid-native props, events, controlled/uncontrolled
state, deterministic SSR-safe IDs, stable semantic `data-*` attributes, and
explicit compound namespaces where composition is required.

Behavior currently uses the Solid 2-compatible native adapter. Ark, Zag, and
other adapters remain experimental until they pass the shared conformance and
compatibility gates.

Styling is consumer-owned. Generate CSS with your Panda configuration and use
`@tirox-ui/preset` for the shared token and recipe contract.
