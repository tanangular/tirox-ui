# Compatibility matrix

This matrix is part of the public documentation contract and must be updated with every dependency or public API change.

| Surface                     | Current target                               | Verification status                   |
| --------------------------- | -------------------------------------------- | ------------------------------------- |
| Package manager             | pnpm 11.24.0                                 | locked                                |
| Node.js                     | 22+                                          | configured                            |
| TypeScript                  | 7.0.2                                        | `pnpm check`                          |
| Solid runtime               | 2.0.0-rc.3                                   | package build                         |
| Solid web runtime           | 2.0.0-rc.3                                   | package build                         |
| Solid Vite plugin           | 3.0.0-next.34                                | package build                         |
| Foundation behavior adapter | native                                       | package and SSR tests                 |
| Ark UI Solid adapter        | not enabled; blocked pending Solid 2 support | `pnpm zag:spike`/compatibility review |
| Vitest                      | 4.1.11                                       | unit tests                            |
| Astro                       | 7.2.9                                        | docs typecheck                        |
| Chromium / Firefox / WebKit | latest + previous major                      | Playwright gate                       |

Astro's official Solid integration is not enabled in v1 yet: its current
release resolves the legacy `solid-js/web` subpath, which is unavailable in
the pinned Solid 2 RC. Docs therefore use the static executable contract
surface until the integration publishes a compatible release; enabling it
requires a fresh build and hydration review.

The public contract check also verifies all six explicit component exports and rejects internal source paths.

The v1 package does not install Ark UI as a runtime dependency. The Ark UI Solid adapter currently imports the legacy `solid-js/web` subpath, so it remains an experimental future adapter until a compatible release is available. The v1 native adapter keeps the package and docs compatible with `@solidjs/web` 2.0.0-rc.3.

## Test layers

- Preset tests validate token and recipe contracts.
- Solid tests validate security utilities and package-level behavior.
- Astro TypeScript check validates docs source under TypeScript 7.
- `check:astro` is retained as an opt-in diagnostic; Astro language server currently does not support TypeScript 7's compiler API.
- Playwright remains the browser, hydration, accessibility, and visual-regression gate once interactive Solid docs are enabled.
