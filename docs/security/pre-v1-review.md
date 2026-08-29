# Pre-v1 security review

Status: `pending-maintainer-signoff`

This review is required before the first stable release. It must be re-opened when a renderer, raw-content API, portal/container boundary, third-party script, hydration payload, or release workflow changes.

## Checklist

- [x] Safe text/children/attribute defaults are tested.
- [x] Explicit sanitized HTML escape hatch is branded and documented.
- [x] URL protocol validation rejects executable/data HTML protocols.
- [x] Hydration/SSR output contains no secret-shaped runtime data (`serializeHydrationState`).
- [x] Docs security headers and CSP Report-Only baseline exist.
- [x] Docs server supports CSP enforcement with `CSP_ENFORCE=true` after Report-Only review.
- [x] Lockfile, audit, and patched transitive dependency policy exist.
- [x] UI state is documented as non-authorization state.
- [ ] Maintainer reviews DOM XSS and sanitized SVG/canvas asset boundaries (`createSanitizedSvg`, `createSanitizedCanvasAsset`).
- [ ] Maintainer reviews portal/container and third-party origin boundaries.
- [ ] Maintainer signs release provenance and rollback procedure.

Stable release is blocked until the remaining unchecked items are signed off and the status changes to `approved`.
