# Shared tokens with renderer-specific mapping

SVG และ canvas extensions จะใช้ shared token contract เดียวกับ DOM แต่ให้ renderer map semantic values ไปยัง output ของตนเอง เช่น SVG attributes หรือ canvas fill/stroke/typography/motion values custom preset ต้องสามารถเปลี่ยน mapping เหล่านี้ได้ โดยไม่สร้าง token system แยกที่ทำให้ Design System drift
