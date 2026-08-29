# Supply-chain security baseline

Tirox จะ commit lockfile และใช้ reproducible installs ใน CI, audit dependencies/peer dependencies อัตโนมัติ, block known high/critical vulnerabilities ก่อน release และตรวจ license กับ package-name confusion การ release ควรใช้ signing หรือ provenance เมื่อ tooling พร้อม พร้อมมี security disclosure policy
