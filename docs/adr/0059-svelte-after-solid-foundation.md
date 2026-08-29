# Svelte after the Solid foundation

Tirox จะเริ่มจาก `@tirox-ui/solid` และเลื่อน `@tirox-ui/svelte` ไปหลังจาก Button, Input, Checkbox, Select, Dialog และ Tooltip ผ่าน component acceptance contract ครบทั้งหมด การรองรับหลาย framework จะ share semantic contracts, tokens และ behavior test vectors แต่ใช้ framework-native adapters แยกกัน เพื่อไม่ให้ v1 มี multi-framework scope ก่อน foundation จะเสถียร
