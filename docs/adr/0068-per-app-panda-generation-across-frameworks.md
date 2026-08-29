# Per-app Panda generation across frameworks

Solid และ Svelte applications จะใช้ token/recipe contract เดียวกันจาก `@tirox-ui/preset` แต่แต่ละ app เป็นผู้รัน Panda CSS generation, source extraction และ output pipeline ของตนเอง preset ไม่ bundle generated CSS แยกตาม framework และ visual regression ต้องตรวจว่า adapters ให้ผลลัพธ์สอดคล้องกัน
