# Deterministic component IDs with user override

components ที่ต้องเชื่อม labels, descriptions, errors, triggers และ contents จะสร้าง deterministic IDs ที่ตรงกันระหว่าง SSR และ hydration และเปิดให้ consumer override ผ่าน explicit props ห้ามใช้ random หรือ time-based IDs ระหว่าง render เพราะจะทำให้ `aria-*` relationships และ hydration ไม่เสถียร
