# Explicit package exports

แต่ละ `@tirox-ui` package จะประกาศ public API ผ่าน explicit exports เท่านั้น โดยไม่รับประกัน deep imports จาก internal paths แม้ source recipes และ implementation จะเปิดให้อ่านหรือคัดลอกได้ การแยก source openness ออกจาก API contract ช่วยให้ refactor ภายในได้โดยไม่ทำลายผู้ใช้โดยไม่ตั้งใจ
