# Internal shared contracts before a public core package

contracts ที่ renderer extensions ต้องแชร์จะเริ่มเป็น internal contracts ภายใน monorepo ก่อน และจะแยกเป็น public package ก็ต่อเมื่อมี use case จริงและ public boundary ที่ชัดเจน การตัดสินใจนี้ลด public surface ของ v1 และหลีกเลี่ยงการสร้าง abstraction เช่น `@tirox-ui/core` ก่อนความต้องการจะพิสูจน์แล้ว
