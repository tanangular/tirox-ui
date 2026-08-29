# Root-scoped CSS variable themes

runtime theme switching ของ Tirox จะใช้ CSS variables ที่ scope ด้วย `data-theme` หรือ class บน root element โดยให้ Solid state ควบคุมเฉพาะ attribute/class และไม่ rerender component tree หรือสร้าง stylesheet ใหม่ระหว่าง runtime วิธีนี้คง recipe contract เดิมและรองรับ light/dark กับ custom themes
