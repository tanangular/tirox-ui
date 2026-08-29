# Release provenance and rollback procedure

This procedure is a maintainer checklist, not a substitute for approval. It
applies to both `@tirox-ui/solid` and `@tirox-ui/preset`.

## Before publishing

1. Confirm the release is on the intended Git ref with a clean working tree.
2. Run `pnpm install --frozen-lockfile` and `pnpm release:check`.
3. Confirm the Changeset includes every public package change, migration guide,
   release note, and compatibility-matrix update.
4. Publish from a trusted CI environment with npm provenance enabled and the
   organisation's configured signing policy.
5. Record package versions, commit SHA, workflow run, provenance URL, and audit
   result in the release record.

## Rollback

Published packages are not deleted or overwritten. If a release is unsafe:

1. Stop further publishing and mark the affected version as unsafe.
2. Revoke or rotate compromised publishing credentials.
3. Publish a patched semver release after review; use npm deprecation messaging
   only with maintainer approval.
4. Restore the last verified docs deployment and record the incident, affected
   versions, provenance evidence, and follow-up review.

Maintainers must review this procedure before v1 and whenever publishing,
signing, provenance, or rollback infrastructure changes.
