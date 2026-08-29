# Core acceptance contract with renderer-specific extensions

renderer-specific components ในอนาคตต้องสืบทอด core acceptance contract ของ Tirox UI และเพิ่ม checks ตาม target เช่น native SVG semantics หรือ canvas hit testing และ overlay synchronization หาก renderer มีข้อจำกัดต้องประกาศอย่างชัดเจน ไม่ลด accessibility หรือ quality baseline โดยเงียบ
