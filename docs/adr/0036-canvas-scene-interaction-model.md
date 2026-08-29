# Shared canvas scene interaction model

canvas extensions จะใช้ shared scene interaction model ที่ map pointer/touch coordinates ผ่าน hit testing ไปยัง scene object identity เดียวกับ DOM accessibility overlay โดย keyboard และ focus state มาจาก overlay เป็นหลัก และ raw canvas events ไม่ใช่ public API หลักของ extension
