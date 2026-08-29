# Stable semantic data-state attributes

Tirox components จะเปิด state styling ผ่าน stable semantic `data-*` attributes เช่น `data-state`, `data-disabled`, `data-invalid` และ `data-orientation` โดย recipes ใช้ attributes เหล่านี้เป็นหลัก ส่วน generated class names และ internal DOM structure ไม่เป็น public contract เพื่อให้ implementation refactor ได้อย่างปลอดภัย
