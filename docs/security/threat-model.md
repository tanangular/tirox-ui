# Pre-v1 threat model

## Assets and boundaries

- User content, URLs, SVG/canvas assets, SSR payloads, focus state, and docs build output are in scope.
- Tirox owns rendering semantics; the application owns authorization, sanitization policy, secrets, identity, and trusted containers.

## Threats and controls

| Threat                       | Control                                                            | Verification                            |
| ---------------------------- | ------------------------------------------------------------------ | --------------------------------------- |
| DOM XSS / unsafe HTML        | Escaped content by default; branded consumer-sanitized HTML only   | security utility tests and review       |
| Unsafe URL or asset protocol | Context-aware allowlist validation                                 | `isSafeUrl`, sanitized SVG/canvas tests |
| Hydration data leakage       | `serializeHydrationState` allowlist; no tokens/cookies/PII         | SSR/security contract tests             |
| Portal/container trust abuse | Typed container override; application owns trusted DOM boundary    | component review                        |
| Vulnerable dependency        | Committed pnpm lockfile and high/critical audit blocking           | CI audit                                |
| Third-party docs origin      | CSP Report-Only rollout, then enforcement; no telemetry by default | headers and release review              |

Before v1, security review must sign off this model. Repeat review whenever a trust boundary, raw content API, renderer, third-party script, or release mechanism changes.
