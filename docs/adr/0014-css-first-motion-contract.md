# CSS-first motion contract

Tirox UI จะใช้ CSS transitions/keyframes และ motion tokens เป็นพื้นฐานของ animation โดยต้องรองรับ `prefers-reduced-motion` และใช้ JS orchestration เฉพาะ animation ที่ต้องประสาน lifecycle, measurement หรือ state machine การออกแบบนี้ลด library lock-in และยังเปิดทางให้พัฒนา motion extension ในอนาคต
