# Canvas with a synchronized DOM accessibility overlay

canvas extensions ของ Tirox UI จะใช้ canvas สำหรับ visual rendering และใช้ synchronized DOM accessibility overlay สำหรับ focus, keyboard, screen reader และ semantic states โดยทั้งสองชั้นต้องใช้ state model เดียวกัน การวาง ARIA บน `<canvas>` เพียงอย่างเดียวไม่ถือว่าเพียงพอสำหรับ interactive UI ตาม accessibility contract ของโครงการ
