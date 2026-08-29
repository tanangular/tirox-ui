# Allowlisted hydration state without secrets

SSR ของ Tirox จะ serialize เฉพาะ allowlisted UI state ที่จำเป็นต่อ hydration ผ่าน safe serialization และห้ามส่ง access tokens, cookies, PII, server-only metadata หรือ authorization state ลง client พร้อม security tests ตรวจ hydration payload และ documentation caveat ว่า UI state ไม่ใช่ security boundary
