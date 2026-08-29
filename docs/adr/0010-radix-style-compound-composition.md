# Radix-style compound component composition

Tirox UI จะใช้ compound components แบบ namespace API เป็น public composition contract เช่น `Dialog.Root`, `Dialog.Trigger` และ `Dialog.Content` โดยใช้ shared context ภายในเพื่อเชื่อม behavior และคง anatomy ที่ชัดเจนสำหรับ slot recipes แนวทางนี้สอดคล้องกับ semantic compatibility ของ Radix และเหมาะกับความยืดหยุ่นของ SolidJS composition
