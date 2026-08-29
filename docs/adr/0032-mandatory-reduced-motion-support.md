# Mandatory reduced-motion support

animated component ทุกตัวของ Tirox UI ต้องเคารพ `prefers-reduced-motion` เป็น contract ไม่ใช่คำแนะนำ โดยต้องลดหรือปิด non-essential motion, คง essential feedback ในรูปแบบที่ไม่พึ่ง animation และมี reduced-motion cases ใน tests กับ visual regression matrix
