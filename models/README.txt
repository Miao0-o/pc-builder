GLB/GLTF 硬件模型目录

将3D硬件模型文件放在此目录下，命名规则：
  gpu.glb         - 显卡模型
  motherboard.glb - 主板模型
  psu.glb         - 电源模型
  ram.glb         - 内存条模型
  ssd.glb         - 硬盘模型
  cpu.glb         - CPU模型
  cooler.glb      - 散热器模型

模型加载失败时，会自动使用程序化生成的模型作为回退方案，
不会影响页面其他功能。

获取模型途径：
  - 制造商官网（部分品牌提供产品3D展示文件）
  - Sketchfab等3D模型平台
  - 自行用Blender等工具建模导出

要求：
  - GLB或GLTF格式
  - PBR材质（金属度/粗糙度贴图）
  - 模型单位为米（与Three.js默认单位一致）
  - 建议面数：5万-20万面（保证性能）
