# Typed ref forwarding with minimal imperative handles

Tirox components จะรองรับ typed ref forwarding แบบ Solid-native ตาม public slots ที่ประกาศ และเปิด imperative handles เฉพาะ behavior ที่จำเป็น เช่น focus หรือ reposition โดยไม่เปิด ref ของ internal nodes ทั้งหมดเป็น public contract และต้องรักษา polymorphism กับ SSR/hydration
