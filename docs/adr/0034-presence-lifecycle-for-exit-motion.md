# Presence lifecycle for exit motion

components ที่มี exit animation จะใช้ presence lifecycle: semantic state เปลี่ยนเป็นปิดทันที แต่ defer unmount จน visual exit จบ และต้อง unmount ทันทีเมื่อ reduced motion หรือไม่มี exit motion ระบบต้องจัดการ interruption และไม่ทำให้ focus หรือ screen-reader state ค้างผิด
