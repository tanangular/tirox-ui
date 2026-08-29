# Single source of truth for recipes

`packages/preset` เป็น source of truth เดียวของ slot recipes; documentation ต้อง consume source เดียวกันเพื่อแสดง copy-ready source และ examples การแยก source ระหว่าง package กับ docs ห้ามเกิดขึ้น เพราะจะทำให้ styling contract drift และลดความน่าเชื่อถือของ executable documentation
