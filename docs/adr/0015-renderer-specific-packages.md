# Renderer-specific extension packages

การรองรับ renderer เพิ่มเติมในอนาคตจะจัดเป็น packages แยกภายใต้ `@tirox-ui` เช่น motion, SVG และ canvas โดยไม่รวม renderer ที่ไม่ใช่ DOM เข้าไปใน `@tirox-ui/solid` ตั้งแต่ v1 แต่ละ extension ต้องกำหนด interaction และ accessibility contract ที่เหมาะกับ rendering target ของตนเอง
