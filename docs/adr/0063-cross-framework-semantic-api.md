# Cross-framework semantic API consistency

API ของ `@tirox-ui/solid` และ future framework adapters อนุญาตให้ต่างกันตาม syntax และ native conventions ของ framework แต่ component names, slots, states และ behavior semantics ต้องสอดคล้องกัน หากมีความต่างด้าน semantics ต้องมี design decision และ documentation รองรับ ไม่เพิ่ม framework-specific props โดยไม่มีเหตุผลด้าน platform
