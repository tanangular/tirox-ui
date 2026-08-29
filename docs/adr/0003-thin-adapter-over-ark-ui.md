# Thin adapter over Ark UI

`@tirox-ui/solid` จะใช้ Ark UI เป็น behavioral foundation และสร้าง Tirox adapter บาง ๆ สำหรับ SolidJS 2.0, prop normalization, context และ public API ขณะที่ styling และ recipes อยู่ใน `@tirox-ui/preset` การแยก adapter ทำให้ Tirox ได้ประโยชน์จาก accessibility และ state behavior ของ Ark UI โดยไม่ผูก public API เข้ากับ implementation ภายในของ Ark UI มากเกินไป
