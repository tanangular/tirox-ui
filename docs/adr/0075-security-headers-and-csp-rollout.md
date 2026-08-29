# Security headers baseline with staged CSP rollout

`apps/docs` และ starter examples จะกำหนด security headers baseline เช่น CSP, Referrer-Policy, Permissions-Policy และ HSTS เมื่อใช้ HTTPS โดยเริ่ม CSP ใน Report-Only mode เพื่อเก็บและแก้ violations ก่อนเปลี่ยนเป็น enforce mode การตั้งค่า frame-ancestors/X-Frame-Options ต้องสอดคล้องกับความต้องการ embedding ของ docs
