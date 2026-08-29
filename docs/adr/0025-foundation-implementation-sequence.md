# Foundation implementation sequence

ลำดับการพัฒนา v1 คือ `Button → Input → Checkbox → Select → Dialog → Tooltip` โดยเริ่มจาก primitive แล้วขยายไป form controls และ overlays เพื่อให้แต่ละขั้น reuse และพิสูจน์ contract จาก component ก่อนหน้า ลดความเสี่ยงของการทำ component ทั้งหมดแบบ big bang
