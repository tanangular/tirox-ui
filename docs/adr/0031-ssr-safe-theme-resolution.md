# SSR-safe initial theme resolution

Tirox UI จะ resolve initial theme บน serverจาก user preference หรือ system preference fallback และส่งต่อ `data-theme`/class เดิมให้ client ก่อน hydration เพื่อป้องกัน theme flash และ mismatch การแก้ theme หลัง hydration โดยไม่จำเป็นไม่ถือเป็น baseline ที่ยอมรับได้
