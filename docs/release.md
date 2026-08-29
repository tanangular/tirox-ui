# Release policy

Packages use independent semver and the `next` prerelease channel until the Solid foundation acceptance contract is complete. A public breaking change requires:

1. a Changeset with the affected package(s);
2. a migration guide and semver release note;
3. updated API metadata and compatibility matrix;
4. passing check, unit/SSR, accessibility, visual, contrast, performance, runtime-boundary,
   license, and security gates.

Release automation must use the committed pnpm lockfile, npm provenance/signing when supported by the publishing environment, and high/critical audit blocking. Follow the [provenance and rollback procedure](security/release-provenance.md). Docs and assets may use separate licensing from MIT code and recipes.

The release checklist includes `pnpm licenses:check`, `pnpm runtime:boundary:check`,
and `pnpm security:headers:check`. CSP starts in Report-Only mode for observation
and must pass the enforced runtime E2E gate before production enforcement.

Before a release candidate, `pnpm contract:check` verifies that every foundation component has an explicit public export, no internal path is exported, and the compatibility matrix names the tested runtime/tool/browser surfaces.

`docs/security/pre-v1-review.md` must be approved by maintainers before v1. `RELEASE_CRITICAL=true pnpm security:review` intentionally blocks while sign-off is pending.
