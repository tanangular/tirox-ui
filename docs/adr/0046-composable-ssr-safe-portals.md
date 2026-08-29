# Composable SSR-safe portals

overlay components เช่น Dialog และ Tooltip จะใช้ portal แบบ composable พร้อม typed container override เมื่อจำเป็น โดย portal ต้องไม่ทำลาย SSR/hydration, focus management, dismiss behavior หรือ ARIA relationships และไม่บังคับให้ทุก component ใช้ global portal
