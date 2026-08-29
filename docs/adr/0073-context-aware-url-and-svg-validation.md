# Context-aware URL and SVG validation

Tirox ต้อง validate URL, SVG markup และ canvas assets ตาม rendering context และเปิด sanitized asset API แบบ explicit โดยไม่ trust props อัตโนมัติ ต้องป้องกัน unsafe protocols, SVG scripts/event attributes, external references และ embedded URLs พร้อม security tests สำหรับ payloads ที่เกี่ยวข้อง
