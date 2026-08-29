# Security policy

Report vulnerabilities privately to the repository maintainers; do not open a public issue with exploit details.

Tirox is a UI layer, not an authorization boundary. Components render text and attributes safely by default. Raw HTML requires consumer sanitization through the branded API, URLs are protocol-validated, and hydration data must be an allowlisted non-secret projection.

Before v1, maintainers review the threat model for DOM XSS, unsafe URLs/assets, portals, SSR payloads, third-party docs scripts, dependencies, and release provenance. Re-review is required when a trust boundary changes.
