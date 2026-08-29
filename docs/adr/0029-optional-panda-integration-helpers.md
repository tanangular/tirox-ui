# Optional Panda integration helpers

`@tirox-ui/preset` จะมี optional helpers และ config fragments สำหรับเชื่อมต่อกับ Panda CSS แต่ consumer ยังคงควบคุม final config, merge strategy และ CSS generation เอง helpers ต้องไม่แอบ mutate config หรือ inject global CSS เพื่อรักษาความโปร่งใสและรองรับ custom preset
