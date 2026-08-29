# Separate framework and preset boundaries

`@tirox-ui/solid` จะรับผิดชอบ headless adapter, component API, composition และ accessibility ส่วน `@tirox-ui/preset` จะรับผิดชอบ tokens, theme contract, Panda configuration และ slot recipes ทั้งสอง package แยก release boundary กัน แต่มี default preset สำหรับการเริ่มต้น และรองรับ custom preset ที่ทำตาม contract เพื่อให้เปลี่ยน Design System ได้โดยไม่แก้ behavior layer
