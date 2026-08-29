# Safe-by-default content boundary

Tirox components ต้อง escape text, children และ attributes ตาม context โดย default และไม่เปิด raw HTML เป็นเส้นทางหลัก หากจำเป็นต้อง render HTML ต้องใช้ explicit escape hatch กับ sanitized content ที่ consumer/application รับผิดชอบ พร้อม XSS และ DOM-XSS tests ใน conformance suite ไม่ส่ง untrusted input ไปยัง `innerHTML`, style, URL หรือ event handler โดยตรง
