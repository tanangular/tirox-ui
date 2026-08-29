# Layered performance budget gates

Tirox จะกำหนด performance budgets สำหรับ bundle/CSS size, documentation Core Web Vitals และ interactive-component latency โดยแสดงเป็น warning ระหว่าง development และ block release หรือ critical changes เมื่อเกิน threshold แนวทางนี้ให้ feedback เร็วโดยไม่ทำให้ exploratory development หยุดชะงัก แต่ป้องกัน regression ใน artifact สำคัญ
