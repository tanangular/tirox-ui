# @tirox-ui/preset

Framework-neutral Panda CSS inputs for Tirox UI.

```ts
import { createThemeCssVariables, slotRecipes } from '@tirox-ui/preset';

const themeCss = createThemeCssVariables();
const buttonRecipe = slotRecipes.button;
```

The preset is the single source of truth for primitive and semantic tokens,
themes, slot recipes, contrast validation, and preset conformance. It uses
Radix-inspired 12-step scales by default but custom presets may use another
scale after mapping to the shared semantic contract.

Consumers own the final Panda configuration, static extraction, and CSS
generation. Solid and future framework adapters consume this package without
owning renderer-specific styling.
