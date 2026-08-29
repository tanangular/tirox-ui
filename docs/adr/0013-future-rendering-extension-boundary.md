# Future rendering extension boundary

v1 ของ Tirox UI รับประกัน DOM/SolidJS 2.0 เป็น rendering target หลัก แต่ core architecture ต้องไม่ปิดทางต่อยอดไปยัง animation, SVG, canvas และ HTML-in-canvas ในอนาคต การรองรับเหล่านี้จะพัฒนาเป็น renderer-specific extensions เมื่อมี use case และ accessibility model ที่ชัดเจน โดยยังไม่ประกาศ cross-renderer public API เป็น contract ของ v1 เพราะ canvas และ HTML-in-canvas มี semantics กับ focus model ต่างจาก DOM
