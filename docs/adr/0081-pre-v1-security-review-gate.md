# Pre-v1 threat model and security review gate

Tirox ต้องมี threat model และ security review ก่อน v1 และ review ซ้ำเมื่อมีการเปลี่ยน trust boundary เช่น raw HTML/SVG/canvas, portal, SSR serialization หรือ third-party integration automated dependency audit เป็นเพียงส่วนหนึ่งของ security process และไม่แทนการ review design-level risks
