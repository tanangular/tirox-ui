# Explicit framework and application security boundary

Tirox รับผิดชอบ safe rendering defaults, context-aware escaping/asset validation, dependency hygiene และ security tests ส่วน application รับผิดชอบ authentication, authorization, CSRF, server-side validation, secrets และ data access UI state เช่น hidden หรือ disabled ไม่ถือเป็น authorization และ docs ต้องสื่อข้อจำกัดนี้อย่างชัดเจน
