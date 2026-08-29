# Migration policy for public breaking changes

การเปลี่ยน public component API, token contract, slot names หรือ semantic state attributes ที่เป็น breaking change ต้องมี migration guide และ semver release note ระบุผลกระทบ วิธีแก้ อัปเดต compatibility matrix และ examples อย่างชัดเจน การเปลี่ยน internal paths ที่ไม่กระทบ public API ไม่ต้องทำ migration guide
