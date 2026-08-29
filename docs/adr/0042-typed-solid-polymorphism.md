# Typed Solid-native polymorphism

Tirox components จะรองรับ polymorphism แบบ Solid-native เฉพาะจุดที่ปลอดภัยและมี type safety โดยต้องรักษา semantics, refs และ event behavior การเปลี่ยน element อย่างอิสระทุก component หรือการคัดลอก `asChild` โดยไม่ปรับให้เข้ากับ Solid ไม่ใช่ public contract ของ v1
