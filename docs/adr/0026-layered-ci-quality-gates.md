# Layered CI quality gates

CI จะบังคับ quality gates ตามประเภทการเปลี่ยนแปลง: ทุก PR ต้องผ่าน typecheck, lint, unit/behavior และ SSR/hydration tests; component changes ต้องเพิ่ม accessibility, docs/example และ representative visual checks; release changes ต้องตรวจ compatibility matrix และ explicit package exports การแบ่งชั้นลดเวลาตรวจของงานเล็กโดยยังรักษา component acceptance contract
