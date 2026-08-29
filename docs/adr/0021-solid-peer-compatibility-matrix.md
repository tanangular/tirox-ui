# SolidJS peer dependency with a tested 2.x matrix

`@tirox-ui/solid` จะไม่ bundle SolidJS runtime แต่ประกาศ SolidJS เป็น peer dependency และระบุช่วง `2.x` ที่ทดสอบแล้วใน compatibility matrix ของแต่ละ release โดย prerelease versions ต้องมีสถานะ support แยกต่างหาก เพื่อให้ application ควบคุม runtime และลด duplicate runtime risk
