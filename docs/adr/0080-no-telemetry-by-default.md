# No telemetry by default

`@tirox-ui/solid`, `@tirox-ui/preset` และ future adapters จะไม่ส่ง telemetry หรือข้อมูลผู้ใช้โดย default Analytics ใน `apps/docs` อนุญาตเฉพาะเมื่อ opt-in และมี privacy notice ชัดเจน ต้องไม่เก็บ component values, form data, URLs หรือ identifiers โดยไม่จำเป็น และ third-party scripts ต้องอยู่ใน CSP allowlist หากเพิ่ม telemetry ต้องมี ADR และ opt-out mechanism
