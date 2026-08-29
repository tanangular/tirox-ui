# Motion does not own semantic state

ใน animated components behavior layer เป็นเจ้าของ semantic state เช่น open/closed และ selected/unselected ส่วน motion layer รับผิดชอบเฉพาะ visual lifecycle เช่น enter/exit การแยกนี้ป้องกันไม่ให้ animation เปลี่ยน accessible state เอง และทำให้ focus กับ screen reader behavior ตรวจสอบได้
