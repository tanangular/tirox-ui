# Pre-v1 security review

Status: `approved`

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
- [x] Maintainer reviews DOM XSS and sanitized SVG/canvas asset boundaries (`createSanitizedSvg`, `createSanitizedCanvasAsset`).
- [x] Maintainer reviews portal/container and third-party origin boundaries.
- [x] Maintainer signs release provenance and rollback procedure.

Reviewer: tanangular
Reviewed on: 2026-08-29
Reviewed commit: 6c38b105a56121ac38eb90399c0cf65b87810352
