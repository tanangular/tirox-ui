# Consumer-owned Panda CSS generation

`@tirox-ui/preset` จะ export tokens, recipes และ Panda inputs โดยไม่ bundle generated global CSS; application หรือ docs เป็นผู้ควบคุม Panda config, build pipeline และ CSS output ของตนเอง การแยกนี้ลด CSS duplication และทำให้ custom preset ใช้ pipeline ของ consumer ได้จริง
