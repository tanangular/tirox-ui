# Automated semantic contrast validation

CI ต้อง validate semantic color pairs ของ default และ custom themes ที่ประกาศใช้งาน เช่น text/background, interactive states, focus และ status colors ให้ผ่าน WCAG 2.2 AA โดย token ที่เป็น decorative-only ต้องระบุข้อยกเว้นอย่างชัดเจน การตรวจอัตโนมัติทำให้ theming ไม่ลด accessibility โดยไม่ตั้งใจ
