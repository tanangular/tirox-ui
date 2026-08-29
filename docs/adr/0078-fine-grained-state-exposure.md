# Fine-grained state exposure with minimal context

Tirox components จะ expose reactive values และ actions เท่าที่จำเป็น แยก state subscriptions ตาม field/slot และใช้ minimal context surface เพื่อจำกัด unnecessary updates โดยเฉพาะ list-heavy components เช่น Select derived state ควรคำนวณเมื่อถูกใช้งานและต้องมี interaction benchmarks รองรับ
