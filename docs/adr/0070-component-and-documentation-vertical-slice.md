# Component and documentation as one vertical slice

การพัฒนา component และ documentation ต้องส่งมอบเป็น vertical slice เดียวใน PR: เริ่มจาก public contract และ failing tests ต่อด้วย behavior, slot recipe, accessibility, SSR/hydration, executable Astro example, generated API metadata และ visual verification ก่อนผ่าน layered CI gates การกำหนดให้ docs เป็นส่วนหนึ่งของงานเดียวกันป้องกัน API/recipe drift และทำให้ documentation เป็น verification surface จริง
