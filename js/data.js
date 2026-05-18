// ============================================================
// 台式电脑配件数据库 - 小白装机指南
// ============================================================

const pcComponents = {

  // ==================== 机箱 ====================
  case: {
    id: 'case',
    name: '机箱 Case',
    icon: 'monitor',
    shortName: '机箱',
    position: { top: '5%', left: '5%', width: '88%', height: '85%' },
    description: '机箱是所有配件的"房子"。它不仅决定电脑的外观颜值，更影响散热效果、噪音控制和未来的升级空间。选机箱是装机的第一步，因为机箱大小决定了能装多大的主板、多长的显卡、多大的散热器。',
    specs: [
      ['尺寸规格','ATX / M-ATX / ITX，决定能装什么尺寸的主板'],
      ['支持主板','E-ATX / ATX / M-ATX / ITX，向下兼容'],
      ['显卡限长','机箱能塞下的显卡最大长度（mm）'],
      ['散热器限高','风冷散热器能装多高（mm），水冷看冷排位'],
      ['风扇位数量','能装几个风扇，影响散热能力'],
      ['板材材质','SPCC冷轧钢 / SECC镀锌钢 / SGCC热浸镀锌钢 / 铝镁合金'],
      ['板材厚度','建议≥0.6mm，越厚越结实越静音'],
    ],
    knowledge: [
      {
        title: '一、从体型上分类',
        text: '机箱从体型上分为四种：全塔式、中塔式、小塔式、迷你式。',
        example: '全塔式：尺寸最大（高>55cm），兼容性最强，E-ATX到ITX主板通吃，可以装360/420水冷。\n中塔式：最常见的尺寸（高45-52cm），兼容性也很好，大多数ATX/M-ATX主板都能装。市售80%的机箱都是这个尺寸。\n小塔式（M-ATX机箱）：尺寸较小（高35-40cm），对硬件有一定要求，显卡不能太长。\n迷你式（ITX机箱）：最小（高<35cm），只能装ITX主板、下压式散热器、SFX小电源。适合桌面空间有限的用户。'
      },
      {
        title: '二、从主板支持度上分类',
        text: '机箱的"规格"本质上就是看它能装什么尺寸的主板。ATX机箱可以装ATX、M-ATX、ITX主板（向下兼容）。但M-ATX机箱装不了ATX主板——板子太大放不进去。',
        example: '全塔、中塔 → ATX机箱（兼容ATX/M-ATX/ITX）\n小塔 → M-ATX机箱（兼容M-ATX/ITX）\n迷你 → ITX机箱（仅ITX）'
      },
      {
        title: '三、选购机箱看哪些方面',
        text: '1. 预算：200元以内也有很多好机箱（如鑫谷无尽版Pro、先马平头哥）；300-500元是主流甜点区间（联力、追风者、恩杰等品牌的入门款）。\n2. 板材材质：SPCC（冷轧碳钢）是最常见的；SECC/SGCC（镀锌钢）防锈更好；高端机箱用铝镁合金（更轻更美观）。\n3. 板材厚度：建议≥0.6mm。太薄的机箱容易共振产生噪音，手感也差。\n4. 散热兼容性：风冷看"散热器限高"参数；水冷看冷排位（240/280/360）。\n5. 风道设计：记住"热空气上升，冷空气下降"。好的风道是前进风+后出风+上出风。下置电源独立风道是目前主流。\n6. 侧透面板：钢化玻璃（质感好但小心碎裂）vs 亚克力（轻便不易碎但易划伤）。玻璃侧板建议贴保护膜。',
        example: '举个栗子：联力 LANCOOL 216（约499元）是目前500元价位的散热标杆，前面预装2个16cm大风扇+后面1个14cm风扇，风道优秀，显卡限长392mm几乎能装所有显卡。而追风者G360A（约399元）主打高颜值ARGB，自带3个RGB风扇'
      }
    ],
    options: [
      { name: '鑫谷 无尽版 Pro 黑色', price: 199, specs: '中塔ATX / 显卡限长350mm / 侧透钢化玻璃 / SPCC板材0.6mm', score: 40000, tier: '百元性价比之王', shape: 'mid-tower-basic', structuredSpecs: { formFactor: 'ATX', supportedMB: ['ATX', 'M-ATX', 'ITX'], gpuMaxLength: 350, coolerMaxHeight: 165, radiatorSupport: ['240', '280', '360'], material: 'SPCC', thickness: 0.6, sidePanel: 'tempered-glass', fanSlots: 6 } },
      { name: '追风者 G360A 白色', price: 399, specs: '中塔ATX / 显卡限长380mm / 3×ARGB风扇预装 / 0.7mm板材', score: 55000, tier: '高颜值ARGB', shape: 'mid-tower-rgb', structuredSpecs: { formFactor: 'ATX', supportedMB: ['ATX', 'M-ATX', 'ITX'], gpuMaxLength: 380, coolerMaxHeight: 170, radiatorSupport: ['240', '280', '360'], material: 'SPCC', thickness: 0.7, sidePanel: 'tempered-glass', fanSlots: 7 } },
      { name: '联力 LANCOOL 216 黑色', price: 499, specs: '中塔ATX / 显卡限长392mm / 前2×16cm+后14cm风扇 / 0.8mm板材', score: 60000, tier: '500元散热王者', shape: 'mid-tower-premium', structuredSpecs: { formFactor: 'ATX', supportedMB: ['ATX', 'M-ATX', 'ITX'], gpuMaxLength: 392, coolerMaxHeight: 180, radiatorSupport: ['240', '280', '360'], material: 'SPCC', thickness: 0.8, sidePanel: 'tempered-glass', fanSlots: 7 } },
      { name: '恩杰 H5 Flow 黑色', price: 599, specs: '中塔ATX / 显卡限长365mm / 独特下置风扇位 / SECC板材', score: 62000, tier: '恩杰品质', shape: 'mid-tower-nzxt', structuredSpecs: { formFactor: 'ATX', supportedMB: ['ATX', 'M-ATX', 'ITX'], gpuMaxLength: 365, coolerMaxHeight: 170, radiatorSupport: ['240', '280'], material: 'SECC', thickness: 0.7, sidePanel: 'tempered-glass', fanSlots: 6 } },
      { name: 'Fractal Design Torrent 黑色', price: 1299, specs: '全塔E-ATX / 显卡限长461mm / 2×18cm+3×14cm风扇 / 0.8mm板材', score: 70000, tier: '风冷散热王', shape: 'mid-tower-premium', structuredSpecs: { formFactor: 'E-ATX', supportedMB: ['E-ATX', 'ATX', 'M-ATX', 'ITX'], gpuMaxLength: 461, coolerMaxHeight: 188, radiatorSupport: ['240', '280', '360', '420'], material: 'SECC', thickness: 0.8, sidePanel: 'tempered-glass', fanSlots: 9 } },
      { name: '联力 O11 Dynamic EVO XL', price: 1899, specs: '全塔E-ATX / 显卡限长460mm / 双仓设计 / 支持3×420冷排', score: 75000, tier: '旗舰海景房', shape: 'mid-tower-premium', structuredSpecs: { formFactor: 'E-ATX', supportedMB: ['E-ATX', 'ATX', 'M-ATX', 'ITX'], gpuMaxLength: 460, coolerMaxHeight: 167, radiatorSupport: ['240', '280', '360', '420'], material: '铝+钢', thickness: 0.9, sidePanel: 'tempered-glass', fanSlots: 10 } },
      { name: '酷冷至尊 TD500 Mesh 黑色', price: 469, specs: '中塔ATX / 显卡限长410mm / 3×ARGB风扇预装 / 0.7mm板材', score: 58000, tier: '高风量ARGB', shape: 'mid-tower-rgb', structuredSpecs: { formFactor: 'ATX', supportedMB: ['ATX', 'M-ATX', 'ITX'], gpuMaxLength: 410, coolerMaxHeight: 165, radiatorSupport: ['240', '280', '360'], material: 'SECC', thickness: 0.7, sidePanel: 'tempered-glass', fanSlots: 7 } },
      { name: '海盗船 4000D Airflow 黑色', price: 749, specs: '中塔ATX / 显卡限长360mm / 2×风扇预装 / 0.8mm板材', score: 65000, tier: '海盗船风道机箱', shape: 'mid-tower-premium', structuredSpecs: { formFactor: 'ATX', supportedMB: ['ATX', 'M-ATX', 'ITX'], gpuMaxLength: 360, coolerMaxHeight: 170, radiatorSupport: ['240', '280', '360'], material: 'SECC', thickness: 0.8, sidePanel: 'tempered-glass', fanSlots: 6 } },
      { name: '先马 鲁班1 黑色', price: 199, specs: '中塔ATX / 显卡限长350mm / 侧透钢化玻璃 / SPCC板材0.6mm', score: 42000, tier: '百元级入门', shape: 'mid-tower-basic', structuredSpecs: { formFactor: 'ATX', supportedMB: ['ATX', 'M-ATX', 'ITX'], gpuMaxLength: 350, coolerMaxHeight: 160, radiatorSupport: ['240', '280'], material: 'SPCC', thickness: 0.6, sidePanel: 'tempered-glass', fanSlots: 5 } },
      { name: '安钛克 Performance 1 FT 黑色', price: 1199, specs: '全塔E-ATX / 显卡限长400mm / 4×风扇预装 / 铝面板', score: 72000, tier: '安钛克旗舰', shape: 'mid-tower-premium', structuredSpecs: { formFactor: 'E-ATX', supportedMB: ['E-ATX', 'ATX', 'M-ATX', 'ITX'], gpuMaxLength: 400, coolerMaxHeight: 175, radiatorSupport: ['240', '280', '360', '420'], material: '铝+钢', thickness: 0.8, sidePanel: 'tempered-glass', fanSlots: 8 } },
      { name: '九州风神 CH560 黑色', price: 399, specs: '中塔ATX / 显卡限长380mm / 4×ARGB风扇预装 / 0.7mm板材', score: 56000, tier: '高风量ARGB', shape: 'mid-tower-rgb', structuredSpecs: { formFactor: 'ATX', supportedMB: ['ATX', 'M-ATX', 'ITX'], gpuMaxLength: 380, coolerMaxHeight: 175, radiatorSupport: ['240', '280', '360'], material: 'SPCC', thickness: 0.7, sidePanel: 'tempered-glass', fanSlots: 7 } },
      { name: '恩杰 H6 Flow 黑色', price: 799, specs: '中塔ATX / 显卡限长365mm / 双面玻璃全景 / SECC板材', score: 64000, tier: '中端全景海景', shape: 'mid-tower-nzxt', structuredSpecs: { formFactor: 'ATX', supportedMB: ['ATX', 'M-ATX', 'ITX'], gpuMaxLength: 365, coolerMaxHeight: 163, radiatorSupport: ['240', '280', '360'], material: 'SECC', thickness: 0.7, sidePanel: 'tempered-glass', fanSlots: 8 } },
      { name: '恩杰 H9 Flow 黑色', price: 1299, specs: '全塔E-ATX / 显卡限长435mm / 三面玻璃 / 双仓设计 / 0.8mm', score: 70000, tier: '高端全景旗舰', shape: 'mid-tower-premium', structuredSpecs: { formFactor: 'E-ATX', supportedMB: ['E-ATX', 'ATX', 'M-ATX', 'ITX'], gpuMaxLength: 435, coolerMaxHeight: 165, radiatorSupport: ['240', '280', '360'], material: 'SECC', thickness: 0.8, sidePanel: 'tempered-glass', fanSlots: 10 } },
      { name: '联力 O11 Vision 黑色', price: 1199, specs: '中塔ATX / 显卡限长455mm / 三面玻璃无立柱 / 铝+钢0.9mm', score: 70000, tier: '无立柱全景天花板', shape: 'mid-tower-premium', structuredSpecs: { formFactor: 'ATX', supportedMB: ['ATX', 'M-ATX', 'ITX'], gpuMaxLength: 455, coolerMaxHeight: 167, radiatorSupport: ['240', '280', '360'], material: '铝+钢', thickness: 0.9, sidePanel: 'tempered-glass', fanSlots: 8 } },
      { name: 'JONSBO D41 黑色', price: 349, specs: 'M-ATX紧凑型 / 显卡限长330mm / 侧透玻璃 / SPCC板材0.7mm', score: 48000, tier: '紧凑型性价比', shape: 'mid-tower-basic', structuredSpecs: { formFactor: 'M-ATX', supportedMB: ['M-ATX', 'ITX'], gpuMaxLength: 330, coolerMaxHeight: 168, radiatorSupport: ['240', '360'], material: 'SPCC', thickness: 0.7, sidePanel: 'tempered-glass', fanSlots: 5 } },
      { name: '海盗船 5000D Airflow 黑色', price: 1099, specs: '中塔ATX / 显卡限长420mm / 2×风扇预装 / SECC板材0.8mm', score: 66000, tier: '海盗船大空间', shape: 'mid-tower-premium', structuredSpecs: { formFactor: 'ATX', supportedMB: ['E-ATX', 'ATX', 'M-ATX', 'ITX'], gpuMaxLength: 420, coolerMaxHeight: 170, radiatorSupport: ['240', '280', '360'], material: 'SECC', thickness: 0.8, sidePanel: 'tempered-glass', fanSlots: 10 } },
      { name: '骨伽 MX600 黑色', price: 599, specs: '中塔ATX / 显卡限长400mm / 4×ARGB风扇预装 / 超大进气网', score: 58000, tier: '大进气量ARGB', shape: 'mid-tower-rgb', structuredSpecs: { formFactor: 'ATX', supportedMB: ['ATX', 'M-ATX', 'ITX'], gpuMaxLength: 400, coolerMaxHeight: 175, radiatorSupport: ['240', '280', '360'], material: 'SPCC', thickness: 0.7, sidePanel: 'tempered-glass', fanSlots: 8 } },
      { name: '先马 新境界 黑色', price: 399, specs: '中塔ATX / 显卡限长400mm / 270度全景玻璃 / SPCC板材0.7mm', score: 52000, tier: '性价比海景房', shape: 'mid-tower-rgb', structuredSpecs: { formFactor: 'ATX', supportedMB: ['ATX', 'M-ATX', 'ITX'], gpuMaxLength: 400, coolerMaxHeight: 165, radiatorSupport: ['240', '280', '360'], material: 'SPCC', thickness: 0.7, sidePanel: 'tempered-glass', fanSlots: 7 } },
      { name: '乔思伯 TK-1 黑色', price: 499, specs: 'M-ATX曲面玻璃 / 显卡限长280mm / 弧形钢化玻璃 / SPCC+铝', score: 50000, tier: 'ITX曲面玻璃', shape: 'mid-tower-basic', structuredSpecs: { formFactor: 'M-ATX', supportedMB: ['M-ATX', 'ITX'], gpuMaxLength: 280, coolerMaxHeight: 145, radiatorSupport: ['240'], material: 'SPCC+铝', thickness: 0.8, sidePanel: 'tempered-glass', fanSlots: 3 } },
      { name: '安钛克 P20C 黑色', price: 499, specs: '中塔ATX / 显卡限长375mm / 3×ARGB风扇预装 / 0.7mm板材', score: 56000, tier: '安钛克中端均衡', shape: 'mid-tower-rgb', structuredSpecs: { formFactor: 'ATX', supportedMB: ['ATX', 'M-ATX', 'ITX'], gpuMaxLength: 375, coolerMaxHeight: 170, radiatorSupport: ['240', '280', '360'], material: 'SPCC', thickness: 0.7, sidePanel: 'tempered-glass', fanSlots: 6 } },
      { name: '几何未来 Model 5 黑色', price: 599, specs: '中塔ATX / 显卡限长380mm / 独特几何面板设计 / SPCC 0.8mm', score: 58000, tier: '设计感机箱', shape: 'mid-tower-premium', structuredSpecs: { formFactor: 'ATX', supportedMB: ['ATX', 'M-ATX', 'ITX'], gpuMaxLength: 380, coolerMaxHeight: 170, radiatorSupport: ['240', '280', '360'], material: 'SPCC', thickness: 0.8, sidePanel: 'tempered-glass', fanSlots: 7 } }
    ]
  },

  // ==================== CPU ====================
  cpu: {
    id: 'cpu',
    name: 'CPU 中央处理器',
    icon: 'cpu',
    shortName: 'CPU',
    position: { top: '18%', left: '42%', width: '14%', height: '12%' },
    description: 'CPU是电脑的"大脑"，所有的计算、指令处理都由它完成。CPU性能直接决定电脑的反应速度和多任务处理能力。目前消费级CPU市场由Intel和AMD两家主导，各有优劣。',
    specs: [
      ['核心数','物理核心数量，越多多任务越强。办公4核够，游戏6-8核，生产力12核起'],
      ['线程数','逻辑处理器数量（超线程技术），通常是核心数×2'],
      ['主频/睿频','基础频率（日常运行）和最大加速频率（高负载时自动提升）'],
      ['制程工艺','纳米数越小越好（如4nm比7nm先进），决定功耗和发热'],
      ['缓存(L3)','CPU内部的高速存储区，越大对游戏提升越明显'],
      ['功耗(TDP)','散热器需要能压住的热量，单位瓦(W)'],
      ['接口类型','Intel用LGA1700（12-14代），AMD用AM5（7000系起）'],
    ],
    knowledge: [
      {
        title: '一、Intel vs AMD 怎么选？',
        text: 'Intel（酷睿系列）：单核性能强，游戏帧数略高，软件兼容性好。目前主流是14代（i3/i5/i7/i9）。\nAMD（锐龙系列）：多核性能强，性价比高，功耗低。7000系列后用AM5接口，战未来。X3D系列（如7800X3D）游戏性能极强。',
        example: '办公/上网课：i3-14100F（¥699）或 R5 7500F（¥899）完全够用\n游戏为主：i5-14600KF（¥1699）或 R7 7800X3D（¥2899）是目前游戏性价比最高的两颗U\n视频剪辑/3D渲染：i7-14700KF（¥2599）的多核性能非常强\n专业工作站：i9-14900K（¥4299）或 R9 7950X（¥3599）'
      },
      {
        title: '二、CPU型号怎么看？',
        text: 'Intel命名规则：以"i5-14600KF"为例——i5是级别（i3入门/i5主流/i7高端/i9旗舰），14代表第14代，600是具体型号，K代表可超频，F代表无核显（必须配独立显卡）。\nAMD命名规则：以"R7 7800X3D"为例——R7是级别（R5主流/R7高端/R9旗舰），7代表第7代，800是具体型号，X代表高频版，3D代表堆叠缓存（游戏特化）。',
        example: '注意：Intel的F后缀CPU不带核显，如果你不买独立显卡就没画面输出！如果只是办公用，买带核显的版本（如i5-14600K不带F）可以省显卡钱。'
      },
      {
        title: '三、选购CPU的注意事项',
        text: '1. CPU和主板接口必须匹配！Intel 12-14代用LGA1700接口配600/700系主板；AMD 7000系用AM5接口配600系主板。买错接口根本装不上！\n2. 散片 vs 盒装：散片便宜100-300元但没有原装散热器和官方保修（店保）。盒装贵但有3年官方质保。\n3. 带K的Intel CPU建议配Z系列主板才能超频，配B系列主板虽然能用但浪费了超频能力。\n4. 功耗越高的CPU，散热器和电源都要跟着升级。i9级别建议上360水冷+850W以上电源。'
      }
    ],
    options: [
      { name: 'Intel 酷睿 i5-14600KF', price: 1699, specs: '14核20线程 / 最高5.3GHz / 24MB L3 / 125W / LGA1700', score: 280000, tier: '中端游戏首选', shape: 'cpu-intel', structuredSpecs: { socket: 'LGA1700', platform: 'intel', generation: 14, cores: 14, threads: 20, baseClock: 3.5, boostClock: 5.3, tdp: 125, hasIGPU: false, l3Cache: 24, memorySupport: ['DDR5', 'DDR4'] } },
      { name: 'Intel 酷睿 i7-14700KF', price: 2599, specs: '20核28线程 / 最高5.6GHz / 33MB L3 / 125W / LGA1700', score: 380000, tier: '高端游戏+生产力', shape: 'cpu-intel', structuredSpecs: { socket: 'LGA1700', platform: 'intel', generation: 14, cores: 20, threads: 28, baseClock: 3.4, boostClock: 5.6, tdp: 125, hasIGPU: false, l3Cache: 33, memorySupport: ['DDR5', 'DDR4'] } },
      { name: 'AMD 锐龙 R5 7600X', price: 1399, specs: '6核12线程 / 最高5.3GHz / 32MB L3 / 105W / AM5', score: 250000, tier: 'AMD性价比之选', shape: 'cpu-amd', structuredSpecs: { socket: 'AM5', platform: 'amd', generation: 7000, cores: 6, threads: 12, baseClock: 4.7, boostClock: 5.3, tdp: 105, hasIGPU: true, l3Cache: 32, memorySupport: ['DDR5'] } },
      { name: 'AMD 锐龙 R7 7800X3D', price: 2899, specs: '8核16线程 / 96MB L3缓存 / 120W / AM5', score: 360000, tier: '游戏最强U', shape: 'cpu-amd', structuredSpecs: { socket: 'AM5', platform: 'amd', generation: 7000, cores: 8, threads: 16, baseClock: 4.2, boostClock: 5.0, tdp: 120, hasIGPU: true, l3Cache: 96, memorySupport: ['DDR5'] } },
      { name: 'Intel 酷睿 i9-14900K', price: 4299, specs: '24核32线程 / 最高6.0GHz / 36MB L3 / 150W / LGA1700', score: 450000, tier: '旗舰性能怪兽', shape: 'cpu-intel', structuredSpecs: { socket: 'LGA1700', platform: 'intel', generation: 14, cores: 24, threads: 32, baseClock: 3.2, boostClock: 6.0, tdp: 150, hasIGPU: true, l3Cache: 36, memorySupport: ['DDR5', 'DDR4'] } },
      { name: 'AMD 锐龙 R9 7950X3D', price: 4599, specs: '16核32线程 / 128MB L3 / 120W / AM5', score: 480000, tier: 'AMD旗舰游戏王', shape: 'cpu-amd', structuredSpecs: { socket: 'AM5', platform: 'amd', generation: 7000, cores: 16, threads: 32, baseClock: 4.2, boostClock: 5.7, tdp: 120, hasIGPU: true, l3Cache: 128, memorySupport: ['DDR5'] } },
      { name: 'AMD 锐龙 R9 9950X3D', price: 5699, specs: '16核32线程 / 128MB L3 / 170W / AM5 / Zen5', score: 550000, tier: 'Zen5旗舰', shape: 'cpu-amd', structuredSpecs: { socket: 'AM5', platform: 'amd', generation: 9000, cores: 16, threads: 32, baseClock: 4.3, boostClock: 5.7, tdp: 170, hasIGPU: true, l3Cache: 128, memorySupport: ['DDR5'] } },
      { name: 'Intel 酷睿 i5-14400F', price: 1299, specs: '10核16线程 / 最高4.7GHz / 20MB L3 / 65W / LGA1700', score: 220000, tier: '入门性价比神U', shape: 'cpu-intel', structuredSpecs: { socket: 'LGA1700', platform: 'intel', generation: 14, cores: 10, threads: 16, baseClock: 2.5, boostClock: 4.7, tdp: 65, hasIGPU: false, l3Cache: 20, memorySupport: ['DDR5', 'DDR4'] } },
      { name: 'Intel 酷睿 i7-13700KF', price: 2199, specs: '16核24线程 / 最高5.4GHz / 30MB L3 / 125W / LGA1700', score: 350000, tier: '13代性价比旗舰', shape: 'cpu-intel', structuredSpecs: { socket: 'LGA1700', platform: 'intel', generation: 13, cores: 16, threads: 24, baseClock: 3.4, boostClock: 5.4, tdp: 125, hasIGPU: false, l3Cache: 30, memorySupport: ['DDR5', 'DDR4'] } },
      { name: 'Intel Core Ultra 7 265K', price: 3299, specs: '20核20线程 / 最高5.5GHz / 30MB L3 / 125W / LGA1851 / ArrowLake', score: 400000, tier: 'Ultra新平台', shape: 'cpu-intel', structuredSpecs: { socket: 'LGA1851', platform: 'intel', generation: 'Ultra200', cores: 20, threads: 20, baseClock: 3.9, boostClock: 5.5, tdp: 125, hasIGPU: true, l3Cache: 30, memorySupport: ['DDR5'] } },
      { name: 'Intel Core Ultra 9 285K', price: 5499, specs: '24核24线程 / 最高5.7GHz / 36MB L3 / 150W / LGA1851', score: 520000, tier: 'Ultra旗舰', shape: 'cpu-intel', structuredSpecs: { socket: 'LGA1851', platform: 'intel', generation: 'Ultra200', cores: 24, threads: 24, baseClock: 3.7, boostClock: 5.7, tdp: 150, hasIGPU: true, l3Cache: 36, memorySupport: ['DDR5'] } },
      { name: 'AMD 锐龙 R5 7500F', price: 899, specs: '6核12线程 / 最高5.0GHz / 32MB L3 / 65W / AM5', score: 200000, tier: 'AM5入门神U', shape: 'cpu-amd', structuredSpecs: { socket: 'AM5', platform: 'amd', generation: 7000, cores: 6, threads: 12, baseClock: 3.7, boostClock: 5.0, tdp: 65, hasIGPU: false, l3Cache: 32, memorySupport: ['DDR5'] } },
      { name: 'AMD 锐龙 R7 9700X', price: 2199, specs: '8核16线程 / 最高5.5GHz / 32MB L3 / 65W / AM5 / Zen5', score: 320000, tier: 'Zen5性价比', shape: 'cpu-amd', structuredSpecs: { socket: 'AM5', platform: 'amd', generation: 9000, cores: 8, threads: 16, baseClock: 3.8, boostClock: 5.5, tdp: 65, hasIGPU: true, l3Cache: 32, memorySupport: ['DDR5'] } },
      { name: 'AMD 锐龙 R7 9800X3D', price: 3799, specs: '8核16线程 / 104MB L3 / 120W / AM5 / Zen5 3D', score: 430000, tier: 'Zen5最强游戏U', shape: 'cpu-amd', structuredSpecs: { socket: 'AM5', platform: 'amd', generation: 9000, cores: 8, threads: 16, baseClock: 4.3, boostClock: 5.2, tdp: 120, hasIGPU: true, l3Cache: 104, memorySupport: ['DDR5'] } },
      { name: 'AMD 锐龙 R9 7900X', price: 2599, specs: '12核24线程 / 最高5.6GHz / 64MB L3 / 170W / AM5', score: 420000, tier: '多核生产力旗舰', shape: 'cpu-amd', structuredSpecs: { socket: 'AM5', platform: 'amd', generation: 7000, cores: 12, threads: 24, baseClock: 4.7, boostClock: 5.6, tdp: 170, hasIGPU: true, l3Cache: 64, memorySupport: ['DDR5'] } },
      { name: 'Intel 酷睿 i3-14100F', price: 699, specs: '4核8线程 / 最高4.7GHz / 12MB L3 / 58W / LGA1700', score: 150000, tier: '百元办公首选', shape: 'cpu-intel', structuredSpecs: { socket: 'LGA1700', platform: 'intel', generation: 14, cores: 4, threads: 8, baseClock: 3.5, boostClock: 4.7, tdp: 58, hasIGPU: false, l3Cache: 12, memorySupport: ['DDR5', 'DDR4'] } },
      { name: 'Intel 酷睿 i5-14500', price: 1699, specs: '14核20线程 / 最高5.0GHz / 24MB L3 / 65W / LGA1700 / 带核显', score: 250000, tier: '14代全能神U', shape: 'cpu-intel', structuredSpecs: { socket: 'LGA1700', platform: 'intel', generation: 14, cores: 14, threads: 20, baseClock: 2.6, boostClock: 5.0, tdp: 65, hasIGPU: true, l3Cache: 24, memorySupport: ['DDR5', 'DDR4'] } },
      { name: 'Intel 酷睿 i9-14900KF', price: 3999, specs: '24核32线程 / 最高6.0GHz / 36MB L3 / 125W / LGA1700 / 无核显', score: 455000, tier: '14代旗舰无核显', shape: 'cpu-intel', structuredSpecs: { socket: 'LGA1700', platform: 'intel', generation: 14, cores: 24, threads: 32, baseClock: 3.2, boostClock: 6.0, tdp: 125, hasIGPU: false, l3Cache: 36, memorySupport: ['DDR5', 'DDR4'] } },
      { name: 'Intel Core Ultra 5 245K', price: 2299, specs: '14核14线程 / 最高5.2GHz / 24MB L3 / 125W / LGA1851 / ArrowLake', score: 310000, tier: 'Ultra5新平台', shape: 'cpu-intel', structuredSpecs: { socket: 'LGA1851', platform: 'intel', generation: 'Ultra200', cores: 14, threads: 14, baseClock: 4.2, boostClock: 5.2, tdp: 125, hasIGPU: true, l3Cache: 24, memorySupport: ['DDR5'] } },
      { name: 'AMD 锐龙 R5 8400F', price: 999, specs: '6核12线程 / 最高4.7GHz / 16MB L3 / 65W / AM5 / 无核显', score: 215000, tier: 'AM5入门8000系', shape: 'cpu-amd', structuredSpecs: { socket: 'AM5', platform: 'amd', generation: 8000, cores: 6, threads: 12, baseClock: 4.2, boostClock: 4.7, tdp: 65, hasIGPU: false, l3Cache: 16, memorySupport: ['DDR5'] } },
      { name: 'AMD 锐龙 R7 7700', price: 1499, specs: '8核16线程 / 最高5.3GHz / 32MB L3 / 65W / AM5 / 带核显', score: 275000, tier: 'AM5高效能8核', shape: 'cpu-amd', structuredSpecs: { socket: 'AM5', platform: 'amd', generation: 7000, cores: 8, threads: 16, baseClock: 3.8, boostClock: 5.3, tdp: 65, hasIGPU: true, l3Cache: 32, memorySupport: ['DDR5'] } },
      { name: 'AMD 锐龙 R9 7950X', price: 3299, specs: '16核32线程 / 最高5.7GHz / 64MB L3 / 170W / AM5', score: 440000, tier: 'AMD多核旗舰', shape: 'cpu-amd', structuredSpecs: { socket: 'AM5', platform: 'amd', generation: 7000, cores: 16, threads: 32, baseClock: 4.5, boostClock: 5.7, tdp: 170, hasIGPU: true, l3Cache: 64, memorySupport: ['DDR5'] } },
      { name: 'AMD 锐龙 R9 9900X', price: 3299, specs: '12核24线程 / 最高5.6GHz / 64MB L3 / 120W / AM5 / Zen5', score: 450000, tier: 'Zen5多核旗舰', shape: 'cpu-amd', structuredSpecs: { socket: 'AM5', platform: 'amd', generation: 9000, cores: 12, threads: 24, baseClock: 4.4, boostClock: 5.6, tdp: 120, hasIGPU: true, l3Cache: 64, memorySupport: ['DDR5'] } }
    ]
  },

  // ==================== GPU ====================
  gpu: {
    id: 'gpu',
    name: '显卡 GPU',
    icon: 'gamepad-2',
    shortName: '显卡',
    position: { top: '38%', left: '38%', width: '22%', height: '10%' },
    description: '显卡负责处理所有的图像和画面输出。游戏画面的流畅度、画质高低、视频渲染速度，几乎全看显卡。显卡是装机中预算占比最大（通常30%-50%）的配件，也是溢价最严重的配件。',
    specs: [
      ['显存(VRAM)','显卡专用的高速内存，越大越能处理高分辨率和高画质'],
      ['CUDA核心/流处理器','显卡的"小工"，数量越多并行处理能力越强'],
      ['核心频率','显卡芯片的运行速度，越高越快'],
      ['显存位宽','数据通道宽度，影响高分辨率下的性能'],
      ['功耗(TGP)','满载时消耗的功率，决定需要多大的电源'],
      ['尺寸','显卡长度+厚度，得看机箱能不能塞下'],
    ],
    knowledge: [
      {
        title: '一、NVIDIA vs AMD 显卡怎么选？',
        text: 'NVIDIA（N卡）：目前市场主导者。优势在于光追性能强、DLSS技术（AI补帧）、CUDA生态（AI/3D渲染软件的首选）、驱动稳定。RTX 40系列是目前主流。\nAMD（A卡）：性价比更高，同价位显存更大。优势在于光栅化性能（传统游戏）、大显存。RX 7000系列是目前主流。',
        example: '1080P游戏：RTX 4060（¥2399）完全够了，大部分游戏高画质60帧以上\n2K游戏：RTX 4060 Ti（¥3299）或 RX 7700 XT（¥2999）\n4K游戏：RTX 4070 Super（¥4799）起步，最好上RTX 4070 Ti Super\nAI画图/3D渲染：必须N卡！RTX 4060 Ti 16GB版性价比高\n纯办公看剧：不需要独立显卡，CPU自带核显就够了'
      },
      {
        title: '二、显卡型号怎么看？',
        text: 'NVIDIA：以"RTX 4070 Super"为例。RTX代表支持光追，40代表第4代，70代表级别（50入门/60主流/70高端/80旗舰/90卡皇），Super是中期加强版（性能比普通版高约15%）。Ti也是加强版，Ti Super是进一步加强。\nAMD：以"RX 7700 XT"为例。RX代表消费级显卡，7代表第7代，700是具体型号，XT是加强版。',
        example: '坑点提醒：别买RTX 3050/3060了（库存清仓价还不低），同价位不如买4060。也别买RX 6500 XT这种阉割卡，显存只有4GB，现在很多游戏都不够了。'
      },
      {
        title: '三、选购显卡的注意事项',
        text: '1. 显存大小很重要！2026年了，1080P游戏建议8GB起步，2K建议12GB，4K建议16GB以上。\n2. 同一芯片不同品牌（华硕/微星/技嘉/七彩虹等）性能差距很小（3%以内），价差主要在散热和做工。丐版和旗舰版游戏帧数基本一样。\n3. 显卡尺寸要量好！很多三风扇显卡长度超过33cm，小机箱根本塞不下。买之前一定查"显卡限长"参数。\n4. 电源要留余量！显卡满载功耗+CPU满载功耗+150W余量=电源最低瓦数。\n5. 京东自营/天猫旗舰店买的显卡有3年质保，二手矿卡风险大，小白不建议碰二手显卡。'
      }
    ],
    options: [
      { name: 'NVIDIA RTX 4060 8G', price: 2399, specs: '8GB GDDR6 / 3072 CUDA / 115W / 双风扇 / 支持DLSS3', score: 320000, tier: '1080P入门甜品', shape: 'gpu-dual', structuredSpecs: { chipset: 'RTX 4060', vram: 8, vramType: 'GDDR6', tdp: 115, length: 240, slotWidth: 2, pcieGen: 4, hasDLSS3: true, powerConnector: '8-pin' } },
      { name: 'NVIDIA RTX 4060 Ti 8G', price: 3299, specs: '8GB GDDR6 / 4352 CUDA / 160W / 双/三风扇 / DLSS3', score: 380000, tier: '2K入门', shape: 'gpu-triple', structuredSpecs: { chipset: 'RTX 4060 Ti', vram: 8, vramType: 'GDDR6', tdp: 160, length: 270, slotWidth: 2, pcieGen: 4, hasDLSS3: true, powerConnector: '8-pin' } },
      { name: 'NVIDIA RTX 4070 Super 12G', price: 4799, specs: '12GB GDDR6X / 7168 CUDA / 220W / 三风扇 / DLSS3', score: 520000, tier: '4K入门/2K高刷', shape: 'gpu-triple', structuredSpecs: { chipset: 'RTX 4070 Super', vram: 12, vramType: 'GDDR6X', tdp: 220, length: 310, slotWidth: 2.5, pcieGen: 4, hasDLSS3: true, powerConnector: '12VHPWR' } },
      { name: 'AMD RX 7700 XT 12G', price: 2999, specs: '12GB GDDR6 / 3456流处理器 / 245W / 三风扇', score: 400000, tier: 'AMD性价比2K卡', shape: 'gpu-triple', structuredSpecs: { chipset: 'RX 7700 XT', vram: 12, vramType: 'GDDR6', tdp: 245, length: 300, slotWidth: 2.5, pcieGen: 4, hasDLSS3: false, powerConnector: '8-pin x2' } },
      { name: 'NVIDIA RTX 4080 Super 16G', price: 8499, specs: '16GB GDDR6X / 10240 CUDA / 320W / 三风扇 / DLSS3', score: 680000, tier: '4K高刷旗舰', shape: 'gpu-triple', structuredSpecs: { chipset: 'RTX 4080 Super', vram: 16, vramType: 'GDDR6X', tdp: 320, length: 340, slotWidth: 3, pcieGen: 4, hasDLSS3: true, powerConnector: '12VHPWR' } },
      { name: 'NVIDIA RTX 4090 24G', price: 14999, specs: '24GB GDDR6X / 16384 CUDA / 450W / 三风扇 / DLSS3', score: 850000, tier: '卡皇旗舰', shape: 'gpu-flagship', structuredSpecs: { chipset: 'RTX 4090', vram: 24, vramType: 'GDDR6X', tdp: 450, length: 356, slotWidth: 3.5, pcieGen: 4, hasDLSS3: true, powerConnector: '12VHPWR' } },
      { name: 'NVIDIA RTX 5090 32G', price: 21999, specs: '32GB GDDR7 / 21760 CUDA / 575W / 三风扇 / DLSS4', score: 980000, tier: '新一代卡皇', shape: 'gpu-flagship', structuredSpecs: { chipset: 'RTX 5090', vram: 32, vramType: 'GDDR7', tdp: 575, length: 356, slotWidth: 3.5, pcieGen: 5, hasDLSS3: true, powerConnector: '12V-2x6' } },
      { name: 'AMD RX 7900 XTX 24G', price: 7499, specs: '24GB GDDR6 / 6144流处理器 / 355W / 三风扇', score: 620000, tier: 'AMD旗舰4K卡', shape: 'gpu-triple', structuredSpecs: { chipset: 'RX 7900 XTX', vram: 24, vramType: 'GDDR6', tdp: 355, length: 330, slotWidth: 2.5, pcieGen: 4, hasDLSS3: false, powerConnector: '8-pin x2' } },
      { name: 'NVIDIA RTX 4070 Ti Super 16G', price: 6499, specs: '16GB GDDR6X / 8448 CUDA / 285W / 三风扇 / DLSS3', score: 590000, tier: '4K性价比旗舰', shape: 'gpu-triple', structuredSpecs: { chipset: 'RTX 4070 Ti Super', vram: 16, vramType: 'GDDR6X', tdp: 285, length: 320, slotWidth: 3, pcieGen: 4, hasDLSS3: true, powerConnector: '12VHPWR' } },
      { name: 'NVIDIA RTX 5080 16G', price: 9999, specs: '16GB GDDR7 / 10752 CUDA / 360W / 三风扇 / DLSS4 / Blackwell', score: 780000, tier: 'Blackwell次旗舰', shape: 'gpu-triple', structuredSpecs: { chipset: 'RTX 5080', vram: 16, vramType: 'GDDR7', tdp: 360, length: 340, slotWidth: 3, pcieGen: 5, hasDLSS3: true, powerConnector: '12V-2x6' } },
      { name: 'NVIDIA RTX 5070 12G', price: 4599, specs: '12GB GDDR7 / 6144 CUDA / 250W / 双风扇 / DLSS4 / Blackwell', score: 550000, tier: 'Blackwell甜点', shape: 'gpu-dual', structuredSpecs: { chipset: 'RTX 5070', vram: 12, vramType: 'GDDR7', tdp: 250, length: 280, slotWidth: 2, pcieGen: 5, hasDLSS3: true, powerConnector: '12V-2x6' } },
      { name: 'AMD RX 7800 XT 16G', price: 4299, specs: '16GB GDDR6 / 3840流处理器 / 263W / 三风扇 / FSR3', score: 500000, tier: 'AMD 2K高刷卡', shape: 'gpu-triple', structuredSpecs: { chipset: 'RX 7800 XT', vram: 16, vramType: 'GDDR6', tdp: 263, length: 310, slotWidth: 2.5, pcieGen: 4, hasDLSS3: false, powerConnector: '8-pin x2' } },
      { name: 'AMD RX 7900 GRE 16G', price: 4799, specs: '16GB GDDR6 / 5120流处理器 / 260W / 三风扇 / 性价比旗舰', score: 580000, tier: 'AMD性价比旗舰', shape: 'gpu-triple', structuredSpecs: { chipset: 'RX 7900 GRE', vram: 16, vramType: 'GDDR6', tdp: 260, length: 320, slotWidth: 2.5, pcieGen: 4, hasDLSS3: false, powerConnector: '8-pin x2' } },
      { name: 'Intel Arc B580 12G', price: 2199, specs: '12GB GDDR6 / 20 Xe2核心 / 180W / 双风扇 / XeSS2', score: 350000, tier: 'Intel性价比2K', shape: 'gpu-dual', structuredSpecs: { chipset: 'Arc B580', vram: 12, vramType: 'GDDR6', tdp: 180, length: 256, slotWidth: 2, pcieGen: 4, hasDLSS3: false, powerConnector: '8-pin' } },
      { name: 'NVIDIA RTX 4060 16G', price: 2899, specs: '16GB GDDR6 / 3072 CUDA / 115W / 双风扇 / DLSS3', score: 360000, tier: '大显存入门卡', shape: 'gpu-dual', structuredSpecs: { chipset: 'RTX 4060', vram: 16, vramType: 'GDDR6', tdp: 115, length: 240, slotWidth: 2, pcieGen: 4, hasDLSS3: true, powerConnector: '8-pin' } },
      { name: 'NVIDIA RTX 4070 12G', price: 4299, specs: '12GB GDDR6X / 5888 CUDA / 200W / 三风扇 / DLSS3', score: 480000, tier: '2K均衡甜点', shape: 'gpu-triple', structuredSpecs: { chipset: 'RTX 4070', vram: 12, vramType: 'GDDR6X', tdp: 200, length: 300, slotWidth: 2, pcieGen: 4, hasDLSS3: true, powerConnector: '8-pin' } },
      { name: 'NVIDIA RTX 5070 Ti 16G', price: 6499, specs: '16GB GDDR7 / 8960 CUDA / 300W / 三风扇 / DLSS4 / Blackwell', score: 650000, tier: 'Blackwell高端4K', shape: 'gpu-triple', structuredSpecs: { chipset: 'RTX 5070 Ti', vram: 16, vramType: 'GDDR7', tdp: 300, length: 320, slotWidth: 3, pcieGen: 5, hasDLSS3: true, powerConnector: '12V-2x6' } },
      { name: 'AMD RX 7600 XT 16G', price: 2499, specs: '16GB GDDR6 / 2048流处理器 / 190W / 三风扇 / FSR3', score: 370000, tier: 'AMD大显存入门', shape: 'gpu-triple', structuredSpecs: { chipset: 'RX 7600 XT', vram: 16, vramType: 'GDDR6', tdp: 190, length: 280, slotWidth: 2, pcieGen: 4, hasDLSS3: false, powerConnector: '8-pin x2' } },
      { name: 'AMD RX 9070 16G', price: 4499, specs: '16GB GDDR6 / 3584流处理器 / 220W / 三风扇 / FSR4 / RDNA4', score: 540000, tier: 'RDNA4性价比旗舰', shape: 'gpu-triple', structuredSpecs: { chipset: 'RX 9070', vram: 16, vramType: 'GDDR6', tdp: 220, length: 310, slotWidth: 2.5, pcieGen: 4, hasDLSS3: false, powerConnector: '8-pin x2' } },
      { name: 'AMD RX 9070 XT 16G', price: 5499, specs: '16GB GDDR6 / 4096流处理器 / 304W / 三风扇 / FSR4 / RDNA4', score: 630000, tier: 'RDNA4 4K旗舰', shape: 'gpu-triple', structuredSpecs: { chipset: 'RX 9070 XT', vram: 16, vramType: 'GDDR6', tdp: 304, length: 320, slotWidth: 2.5, pcieGen: 4, hasDLSS3: false, powerConnector: '8-pin x2' } },
      { name: 'Intel Arc A770 16G', price: 1999, specs: '16GB GDDR6 / 4096 Xe核心 / 225W / 双风扇 / XeSS', score: 340000, tier: 'Intel大显存卡', shape: 'gpu-dual', structuredSpecs: { chipset: 'Arc A770', vram: 16, vramType: 'GDDR6', tdp: 225, length: 270, slotWidth: 2, pcieGen: 4, hasDLSS3: false, powerConnector: '8-pin x2' } },
      { name: 'Intel Arc A580 8G', price: 1299, specs: '8GB GDDR6 / 3072 Xe核心 / 185W / 双风扇 / XeSS', score: 250000, tier: 'Intel入门1080P', shape: 'gpu-dual', structuredSpecs: { chipset: 'Arc A580', vram: 8, vramType: 'GDDR6', tdp: 185, length: 256, slotWidth: 2, pcieGen: 4, hasDLSS3: false, powerConnector: '8-pin x2' } },
      { name: 'NVIDIA RTX 4080 16G', price: 7999, specs: '16GB GDDR6X / 9728 CUDA / 320W / 三风扇 / DLSS3', score: 650000, tier: '4K高刷次旗舰', shape: 'gpu-triple', structuredSpecs: { chipset: 'RTX 4080', vram: 16, vramType: 'GDDR6X', tdp: 320, length: 340, slotWidth: 3, pcieGen: 4, hasDLSS3: true, powerConnector: '12VHPWR' } }
    ]
  },

  // ==================== 主板 ====================
  motherboard: {
    id: 'motherboard',
    name: '主板 Motherboard',
    icon: 'layout-template',
    shortName: '主板',
    position: { top: '25%', left: '25%', width: '48%', height: '50%' },
    description: '主板是所有配件的"地基"，CPU、内存、显卡、硬盘都插在上面。主板决定了你能用什么CPU、能插多少内存、能接几个硬盘、扩展性如何。',
    specs: [
      ['芯片组','决定了主板的功能和扩展能力，必须和CPU匹配'],
      ['CPU插槽','Intel用LGA1700（12-14代），AMD用AM5（7000系）'],
      ['内存插槽','一般2-4条，支持DDR4还是DDR5看具体型号'],
      ['M.2接口','插NVMe固态硬盘的接口，数量越多能装的硬盘越多'],
      ['PCIe插槽','插显卡和扩展卡的，PCIe 4.0/5.0是主流'],
      ['尺寸规格','ATX（大板）/ M-ATX（中板）/ ITX（小板）'],
      ['供电相数','影响CPU供电稳定性，高端CPU需要更多供电相数'],
    ],
    knowledge: [
      {
        title: '一、Intel主板芯片组怎么选？',
        text: 'Intel 12-14代CPU配套的600/700系芯片组：\nH610：入门级，功能最少，适合i3/低配i5，不超频。\nB660/B760：主流级（推荐大多数用户），支持内存超频但不支持CPU超频，接口够用。\nZ690/Z790：高端级，支持CPU和内存超频，适合带K的i7/i9。',
        example: '典型搭配：i5-14600KF + B760M主板（性价比首选）\ni7-14700KF + Z790主板（发挥超频潜力）\nH610主板配i9？虽然接口兼容，但供电跟不上会降频，千万别这么配！'
      },
      {
        title: '二、AMD主板芯片组怎么选？',
        text: 'AMD 7000系CPU配套600系芯片组：\nA620：入门级，功能少，适合R5级别。\nB650/B650M：主流级（推荐），接口丰富，支持内存超频。\nX670/X670E：高端级，更多PCIe通道和M.2接口，适合R9。',
        example: '典型搭配：R5 7600X + B650M主板\nR7 7800X3D + B650/B650M主板（游戏最强组合）\n注意：AMD AM5只支持DDR5内存，买内存时别买成DDR4！'
      },
      {
        title: '三、选购主板的注意事项',
        text: '1. 先选CPU再选主板！CPU决定用什么接口和芯片组。\n2. M-ATX是最主流的选择，性价比最高。ATX大板接口更多但贵，ITX小板贵且扩展性差。\n3. 注意内存类型！DDR4和DDR5不兼容，买之前确认主板支持哪种。\n4. WiFi版本通常贵100-200元，如果你用有线网可以不买WiFi版省预算。\n5. 供电散热片很重要，尤其搭配i7/R7以上CPU时，供电过热会降频。',
        example: '推荐：微星 MAG B760M MORTAR WIFI（¥1099）——Intel平台最热门的中端板，供电扎实，接口齐全，自带WiFi6。\n技嘉 B650M AORUS ELITE AX（¥1199）——AMD平台的标杆M-ATX板。'
      }
    ],
    options: [
      { name: '微星 MAG B760M MORTAR WIFI', price: 1099, specs: 'B760 / LGA1700 / 4×DDR5 / 2×M.2 / M-ATX / WiFi6', score: 100000, tier: 'Intel热门中端板', shape: 'mb-matx', structuredSpecs: { socket: 'LGA1700', chipset: 'B760', formFactor: 'M-ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 7200, m2Slots: 2, pcieGen: 4, wifi: true, platform: 'intel' } },
      { name: '华硕 TUF GAMING B760M-PLUS WIFI', price: 1299, specs: 'B760 / LGA1700 / 4×DDR5 / 2×M.2 / M-ATX / WiFi6', score: 105000, tier: '军规用料扎实', shape: 'mb-matx', structuredSpecs: { socket: 'LGA1700', chipset: 'B760', formFactor: 'M-ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 7200, m2Slots: 2, pcieGen: 4, wifi: true, platform: 'intel' } },
      { name: '技嘉 B650M AORUS ELITE AX', price: 1199, specs: 'B650 / AM5 / 4×DDR5 / 2×M.2 / M-ATX / WiFi6E', score: 105000, tier: 'AMD中端标杆', shape: 'mb-matx', structuredSpecs: { socket: 'AM5', chipset: 'B650', formFactor: 'M-ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 6400, m2Slots: 2, pcieGen: 4, wifi: true, platform: 'amd' } },
      { name: '微星 PRO Z790-P WIFI', price: 1699, specs: 'Z790 / LGA1700 / 4×DDR5 / 4×M.2 / ATX / WiFi6E', score: 120000, tier: 'Z790入门超频板', shape: 'mb-atx', structuredSpecs: { socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 7600, m2Slots: 4, pcieGen: 5, wifi: true, platform: 'intel' } },
      { name: '华硕 ROG STRIX Z790-A GAMING WIFI', price: 2699, specs: 'Z790 / LGA1700 / 4×DDR5 / 4×M.2 / ATX / WiFi6E / AURA灯效', score: 140000, tier: '高端ROG白PCB', shape: 'mb-atx', structuredSpecs: { socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 7800, m2Slots: 4, pcieGen: 5, wifi: true, platform: 'intel' } },
      { name: '华擎 Z790 PG Lightning', price: 1499, specs: 'Z790 / LGA1700 / 4×DDR5 / 3×M.2 / ATX / WiFi6E', score: 125000, tier: '性价比Z790', shape: 'mb-atx', structuredSpecs: { socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 7200, m2Slots: 3, pcieGen: 5, wifi: true, platform: 'intel' } },
      { name: '微星 MAG B650 TOMAHAWK WIFI', price: 1499, specs: 'B650 / AM5 / 4×DDR5 / 3×M.2 / ATX / WiFi6E', score: 115000, tier: 'AMD中高端板', shape: 'mb-atx', structuredSpecs: { socket: 'AM5', chipset: 'B650', formFactor: 'ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 6600, m2Slots: 3, pcieGen: 4, wifi: true, platform: 'amd' } },
      { name: '铭瑄 MS-B760M GAMING WIFI', price: 699, specs: 'B760 / LGA1700 / 2×DDR5 / 2×M.2 / M-ATX / WiFi6', score: 90000, tier: '国产性价比板', shape: 'mb-matx', structuredSpecs: { socket: 'LGA1700', chipset: 'B760', formFactor: 'M-ATX', memoryType: 'DDR5', memorySlots: 2, memoryMaxSpeed: 6800, m2Slots: 2, pcieGen: 4, wifi: true, platform: 'intel' } },
      { name: '技嘉 X670E AORUS MASTER', price: 3299, specs: 'X670E / AM5 / 4×DDR5 / 4×M.2 / E-ATX / WiFi7', score: 150000, tier: 'AMD旗舰板', shape: 'mb-atx', structuredSpecs: { socket: 'AM5', chipset: 'X670E', formFactor: 'E-ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 8000, m2Slots: 4, pcieGen: 5, wifi: true, platform: 'amd' } },
      { name: '华硕 TUF GAMING B650-PLUS WIFI', price: 1399, specs: 'B650 / AM5 / 4×DDR5 / 2×M.2 / ATX / WiFi6 / 军规用料', score: 110000, tier: 'AMD军规板', shape: 'mb-atx', structuredSpecs: { socket: 'AM5', chipset: 'B650', formFactor: 'ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 6400, m2Slots: 2, pcieGen: 4, wifi: true, platform: 'amd' } },
      { name: '华硕 TUF GAMING A620M-PLUS WIFI', price: 799, specs: 'A620 / AM5 / 2×DDR5 / 1×M.2 / M-ATX / WiFi6', score: 85000, tier: 'AM5入门板', shape: 'mb-matx', structuredSpecs: { socket: 'AM5', chipset: 'A620', formFactor: 'M-ATX', memoryType: 'DDR5', memorySlots: 2, memoryMaxSpeed: 6400, m2Slots: 1, pcieGen: 4, wifi: true, platform: 'amd' } },
      { name: '铭瑄 MS-B760M终结者 WIFI6E', price: 799, specs: 'B760 / LGA1700 / 4×DDR5 / 3×M.2 / M-ATX / WiFi6E', score: 92000, tier: '国产堆料板', shape: 'mb-matx', structuredSpecs: { socket: 'LGA1700', chipset: 'B760', formFactor: 'M-ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 7200, m2Slots: 3, pcieGen: 4, wifi: true, platform: 'intel' } },
      { name: '七彩虹 CVN B760M FROZEN WIFI', price: 899, specs: 'B760 / LGA1700 / 4×DDR5 / 2×M.2 / M-ATX / WiFi6 / 白色PCB', score: 93000, tier: '白色性价比板', shape: 'mb-matx', structuredSpecs: { socket: 'LGA1700', chipset: 'B760', formFactor: 'M-ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 7000, m2Slots: 2, pcieGen: 4, wifi: true, platform: 'intel' } },
      { name: '华擎 B650M Pro RS', price: 999, specs: 'B650 / AM5 / 4×DDR5 / 2×M.2 / M-ATX / WiFi6E', score: 95000, tier: 'AMD入门高配板', shape: 'mb-matx', structuredSpecs: { socket: 'AM5', chipset: 'B650', formFactor: 'M-ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 6400, m2Slots: 2, pcieGen: 4, wifi: true, platform: 'amd' } },
      { name: '技嘉 B760M AORUS ELITE AX', price: 1099, specs: 'B760 / LGA1700 / 4×DDR5 / 2×M.2 / M-ATX / WiFi6E', score: 102000, tier: 'AORUS中端板', shape: 'mb-matx', structuredSpecs: { socket: 'LGA1700', chipset: 'B760', formFactor: 'M-ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 7000, m2Slots: 2, pcieGen: 4, wifi: true, platform: 'intel' } },
      { name: '技嘉 Z790 AORUS ELITE AX', price: 1999, specs: 'Z790 / LGA1700 / 4×DDR5 / 4×M.2 / ATX / WiFi6E', score: 135000, tier: 'AORUS Z790主力', shape: 'mb-atx', structuredSpecs: { socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 7800, m2Slots: 4, pcieGen: 5, wifi: true, platform: 'intel' } },
      { name: '微星 MAG Z790 TOMAHAWK WIFI', price: 2199, specs: 'Z790 / LGA1700 / 4×DDR5 / 4×M.2 / ATX / WiFi6E / 16相供电', score: 140000, tier: 'Z790高端超频板', shape: 'mb-atx', structuredSpecs: { socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 7800, m2Slots: 4, pcieGen: 5, wifi: true, platform: 'intel' } },
      { name: '微星 X670E GAMING PLUS WIFI', price: 2299, specs: 'X670E / AM5 / 4×DDR5 / 4×M.2 / ATX / WiFi6E', score: 145000, tier: 'X670E高配板', shape: 'mb-atx', structuredSpecs: { socket: 'AM5', chipset: 'X670E', formFactor: 'ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 8000, m2Slots: 4, pcieGen: 5, wifi: true, platform: 'amd' } },
      { name: 'NZXT N7 Z790 白色', price: 2699, specs: 'Z790 / LGA1700 / 4×DDR5 / 4×M.2 / ATX / WiFi6E / 全覆盖装甲', score: 145000, tier: 'NZXT颜值旗舰', shape: 'mb-atx', structuredSpecs: { socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 7600, m2Slots: 4, pcieGen: 5, wifi: true, platform: 'intel' } },
      { name: '华硕 ROG STRIX B760-A GAMING WIFI', price: 1499, specs: 'B760 / LGA1700 / 4×DDR5 / 3×M.2 / ATX / WiFi6E / 白色PCB', score: 115000, tier: 'ROG白色中高端板', shape: 'mb-atx', structuredSpecs: { socket: 'LGA1700', chipset: 'B760', formFactor: 'ATX', memoryType: 'DDR5', memorySlots: 4, memoryMaxSpeed: 7400, m2Slots: 3, pcieGen: 4, wifi: true, platform: 'intel' } }
    ]
  },

  // ==================== 内存 ====================
  ram: {
    id: 'ram',
    name: '内存 RAM',
    icon: 'memory-stick',
    shortName: '内存',
    position: { top: '22%', left: '60%', width: '6%', height: '22%' },
    description: '内存是CPU的"临时工作台"，所有正在运行的程序和数据都暂存在内存里。内存不够时电脑会变卡（因为要用硬盘做虚拟内存，速度差100倍）。2026年主流是DDR5，DDR4已逐步淘汰。',
    specs: [
      ['容量','16GB日常够用，32GB游戏/设计无忧，64GB专业生产力'],
      ['频率(MHz)','DDR5从4800MHz起步，常见5600-6400MHz，越高越快'],
      ['时序(CL)','CL值越低延迟越小，DDR5常见CL30-CL36'],
      ['代数','DDR4 vs DDR5，接口不同不兼容！取决于主板支持'],
      ['通道数','双通道（插2条/4条）比单条性能提升显著'],
      ['RGB灯效','发光内存条，纯外观需求，不影响性能'],
    ],
    knowledge: [
      {
        title: '一、DDR4 vs DDR5 怎么选？',
        text: 'DDR5是新一代内存标准，频率更高、带宽更大，但价格也贵一些。2026年新装机的话，除非预算极度紧张，否则建议直接DDR5。DDR4主板和DDR5主板不通用（接口物理不同），买之前一定确认主板支持哪种。',
        example: 'DDR5 6000MHz CL30是目前最甜品的频率时序组合，性能好价格适中。\nDDR5频率不是越高越好——太高频率（7200+）可能不稳定，需要主板和CPU内存控制器支持。Intel的DDR5超频能力比AMD强。'
      },
      {
        title: '二、容量选多大？',
        text: '8GB：2026年已经不够用了，开几个网页+办公软件就满。\n16GB（2×8GB）：日常办公+轻度游戏的标准配置。\n32GB（2×16GB）：游戏+多任务+轻度视频剪辑的甜点容量。\n64GB+：专业视频剪辑、3D建模、虚拟机多开。',
        example: '重要：一定要插2条组成双通道！单条32GB性能不如2×16GB。如果你的主板有4个内存槽，优先插第2和第4槽（远离CPU的方向），这是大多数主板推荐的双通道插法。'
      },
      {
        title: '三、选购内存的注意事项',
        text: '1. 先确定主板支持DDR4还是DDR5，买错了插不上！\n2. 高频率需要主板和CPU支持，买之前查一下CPU支持的最高内存频率。\n3. 品牌选择：金士顿（稳定）、芝奇（高频/RGB颜值高）、海盗船（品质好）、光威/金百达（国产品牌性价比高）。\n4. 内存终身质保是行业标准，坏了直接换新。\n5. RGB内存条比普通条贵100-200元，纯外观需求，自己取舍。'
      }
    ],
    options: [
      { name: '金士顿 FURY Beast 16GB DDR5 6000', price: 449, specs: '16GB(16×1) / DDR5 6000MHz / CL36 / 无灯', score: 120000, tier: '入门DDR5', shape: 'ram-stick', structuredSpecs: { type: 'DDR5', capacity: 16, speed: 6000, sticks: 1, cl: 36, rgb: false } },
      { name: '芝奇 幻锋戟 32GB DDR5 6000', price: 849, specs: '32GB(16×2) / DDR5 6000MHz / CL30 / RGB灯', score: 150000, tier: '高性能双通道RGB', shape: 'ram-stick-rgb', structuredSpecs: { type: 'DDR5', capacity: 32, speed: 6000, sticks: 2, cl: 30, rgb: true } },
      { name: '海盗船 复仇者 32GB DDR5 6400', price: 999, specs: '32GB(16×2) / DDR5 6400MHz / CL32 / 无灯', score: 160000, tier: '极速高频条', shape: 'ram-stick', structuredSpecs: { type: 'DDR5', capacity: 32, speed: 6400, sticks: 2, cl: 32, rgb: false } },
      { name: '金百达 银爵 32GB DDR5 6000', price: 699, specs: '32GB(16×2) / DDR5 6000MHz / CL30 / 无灯', score: 145000, tier: '国产性价比双通道', shape: 'ram-stick', structuredSpecs: { type: 'DDR5', capacity: 32, speed: 6000, sticks: 2, cl: 30, rgb: false } },
      { name: '海盗船 统治者 64GB DDR5 6800', price: 2499, specs: '64GB(32×2) / DDR5 6800MHz / CL32 / RGB灯', score: 200000, tier: '旗舰大容量RGB', shape: 'ram-stick-rgb', structuredSpecs: { type: 'DDR5', capacity: 64, speed: 6800, sticks: 2, cl: 32, rgb: true } },
      { name: '芝奇 皇家戟 96GB DDR5 6400', price: 3599, specs: '96GB(48×2) / DDR5 6400MHz / CL32 / 晶钻RGB', score: 240000, tier: '顶级容量旗舰', shape: 'ram-stick-rgb', structuredSpecs: { type: 'DDR5', capacity: 96, speed: 6400, sticks: 2, cl: 32, rgb: true } },
      { name: '光威 天策 32GB DDR5 6000', price: 599, specs: '32GB(16×2) / DDR5 6000MHz / CL30 / 无灯 / 海力士颗粒', score: 140000, tier: '国产性价比双通道', shape: 'ram-stick', structuredSpecs: { type: 'DDR5', capacity: 32, speed: 6000, sticks: 2, cl: 30, rgb: false } },
      { name: '英睿达 Pro 32GB DDR5 5600', price: 649, specs: '32GB(16×2) / DDR5 5600MHz / CL46 / 无灯 / 原厂颗粒', score: 130000, tier: '原厂稳定条', shape: 'ram-stick', structuredSpecs: { type: 'DDR5', capacity: 32, speed: 5600, sticks: 2, cl: 46, rgb: false } },
      { name: '阿斯加特 女武神 32GB DDR5 6400 RGB', price: 799, specs: '32GB(16×2) / DDR5 6400MHz / CL32 / 白色RGB', score: 155000, tier: '高颜值白色RGB', shape: 'ram-stick-rgb', structuredSpecs: { type: 'DDR5', capacity: 32, speed: 6400, sticks: 2, cl: 32, rgb: true } },
      { name: '金士顿 FURY Renegade 64GB DDR5 6400', price: 2199, specs: '64GB(32×2) / DDR5 6400MHz / CL32 / RGB灯', score: 190000, tier: '旗舰高频大容量', shape: 'ram-stick-rgb', structuredSpecs: { type: 'DDR5', capacity: 64, speed: 6400, sticks: 2, cl: 32, rgb: true } },
      { name: '金士顿 FURY Beast 32GB DDR5 5600', price: 849, specs: '32GB(16×2) / DDR5 5600MHz / CL36 / 无灯', score: 140000, tier: '主流双通道', shape: 'ram-stick', structuredSpecs: { type: 'DDR5', capacity: 32, speed: 5600, sticks: 2, cl: 36, rgb: false } },
      { name: '金士顿 FURY Renegade 32GB DDR5 7200', price: 1099, specs: '32GB(16×2) / DDR5 7200MHz / CL38 / RGB灯', score: 175000, tier: '极速高频RGB', shape: 'ram-stick-rgb', structuredSpecs: { type: 'DDR5', capacity: 32, speed: 7200, sticks: 2, cl: 38, rgb: true } },
      { name: '芝奇 幻锋戟 64GB DDR5 6400 RGB', price: 1999, specs: '64GB(32×2) / DDR5 6400MHz / CL32 / RGB灯', score: 195000, tier: '大容量高频RGB', shape: 'ram-stick-rgb', structuredSpecs: { type: 'DDR5', capacity: 64, speed: 6400, sticks: 2, cl: 32, rgb: true } },
      { name: '芝奇 皇家戟 32GB DDR5 7200', price: 1299, specs: '32GB(16×2) / DDR5 7200MHz / CL34 / 晶钻RGB', score: 185000, tier: '极速晶钻RGB', shape: 'ram-stick-rgb', structuredSpecs: { type: 'DDR5', capacity: 32, speed: 7200, sticks: 2, cl: 34, rgb: true } },
      { name: '海盗船 复仇者 32GB DDR5 6000 RGB', price: 899, specs: '32GB(16×2) / DDR5 6000MHz / CL30 / RGB灯', score: 155000, tier: '高性能RGB双通道', shape: 'ram-stick-rgb', structuredSpecs: { type: 'DDR5', capacity: 32, speed: 6000, sticks: 2, cl: 30, rgb: true } },
      { name: '光威 天策Ⅱ 32GB DDR5 6400', price: 699, specs: '32GB(16×2) / DDR5 6400MHz / CL32 / 无灯 / 海力士A-Die', score: 150000, tier: '国产高频性价比', shape: 'ram-stick', structuredSpecs: { type: 'DDR5', capacity: 32, speed: 6400, sticks: 2, cl: 32, rgb: false } },
      { name: '金百达 黑刃 32GB DDR5 6800', price: 749, specs: '32GB(16×2) / DDR5 6800MHz / CL34 / 无灯 / 海力士A-Die', score: 160000, tier: '国产极速高频', shape: 'ram-stick', structuredSpecs: { type: 'DDR5', capacity: 32, speed: 6800, sticks: 2, cl: 34, rgb: false } },
      { name: '十铨 DELTA RGB 32GB DDR5 6000', price: 799, specs: '32GB(16×2) / DDR5 6000MHz / CL30 / RGB灯', score: 148000, tier: '台系高颜值RGB', shape: 'ram-stick-rgb', structuredSpecs: { type: 'DDR5', capacity: 32, speed: 6000, sticks: 2, cl: 30, rgb: true } },
      { name: '宏碁 Predator Vesta II 32GB DDR5 6400 RGB', price: 899, specs: '32GB(16×2) / DDR5 6400MHz / CL32 / RGB灯 / 海力士颗粒', score: 158000, tier: '宏碁高频RGB', shape: 'ram-stick-rgb', structuredSpecs: { type: 'DDR5', capacity: 32, speed: 6400, sticks: 2, cl: 32, rgb: true } },
      { name: '英睿达 Pro 48GB DDR5 5600', price: 1099, specs: '48GB(24×2) / DDR5 5600MHz / CL46 / 无灯 / 原厂颗粒', score: 150000, tier: '非标大容量', shape: 'ram-stick', structuredSpecs: { type: 'DDR5', capacity: 48, speed: 5600, sticks: 2, cl: 46, rgb: false } },
    ]
  },

  // ==================== 硬盘 ====================
  storage: {
    id: 'storage',
    name: '硬盘 Storage',
    icon: 'hard-drive',
    shortName: '硬盘',
    position: { top: '58%', left: '52%', width: '12%', height: '8%' },
    description: '硬盘是电脑的"仓库"，你的所有文件、游戏、照片都在里面。2026年装机强烈建议全固态（SSD），机械硬盘只适合存电影/备份。NVMe M.2 SSD是最主流的选择，指甲盖大小，速度是机械硬盘的100倍以上。',
    specs: [
      ['容量','1TB起步，游戏党建议2TB。系统盘+游戏盘分开更好'],
      ['类型','NVMe M.2（最快）> SATA SSD > 机械硬盘HDD（最慢）'],
      ['读取速度','顺序读取速度（MB/s），影响游戏加载和文件传输'],
      ['写入速度','顺序写入速度（MB/s），影响文件保存和大文件拷贝'],
      ['TBW','总写入寿命（TB），代表硬盘能用多久'],
      ['有无缓存','独立缓存能提高随机读写性能，高端盘才有'],
    ],
    knowledge: [
      {
        title: '一、SSD类型怎么选？',
        text: 'NVMe M.2 SSD：目前主流，插在主板的M.2接口上，速度2500-7450MB/s。PCIe 4.0是甜点，PCIe 5.0虽快但发热大且贵。\nSATA SSD：老式接口，速度约550MB/s，适合老电脑升级。\n机械硬盘HDD：速度最慢（约150MB/s），但每TB价格最便宜，适合做仓库盘。',
        example: '加载速度对比：从开机到桌面——NVMe SSD约8秒，SATA SSD约15秒，机械硬盘约40秒+\n游戏加载（如GTA5进游戏）：NVMe约20秒，机械硬盘要2分钟+'
      },
      {
        title: '二、容量选多大？',
        text: '512GB：仅够系统和2-3个大型游戏，不推荐。\n1TB：主流选择，装系统+5-8个大型游戏+日常文件足够。\n2TB：一步到位，不用纠结删什么游戏。\n4TB+：内容创作者/影视工作者。',
        example: '建议方案：1TB NVMe当系统盘+游戏盘（¥400-600），以后不够再加一块2TB。大多数主板有2个M.2接口，加硬盘很方便。'
      },
      {
        title: '三、选购SSD的注意事项',
        text: '1. 认准TLC颗粒！QLC颗粒寿命短、缓外写入慢。三星、海力士、致态、西部数据的中高端型号基本都是TLC。\n2. 国产致态（YMTC）TiPlus7100系列非常优秀，性能接近三星990 PRO，价格便宜不少。\n3. 不要买杂牌SSD！数据无价。品牌推荐：三星、西部数据、海力士、致态、铠侠。\n4. 系统盘建议选有独立缓存的型号（如三星990 PRO），日常使用体验更好。\n5. M.2接口分SATA和NVMe协议，买NVMe的！SATA M.2速度慢很多。'
      }
    ],
    options: [
      { name: '西部数据 SN770 1TB', price: 459, specs: '1TB / NVMe PCIe4.0 / 读5150MB/s / 写4900MB/s / 无缓存', score: 110000, tier: '高性价比', shape: 'ssd-m2', structuredSpecs: { type: 'NVMe', capacity: 1024, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 5150, writeSpeed: 4900, hasCache: false } },
      { name: '三星 990 EVO Plus 1TB', price: 549, specs: '1TB / NVMe PCIe4.0 / 读7250MB/s / 写6300MB/s / 无缓存', score: 130000, tier: '旗舰速度', shape: 'ssd-m2', structuredSpecs: { type: 'NVMe', capacity: 1024, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 7250, writeSpeed: 6300, hasCache: false } },
      { name: '致态 TiPlus7100 2TB', price: 899, specs: '2TB / NVMe PCIe4.0 / 读7000MB/s / 写6000MB/s / 无缓存', score: 140000, tier: '国产旗舰2TB', shape: 'ssd-m2', structuredSpecs: { type: 'NVMe', capacity: 2048, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 7000, writeSpeed: 6000, hasCache: false } },
      { name: '三星 990 PRO 2TB', price: 1299, specs: '2TB / NVMe PCIe4.0 / 读7450MB/s / 写6900MB/s / 独立缓存', score: 160000, tier: '顶级性能', shape: 'ssd-m2-premium', structuredSpecs: { type: 'NVMe', capacity: 2048, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 7450, writeSpeed: 6900, hasCache: true } },
      { name: '西部数据 SN850X 4TB', price: 2499, specs: '4TB / NVMe PCIe4.0 / 读7300MB/s / 写6600MB/s / 独立缓存', score: 180000, tier: '大容量旗舰', shape: 'ssd-m2-premium', structuredSpecs: { type: 'NVMe', capacity: 4096, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 7300, writeSpeed: 6600, hasCache: true } },
      { name: '三星 990 PRO 4TB', price: 3299, specs: '4TB / NVMe PCIe4.0 / 读7450MB/s / 写6900MB/s / 独立缓存', score: 200000, tier: '顶级4TB旗舰', shape: 'ssd-m2-premium', structuredSpecs: { type: 'NVMe', capacity: 4096, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 7450, writeSpeed: 6900, hasCache: true } },
      { name: '铠侠 EXCERIA Pro 1TB', price: 429, specs: '1TB / NVMe PCIe4.0 / 读7300MB/s / 写6400MB/s / 东芝原厂', score: 125000, tier: '原厂高性价比', shape: 'ssd-m2', structuredSpecs: { type: 'NVMe', capacity: 1024, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 7300, writeSpeed: 6400, hasCache: false } },
      { name: '海力士 P41 Platinum 1TB', price: 549, specs: '1TB / NVMe PCIe4.0 / 读7000MB/s / 写6500MB/s / 独立缓存', score: 135000, tier: '原厂旗舰', shape: 'ssd-m2-premium', structuredSpecs: { type: 'NVMe', capacity: 1024, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 7000, writeSpeed: 6500, hasCache: true } },
      { name: '梵想 S790 2TB', price: 699, specs: '2TB / NVMe PCIe4.0 / 读7450MB/s / 写6900MB/s / 国产芯片', score: 135000, tier: '国产大容量性价比', shape: 'ssd-m2', structuredSpecs: { type: 'NVMe', capacity: 2048, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 7450, writeSpeed: 6900, hasCache: false } },
      { name: '西部数据 SN850X 2TB', price: 1299, specs: '2TB / NVMe PCIe4.0 / 读7300MB/s / 写6600MB/s / 独立缓存', score: 160000, tier: '高性能游戏盘', shape: 'ssd-m2-premium', structuredSpecs: { type: 'NVMe', capacity: 2048, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 7300, writeSpeed: 6600, hasCache: true } },
      { name: '三星 870 EVO 2TB', price: 999, specs: '2TB / SATA 2.5寸 / 读560MB/s / 写530MB/s / 三星原厂', score: 80000, tier: 'SATA经典大容量', shape: 'ssd-sata', structuredSpecs: { type: 'SATA', capacity: 2048, interface: 'SATA', protocol: 'SATA3', readSpeed: 560, writeSpeed: 530, hasCache: true } },
      { name: '西部数据 SN580 1TB', price: 399, specs: '1TB / NVMe PCIe4.0 / 读4150MB/s / 写4150MB/s / 无缓存', score: 105000, tier: '入门PCIe4.0', shape: 'ssd-m2', structuredSpecs: { type: 'NVMe', capacity: 1024, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 4150, writeSpeed: 4150, hasCache: false } },
      { name: '西部数据 SN580 2TB', price: 749, specs: '2TB / NVMe PCIe4.0 / 读4150MB/s / 写4150MB/s / 无缓存', score: 120000, tier: '大容量入门4.0', shape: 'ssd-m2', structuredSpecs: { type: 'NVMe', capacity: 2048, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 4150, writeSpeed: 4150, hasCache: false } },
      { name: '西部数据 SN770 2TB', price: 899, specs: '2TB / NVMe PCIe4.0 / 读5150MB/s / 写4850MB/s / 无缓存', score: 130000, tier: '高性价比2TB', shape: 'ssd-m2', structuredSpecs: { type: 'NVMe', capacity: 2048, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 5150, writeSpeed: 4850, hasCache: false } },
      { name: '致态 Ti600 1TB', price: 429, specs: '1TB / NVMe PCIe4.0 / 读7000MB/s / 写6000MB/s / 国产原厂', score: 128000, tier: '国产旗舰速度', shape: 'ssd-m2', structuredSpecs: { type: 'NVMe', capacity: 1024, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 7000, writeSpeed: 6000, hasCache: false } },
      { name: '致态 TiPlus5000 1TB', price: 459, specs: '1TB / NVMe PCIe3.0 / 读3500MB/s / 写3100MB/s / 国产原厂', score: 115000, tier: '国产PCIe3.0旗舰', shape: 'ssd-m2', structuredSpecs: { type: 'NVMe', capacity: 1024, interface: 'M.2', protocol: 'PCIe 3.0', readSpeed: 3500, writeSpeed: 3100, hasCache: false } },
      { name: '致态 Ti600 2TB', price: 799, specs: '2TB / NVMe PCIe4.0 / 读7000MB/s / 写6000MB/s / 国产原厂', score: 138000, tier: '国产大容量旗舰', shape: 'ssd-m2', structuredSpecs: { type: 'NVMe', capacity: 2048, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 7000, writeSpeed: 6000, hasCache: false } },
      { name: '海力士 P41 Platinum 2TB', price: 1199, specs: '2TB / NVMe PCIe4.0 / 读7000MB/s / 写6500MB/s / 独立缓存', score: 155000, tier: '原厂旗舰2TB', shape: 'ssd-m2-premium', structuredSpecs: { type: 'NVMe', capacity: 2048, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 7000, writeSpeed: 6500, hasCache: true } },
      { name: '铠侠 EXCERIA G2 1TB', price: 389, specs: '1TB / NVMe PCIe3.0 / 读2100MB/s / 写1700MB/s / 东芝原厂', score: 100000, tier: '入门PCIe3.0原厂', shape: 'ssd-m2', structuredSpecs: { type: 'NVMe', capacity: 1024, interface: 'M.2', protocol: 'PCIe 3.0', readSpeed: 2100, writeSpeed: 1700, hasCache: false } },
      { name: '梵想 S500 Pro 2TB', price: 599, specs: '2TB / NVMe PCIe4.0 / 读7400MB/s / 写6700MB/s / 国产芯片', score: 130000, tier: '国产大容量性价比', shape: 'ssd-m2', structuredSpecs: { type: 'NVMe', capacity: 2048, interface: 'M.2', protocol: 'PCIe 4.0', readSpeed: 7400, writeSpeed: 6700, hasCache: false } },
    ]
  },

  // ==================== 电源 ====================
  psu: {
    id: 'psu',
    name: '电源 PSU',
    icon: 'plug-zap',
    shortName: '电源',
    position: { top: '62%', left: '20%', width: '18%', height: '14%' },
    description: '电源是整台电脑的"心脏"，把220V市电转换成各配件需要的低压直流电。电源是装机中最不能省钱的配件——劣质电源轻则死机重启，重则一波带走主板显卡，甚至起火。',
    specs: [
      ['额定功率','电源能持续输出的最大功率，单位瓦(W)。不是峰值功率！'],
      ['80PLUS认证','转换效率认证：白牌<铜牌<金牌<白金<钛金。金牌是甜点'],
      ['模组类型','非模组（线全固定）/ 半模组 / 全模组（线可全拆）'],
      ['+12V输出','最重要的参数，CPU和显卡都用+12V供电'],
      ['电容类型','日系电容>台系电容>国产电容，影响寿命和稳定性'],
      ['质保年限','5年起步，好电源10年保。质保期短=厂家自己都没信心'],
    ],
    knowledge: [
      {
        title: '一、功率选多大？',
        text: '公式：CPU满载功耗 + 显卡满载功耗 + 150W余量 = 建议最低功率\n\n常见配置参考：\ni5+4060 → 550W-650W\ni5+4070 Super → 650W-750W\ni7+4070 Ti Super → 750W-850W\ni9+4080/4090 → 850W-1000W+',
        example: '举个栗子：i5-14600KF（满载约180W）+ RTX 4070 Super（满载约220W）+ 其他配件约80W + 余量150W = 约630W，建议选650W或750W电源。\n电源不是越大越好——电源在50%-70%负载时转换效率最高。买太大浪费钱，买太小会过载保护。'
      },
      {
        title: '二、80PLUS认证是什么？',
        text: '80PLUS是电源转换效率的认证标准，代表电源把交流电转成直流电时的损耗率：\n白牌：80%效率（20%电能变成热浪费了）\n铜牌：82-85%效率\n金牌：87-90%效率（推荐，性价平衡）\n白金：90-92%效率\n钛金：92-94%效率（顶级，贵）',
        example: '金牌和白金牌的差价大约200-500元，按电费0.6元/度算，需要很多年才能回本。所以金牌是甜点选择，白金/钛金适合预算充足或24小时开机的用户。'
      },
      {
        title: '三、选购电源的注意事项',
        text: '1. 只买大品牌！推荐：海韵（品质标杆）、振华、长城、海盗船、安钛克。不要买杂牌/山寨电源！\n2. 全模组vs非模组：全模组贵100-200元但理线方便很多，机箱整洁。非模组线全固定，多余线材不好藏。\n3. 认准日系/台系主电容。劣质电容2-3年后鼓包漏液，电源就废了。\n4. 质保7年以上的电源基本闭眼买，厂家敢保这么久说明品质过硬。海韵部分型号10年保。\n5. ATX 3.0/3.1标准的新电源有原生12VHPWR接口，直连RTX 40系显卡，不用转接线更安全。'
      }
    ],
    options: [
      { name: '长城 G7 650W 金牌全模组', price: 499, specs: '650W / 80PLUS金牌 / 全模组 / 日系电容 / 7年保', score: 80000, tier: '主流性价比', shape: 'psu-standard', structuredSpecs: { wattage: 650, rating: '80PLUS Gold', modular: 'full', atxVersion: '3.0', has12VHPWR: false, warranty: 7 } },
      { name: '海韵 FOCUS GX-750 金牌', price: 749, specs: '750W / 80PLUS金牌 / 全模组 / 日系电容 / 10年保 / ATX3.0', score: 90000, tier: '品质标杆', shape: 'psu-premium', structuredSpecs: { wattage: 750, rating: '80PLUS Gold', modular: 'full', atxVersion: '3.0', has12VHPWR: true, warranty: 10 } },
      { name: '振华 LEADEX III 850W 金牌', price: 899, specs: '850W / 80PLUS金牌 / 全模组 / 日系电容 / 10年保', score: 95000, tier: '高配安心之选', shape: 'psu-premium', structuredSpecs: { wattage: 850, rating: '80PLUS Gold', modular: 'full', atxVersion: '2.4', has12VHPWR: false, warranty: 10 } },
      { name: '海韵 VERTEX GX-1000 金牌', price: 1399, specs: '1000W / 80PLUS金牌 / 全模组 / ATX3.0 / 12年保', score: 105000, tier: '旗舰级战未来', shape: 'psu-premium', structuredSpecs: { wattage: 1000, rating: '80PLUS Gold', modular: 'full', atxVersion: '3.0', has12VHPWR: true, warranty: 12 } },
      { name: '海韵 PRIME TX-1300 钛金', price: 3299, specs: '1300W / 80PLUS钛金 / 全模组 / 日系电容 / 12年保 / ATX3.0 / 12VHPWR', score: 130000, tier: '钛金旗舰', shape: 'psu-premium', structuredSpecs: { wattage: 1300, rating: '80PLUS Titanium', modular: 'full', atxVersion: '3.0', has12VHPWR: true, warranty: 12 } },
      { name: '海盗船 AX1600i 钛金', price: 4299, specs: '1600W / 80PLUS钛金 / 全模组 / 日系电容 / 10年保 / ATX3.0', score: 150000, tier: '顶级钛金', shape: 'psu-premium', structuredSpecs: { wattage: 1600, rating: '80PLUS Titanium', modular: 'full', atxVersion: '3.0', has12VHPWR: true, warranty: 10 } },
      { name: '安钛克 NE750 金牌全模组', price: 649, specs: '750W / 80PLUS金牌 / 全模组 / 日系电容 / 7年保', score: 85000, tier: '高性价比金牌', shape: 'psu-standard', structuredSpecs: { wattage: 750, rating: '80PLUS Gold', modular: 'full', atxVersion: '2.4', has12VHPWR: false, warranty: 7 } },
      { name: '酷冷至尊 V850 Gold V2 金牌', price: 799, specs: '850W / 80PLUS金牌 / 全模组 / 日系电容 / 10年保 / ATX3.0', score: 95000, tier: '品牌金牌', shape: 'psu-premium', structuredSpecs: { wattage: 850, rating: '80PLUS Gold', modular: 'full', atxVersion: '3.0', has12VHPWR: true, warranty: 10 } },
      { name: '先马 XP1200 白金全模组', price: 999, specs: '1200W / 80PLUS白金 / 全模组 / 日系电容 / 10年保 / ATX3.0', score: 115000, tier: '国产白金旗舰', shape: 'psu-premium', structuredSpecs: { wattage: 1200, rating: '80PLUS Platinum', modular: 'full', atxVersion: '3.0', has12VHPWR: true, warranty: 10 } },
      { name: '全汉 Hydro PTM X Pro 1000W', price: 1299, specs: '1000W / 80PLUS白金 / 全模组 / 日系电容 / 10年保 / ATX3.0', score: 110000, tier: '白金品质', shape: 'psu-premium', structuredSpecs: { wattage: 1000, rating: '80PLUS Platinum', modular: 'full', atxVersion: '3.0', has12VHPWR: true, warranty: 10 } },
      { name: '长城 G7 750W 金牌全模组', price: 599, specs: '750W / 80PLUS金牌 / 全模组 / 日系电容 / 7年保', score: 85000, tier: '国产金牌750W', shape: 'psu-standard', structuredSpecs: { wattage: 750, rating: '80PLUS Gold', modular: 'full', atxVersion: '2.4', has12VHPWR: false, warranty: 7 } },
      { name: '长城 GX850 金牌全模组', price: 699, specs: '850W / 80PLUS金牌 / 全模组 / 日系电容 / 7年保 / ATX3.0', score: 92000, tier: '国产金牌850W', shape: 'psu-premium', structuredSpecs: { wattage: 850, rating: '80PLUS Gold', modular: 'full', atxVersion: '3.0', has12VHPWR: true, warranty: 7 } },
      { name: '海韵 FOCUS GM-550 金牌半模组', price: 499, specs: '550W / 80PLUS金牌 / 半模组 / 日系电容 / 7年保', score: 75000, tier: '海韵入门金牌', shape: 'psu-standard', structuredSpecs: { wattage: 550, rating: '80PLUS Gold', modular: 'semi', atxVersion: '2.4', has12VHPWR: false, warranty: 7 } },
      { name: '海韵 FOCUS GX-850 金牌', price: 899, specs: '850W / 80PLUS金牌 / 全模组 / 日系电容 / 10年保 / ATX3.0', score: 98000, tier: '海韵金牌850W', shape: 'psu-premium', structuredSpecs: { wattage: 850, rating: '80PLUS Gold', modular: 'full', atxVersion: '3.0', has12VHPWR: true, warranty: 10 } },
      { name: '海韵 PRIME GX-1000 金牌', price: 1599, specs: '1000W / 80PLUS金牌 / 全模组 / 日系电容 / 12年保 / ATX3.0', score: 108000, tier: '海韵旗舰金牌', shape: 'psu-premium', structuredSpecs: { wattage: 1000, rating: '80PLUS Gold', modular: 'full', atxVersion: '3.0', has12VHPWR: true, warranty: 12 } },
      { name: '振华 LEADEX VII 750W 金牌', price: 799, specs: '750W / 80PLUS金牌 / 全模组 / 日系电容 / 10年保 / ATX3.0', score: 92000, tier: '振华品质750W', shape: 'psu-premium', structuredSpecs: { wattage: 750, rating: '80PLUS Gold', modular: 'full', atxVersion: '3.0', has12VHPWR: true, warranty: 10 } },
      { name: '振华 LEADEX VII 1000W 金牌', price: 1299, specs: '1000W / 80PLUS金牌 / 全模组 / 日系电容 / 10年保 / ATX3.0', score: 105000, tier: '振华旗舰金牌', shape: 'psu-premium', structuredSpecs: { wattage: 1000, rating: '80PLUS Gold', modular: 'full', atxVersion: '3.0', has12VHPWR: true, warranty: 10 } },
      { name: '安钛克 NE850 金牌全模组', price: 749, specs: '850W / 80PLUS金牌 / 全模组 / 日系电容 / 7年保 / ATX3.0', score: 93000, tier: '安钛克金牌850W', shape: 'psu-premium', structuredSpecs: { wattage: 850, rating: '80PLUS Gold', modular: 'full', atxVersion: '3.0', has12VHPWR: true, warranty: 7 } },
      { name: '海盗船 RM850e 金牌全模组', price: 849, specs: '850W / 80PLUS金牌 / 全模组 / 日系电容 / 7年保 / ATX3.0', score: 96000, tier: '海盗船金牌850W', shape: 'psu-premium', structuredSpecs: { wattage: 850, rating: '80PLUS Gold', modular: 'full', atxVersion: '3.0', has12VHPWR: true, warranty: 7 } },
      { name: '先马 黑洞 850W 金牌全模组', price: 649, specs: '850W / 80PLUS金牌 / 全模组 / 日系电容 / 10年保 / ATX3.0', score: 95000, tier: '国产旗舰850W', shape: 'psu-premium', structuredSpecs: { wattage: 850, rating: '80PLUS Gold', modular: 'full', atxVersion: '3.0', has12VHPWR: true, warranty: 10 } },
    ]
  },

  // ==================== CPU散热器 ====================
  cooler: {
    id: 'cooler',
    name: 'CPU散热器 Cooler',
    icon: 'fan',
    shortName: '散热器',
    position: { top: '14%', left: '40%', width: '16%', height: '10%' },
    description: 'CPU散热器负责给CPU降温。CPU在高负载时会产生大量热量，如果散热不够，CPU会自动降频保护（俗称"撞温度墙"），电脑就会变卡。散热器分风冷和水冷两大类。',
    specs: [
      ['类型','风冷（塔式/下压式）vs 水冷（一体式/分体式）'],
      ['解热功耗(TDP)','散热器最大能压住的CPU功耗，单位W'],
      ['风扇尺寸','12cm是主流，14cm更大风量，9cm是小机箱专用'],
      ['冷排尺寸','仅水冷：120/240/280/360mm，越大散热越强'],
      ['噪音(dB)','满载时风扇声音大小，≤30dB安静'],
      ['高度','风冷散热器总高度，必须小于机箱散热器限高'],
    ],
    knowledge: [
      {
        title: '一、风冷 vs 水冷 怎么选？',
        text: '风冷：通过金属鳍片+热管传导热量，风扇吹走热量。优点是便宜、耐用（基本不会坏）、安装简单。缺点是体积大，高端风冷可能挡内存。\n水冷（一体式/AIO）：通过液体循环带走热量，冷排+风扇散热。优点是散热强、颜值高、不挡内存。缺点是贵、有极低概率漏液（虽然现在很少见）、水泵有寿命（约5-6年）。',
        example: 'i3/i5/R5：百元级风冷完全够了（如利民PA120 SE ¥149）\ni7/R7：推荐双塔风冷或240水冷（¥200-500）\ni9/R9：建议280/360水冷（¥500-1000），高端CPU发热大户\n新手推荐风冷——不用担心漏液，安装也更简单。'
      },
      {
        title: '二、风冷散热器怎么选？',
        text: '看三个参数：热管数量（4-7根，越多越好）、鳍片面积（越大散热越好）、风扇质量和数量。\n单塔：一个散热塔+一个风扇，体积小，适合i5/R5级别。\n双塔：两个散热塔+两个风扇（或一个夹在中间），体积大但散热强，适合i7/i9。\n下压式：风扇水平吹向CPU，高度低，ITX小机箱专用。',
        example: '利民 PA120 SE（¥149）：双塔双风扇6热管，解热265W，百元价位能压i7。\n九州风神 阿萨辛4（¥499）：旗舰双塔风冷，解热300W+，性能和240水冷相当。\n注意：买风冷一定查机箱"散热器限高"参数！很多双塔风冷高度超过155mm，小机箱放不下。'
      },
      {
        title: '三、水冷散热器怎么选？',
        text: '120mm水冷：单风扇，散热能力约等于百元风冷，基本不推荐。\n240mm水冷（双风扇）：解热250-350W，适合i7/R7。\n360mm水冷（三风扇）：解热350W+，适合i9/R9超频。\n买水冷一定要确认机箱有相应的冷排安装位！',
        example: '水冷推荐：九州风神 冰堡垒 240（¥469）是入门水冷首选，ARGB颜值高，性能稳定。\n恩杰 Kraken系列（¥799起）带LCD屏幕，可以显示温度或自定义图案，颜值超高但不影响性能。\n水冷质保一般3-6年。过保后建议更换，水泵寿命到了可能导致散热失效。'
      }
    ],
    options: [
      { name: '利民 PA120 SE 双塔风冷', price: 149, specs: '双塔双风扇 / 6热管 / 解热265W / ≤25.6dB / 高度155mm', score: 50000, tier: '百元风冷之王', shape: 'cooler-air-dual', structuredSpecs: { type: 'air', height: 155, tdp: 265, fans: 2, noise: 25.6, radiatorSize: null } },
      { name: '九州风神 冰堡垒 240 水冷', price: 469, specs: '240mm一体水冷 / ARGB风扇 / 解热300W / ≤30dB', score: 65000, tier: '入门水冷高颜值', shape: 'cooler-aio-240', structuredSpecs: { type: 'aio', height: null, tdp: 300, fans: 2, noise: 30, radiatorSize: '240' } },
      { name: '九州风神 冰堡垒 360 水冷', price: 649, specs: '360mm一体水冷 / ARGB风扇 / 解热350W+ / ≤32dB', score: 72000, tier: '大冷排强劲散热', shape: 'cooler-aio-360', structuredSpecs: { type: 'aio', height: null, tdp: 350, fans: 3, noise: 32, radiatorSize: '360' } },
      { name: '恩杰 Kraken X53 240 RGB', price: 799, specs: '240mm一体水冷 / 1.54寸LCD屏幕 / 6年保 / Asetek7代泵', score: 75000, tier: '旗舰带屏幕', shape: 'cooler-aio-240-nzxt', structuredSpecs: { type: 'aio', height: null, tdp: 300, fans: 2, noise: 28, radiatorSize: '240' } },
      { name: '华硕 ROG RYUJIN III 360 ARGB', price: 1999, specs: '360mm一体水冷 / 3.5寸LCD屏幕 / Asetek8代泵 / ARGB风扇 / 6年保', score: 85000, tier: '旗舰水冷LCD', shape: 'cooler-aio-360', structuredSpecs: { type: 'aio', height: null, tdp: 400, fans: 3, noise: 32, radiatorSize: '360' } },
      { name: 'Corsair iCUE H170i 420', price: 2499, specs: '420mm超大冷排 / 3×14cm磁悬浮风扇 / iCUE灯效 / 5年保', score: 90000, tier: '420超大冷排', shape: 'cooler-aio-360', structuredSpecs: { type: 'aio', height: null, tdp: 450, fans: 3, noise: 30, radiatorSize: '420' } },
      { name: '猫头鹰 NH-D15 双塔风冷', price: 599, specs: '双塔双风扇 / 6热管 / 解热280W / ≤24.6dB / 高度165mm', score: 65000, tier: '风冷之王', shape: 'cooler-air-dual', structuredSpecs: { type: 'air', height: 165, tdp: 280, fans: 2, noise: 24.6, radiatorSize: null } },
      { name: '酷冷至尊 ML360L Core ARGB', price: 599, specs: '360mm一体水冷 / ARGB风扇 / 解热350W / ≤32dB', score: 70000, tier: '高性价比360', shape: 'cooler-aio-360', structuredSpecs: { type: 'aio', height: null, tdp: 350, fans: 3, noise: 32, radiatorSize: '360' } },
      { name: '海盗船 H150i iCUE LINK 360', price: 1699, specs: '360mm一体水冷 / iCUE灯效 / 磁吸风扇 / 5年保', score: 82000, tier: '海盗船旗舰360', shape: 'cooler-aio-360', structuredSpecs: { type: 'aio', height: null, tdp: 380, fans: 3, noise: 30, radiatorSize: '360' } },
      { name: '追风者 Glacier One 360', price: 999, specs: '360mm一体水冷 / ARGB风扇 / Asetek7代泵 / 5年保', score: 78000, tier: '追风者旗舰', shape: 'cooler-aio-360', structuredSpecs: { type: 'aio', height: null, tdp: 370, fans: 3, noise: 31, radiatorSize: '360' } },
      { name: '利民 FC140 双塔风冷', price: 249, specs: '双塔双风扇 / 5热管 / 解热280W / ≤25.6dB / 高度158mm', score: 55000, tier: '双塔风冷高配', shape: 'cooler-air-dual', structuredSpecs: { type: 'air', height: 158, tdp: 280, fans: 2, noise: 25.6, radiatorSize: null } },
      { name: '利民 AX120 R SE 单塔风冷', price: 69, specs: '单塔单风扇 / 4热管 / 解热180W / ≤25.6dB / 高度148mm', score: 38000, tier: '入门百元级风冷', shape: 'cooler-air', structuredSpecs: { type: 'air', height: 148, tdp: 180, fans: 1, noise: 25.6, radiatorSize: null } },
      { name: '利民 BA120 单塔风冷', price: 89, specs: '单塔单风扇 / 6热管 / 解热245W / ≤25.6dB / 高度154mm', score: 45000, tier: '超值6热管', shape: 'cooler-air', structuredSpecs: { type: 'air', height: 154, tdp: 245, fans: 1, noise: 25.6, radiatorSize: null } },
      { name: '九州风神 阿萨辛4S 双塔风冷', price: 459, specs: '双塔双风扇 / 7热管 / 解热300W / ≤29.3dB / 高度164mm', score: 68000, tier: '旗舰双塔风冷', shape: 'cooler-air-dual', structuredSpecs: { type: 'air', height: 164, tdp: 300, fans: 2, noise: 29.3, radiatorSize: null } },
      { name: '九州风神 大霜塔 双塔风冷', price: 199, specs: '双塔双风扇 / 6热管 / 解热260W / ≤29.4dB / 高度155mm', score: 52000, tier: '经典双塔风冷', shape: 'cooler-air-dual', structuredSpecs: { type: 'air', height: 155, tdp: 260, fans: 2, noise: 29.4, radiatorSize: null } },
      { name: '九州风神 AK620 双塔风冷', price: 269, specs: '双塔双风扇 / 6热管 / 解热280W / ≤28dB / 高度160mm', score: 58000, tier: '高性能双塔', shape: 'cooler-air-dual', structuredSpecs: { type: 'air', height: 160, tdp: 280, fans: 2, noise: 28, radiatorSize: null } },
      { name: '猫头鹰 NH-U12A 单塔风冷', price: 699, specs: '单塔双风扇 / 7热管 / 解热250W / ≤22.6dB / 高度158mm', score: 68000, tier: '猫头鹰旗舰单塔', shape: 'cooler-air', structuredSpecs: { type: 'air', height: 158, tdp: 250, fans: 2, noise: 22.6, radiatorSize: null } },
      { name: '猫头鹰 NH-D15S 双塔风冷', price: 549, specs: '双塔单风扇 / 6热管 / 解热270W / ≤24.6dB / 高度160mm', score: 65000, tier: '兼容性D15', shape: 'cooler-air-dual', structuredSpecs: { type: 'air', height: 160, tdp: 270, fans: 1, noise: 24.6, radiatorSize: null } },
      { name: '瓦尔基里 VK GL36 AMG 水冷', price: 799, specs: '360mm一体水冷 / ARGB风扇 / 解热380W+ / ≤32dB', score: 78000, tier: '国产性价比360', shape: 'cooler-aio-360', structuredSpecs: { type: 'aio', height: null, tdp: 380, fans: 3, noise: 32, radiatorSize: '360' } },
      { name: '瓦尔基里 VK C420 水冷', price: 1099, specs: '420mm一体水冷 / ARGB风扇 / 解热450W+ / ≤33dB / 4年保', score: 88000, tier: '超强420散热', shape: 'cooler-aio-360', structuredSpecs: { type: 'aio', height: null, tdp: 450, fans: 3, noise: 33, radiatorSize: '420' } },
    ]
  },

  // ==================== 散热风扇 ====================
  fan: {
    id: 'fan',
    name: '散热风扇 Case Fan',
    icon: 'wind',
    shortName: '风扇',
    position: { top: '50%', left: '5%', width: '90%', height: '10%' },
    description: '机箱散热风扇负责机箱内部的空气流通。合理的风道设计（前进后出、下进上出）能把CPU和显卡产生的热量快速排出机箱，让整机温度降低5-15°C。风扇是装机成本最低但效果最显著的散热升级手段。',
    specs: [
      ['尺寸','12cm是绝对主流，14cm风量更大更安静，9cm/8cm是ITX小机箱专用'],
      ['转速(RPM)','每分钟转数，800-2000RPM是主流范围，越高风量越大但噪音也大'],
      ['风量(CFM)','每分钟吹出多少立方英尺空气，≥50CFM算合格，≥70CFM算优秀'],
      ['风压(mmH₂O)','气流穿透力，冷排/密集防尘网需要高风压扇'],
      ['噪音(dB/A)','≤25dB几乎无声，25-30dB正常可接受，≥35dB吵'],
      ['轴承类型','油封便宜寿命短 / FDB/滚珠轴承安静长寿 / 磁悬浮顶级'],
      ['接口','3pin=电压调速 / 4pin=PWM精准调速 / ARGB=5V3针灯效控制'],
      ['灯效','无光 / 单色LED / ARGB可寻址（主板软件同步变色）'],
    ],
    knowledge: [
      {
        title: '一、进气 VS 排风 —— 风道怎么搭？',
        text: '机箱风道的基本原则：前进风、后出风、下进风、上出风（热空气自然上升）。\n进气扇（前/下）：负责把冷空气吸入机箱，装在防尘网后面。\n排气扇（后/上）：负责把机箱内热空气排出，装在机箱后方和顶部。\n进风量应略大于排风量（正压差），可以减少灰尘从缝隙进入。',
        example: '最经典的风道：前面3个进风扇 + 后面1个排风扇 + 顶部2个排风扇。\n举个栗子：你的机箱前面自带3个ARGB进风扇，后面没有风扇。此时只需要花几十块买1个12cm风扇装在后面排风，整机温度就能降5-8°C，性价比最高的散热升级。'
      },
      {
        title: '二、12cm VS 14cm —— 选多大？',
        text: '12cm是绝对主流，市售95%的风扇都是这个尺寸，兼容性最好，几乎所有机箱都支持。\n14cm风扇在同样转速下风量更大、噪音更低，但需要机箱有对应的安装位（大机箱才有）。\n9cm/8cm风扇用于ITX小机箱或特殊位置（如部分机箱的底部进风）。',
        example: '12cm推荐：ARCTIC P12 PWM（¥59）是海外公认的性价比之王，风量大噪音低。\n14cm推荐：ARCTIC P14 PWM（¥69）装在支持14cm位的前面，比12cm多30%风量。\n买之前一定要确认你的机箱风扇位支持什么尺寸！'
      },
      {
        title: '三、风量扇 VS 风压扇 —— 有什么区别？',
        text: '风量扇（Airflow）：扇叶宽大，转速不高但风量大，适合作为机箱的进风和排风扇（没有阻挡）。\n风压扇（Static Pressure）：扇叶窄多，转速高，气流穿透力强，适合吹冷排、吹硬盘笼等有阻碍的位置。\n大多数人只需要买风量扇就够了——进风和排风都用风量扇。只有装水冷冷排时才需要风压扇。',
        example: '举个栗子：你买了240水冷，冷排上的原装风扇就是风压扇。如果你想换个更好的，猫头鹰NF-A12x25（¥199）是顶级风压扇。\n但如果你只是往机箱后面加一个排风扇，不需要风压扇，利民TL-C12C（¥39）就完全够了。'
      },
      {
        title: '四、轴承 & 寿命 —— 便宜扇和贵扇差在哪？',
        text: '油封轴承（Sleeve）：最便宜（¥30以内），寿命1-2年，时间长了会嗡嗡响。\n来福轴承（Rifle）：油封的升级版，寿命3-5年，¥30-50价位常见。\nFDB液压轴承：安静长寿（5-10年），¥50-150价位主力。\n双滚珠轴承：轴承寿命最长（10年+），但噪音略大，工业扇和服务器扇常用。\n磁悬浮/SSO轴承：猫头鹰独家，安静+长寿，但贵（¥150+）。',
        example: 'ARCTIC P12（¥59）用的是FDB轴承，安静长寿，能用5年以上不吵。\n利民TL-C12C（¥39）用的是来福轴承，性价比高但2-3年后可能噪音变大。\n猫头鹰NF-A12x25（¥199）是磁悬浮轴承，保6年，基本用到你换电脑它还是静音的。'
      },
      {
        title: '五、RGB / ARGB —— 灯效怎么选？',
        text: '无光风扇：纯性能取向，不发光，最便宜也最安静（因为没有灯珠产生的微小噪音）。\n单色LED：发光但颜色固定，用3pin或大4D供电，不能调色。\nARGB（可寻址RGB）：5V 3针接口，接主板ARGB口，可以用华硕AURA/微星Mystic Light等软件控制颜色和动态效果。每个LED灯珠可以独立变色，能做出彩虹流光效果。\n注意：不要买12V 4针的普通RGB风扇（和ARGB不通用），现在基本淘汰了。',
        example: 'ARGB推荐：联力积木SL120（¥199）是RGB风扇天花板——可以磁吸拼接，一根线带3个风扇，灯效最美。\n性价比ARGB：酷冷至尊MF120 Halo（¥69）双面光环颜值高。\n无光推荐：ARCTIC P12 PST（¥59）纯黑无光性能扇。'
      }
    ],
    options: [
      { name: '利民 TL-C12C-S 黑色×3', price: 117, specs: '12cm / 1500RPM / 66CFM / ≤25.6dB / 来福轴承 / 4pin PWM', score: 15000, tier: '入门性价比', shape: 'fan', structuredSpecs: { size: 120, rpm: 1500, airflow: 66, pressure: 1.5, noise: 25.6, bearing: 'rifle', pwm: true, argb: false } },
      { name: 'ARCTIC P12 PWM PST ×3', price: 177, specs: '12cm / 1800RPM / 56CFM / ≤22.5dB / FDB轴承 / 4pin PWM', score: 22000, tier: '静音性能王', shape: 'fan', structuredSpecs: { size: 120, rpm: 1800, airflow: 56, pressure: 1.8, noise: 22.5, bearing: 'fdb', pwm: true, argb: false } },
      { name: '酷冷至尊 MF120 Halo ×3', price: 207, specs: '12cm / 1800RPM / 55CFM / ≤30dB/ ARGB双面光环 / 来福轴承', score: 20000, tier: 'ARGB高颜值', shape: 'fan', structuredSpecs: { size: 120, rpm: 1800, airflow: 55, pressure: 1.6, noise: 30, bearing: 'rifle', pwm: true, argb: true } },
      { name: '猫头鹰 NF-A12x25 PWM', price: 199, specs: '12cm / 2000RPM / 60CFM / ≤22.6dB / SSO磁悬浮轴承 / 6年保', score: 28000, tier: '顶级静音王', shape: 'fan', structuredSpecs: { size: 120, rpm: 2000, airflow: 60, pressure: 2.3, noise: 22.6, bearing: 'sso2', pwm: true, argb: false } },
      { name: '联力 积木SL120 V2 ×3', price: 597, specs: '12cm / 2000RPM / 64CFM / ≤29dB / ARGB磁吸拼接 / FDB轴承', score: 32000, tier: 'RGB天花板', shape: 'fan', structuredSpecs: { size: 120, rpm: 2000, airflow: 64, pressure: 2.5, noise: 29, bearing: 'fdb', pwm: true, argb: true } },
      { name: '追风者 D30 120 ×3', price: 357, specs: '12cm / 2000RPM / 64CFM / ≤31dB / ARGB 30mm厚扇 / FDB轴承', score: 26000, tier: '30mm厚扇大性能', shape: 'fan', structuredSpecs: { size: 120, rpm: 2000, airflow: 64, pressure: 2.8, noise: 31, bearing: 'fdb', pwm: true, argb: true } },
      { name: '利民 TL-C12CW-S 白色×3', price: 99, specs: '12cm / 1500RPM / 66CFM / ≤25.6dB / 白色 / 4pin PWM', score: 14000, tier: '入门白扇', shape: 'fan', structuredSpecs: { size: 120, rpm: 1500, airflow: 66, pressure: 1.5, noise: 25.6, bearing: 'rifle', pwm: true, argb: false } },
      { name: '猫头鹰 NF-A12x25 PWM 单把', price: 199, specs: '12cm / 2000RPM / 60CFM / ≤22.6dB / SSO轴承 / 6年保', score: 28000, tier: '静音王单把', shape: 'fan', structuredSpecs: { size: 120, rpm: 2000, airflow: 60, pressure: 2.3, noise: 22.6, bearing: 'sso2', pwm: true, argb: false } },
      { name: '联力 积木SL120 V2 单把', price: 199, specs: '12cm / 2000RPM / 64CFM / ARGB磁吸拼接 / FDB轴承', score: 32000, tier: 'RGB单把', shape: 'fan', structuredSpecs: { size: 120, rpm: 2000, airflow: 64, pressure: 2.5, noise: 29, bearing: 'fdb', pwm: true, argb: true } },
      { name: 'ARCTIC P14 PWM PST ×3', price: 177, specs: '14cm / 1700RPM / 72CFM / ≤23.5dB / FDB轴承 / 4pin PWM', score: 24000, tier: '14cm大风量套装', shape: 'fan', structuredSpecs: { size: 140, rpm: 1700, airflow: 72, pressure: 2.0, noise: 23.5, bearing: 'fdb', pwm: true, argb: false } },
      { name: '九州风神 MF120 GT ×3', price: 99, specs: '12cm / 1800RPM / 60CFM / ≤28dB / 液压轴承 / 4pin PWM ARGB', score: 16000, tier: '入门ARGB性价比', shape: 'fan', structuredSpecs: { size: 120, rpm: 1800, airflow: 60, pressure: 1.8, noise: 28, bearing: 'hydraulic', pwm: true, argb: true } },
      { name: 'NZXT F120 RGB ×3', price: 297, specs: '12cm / 1800RPM / 78CFM / ≤30dB / FDB轴承 / ARGB', score: 22000, tier: 'NZXT高颜值', shape: 'fan', structuredSpecs: { size: 120, rpm: 1800, airflow: 78, pressure: 2.5, noise: 30, bearing: 'fdb', pwm: true, argb: true } },
      { name: 'be quiet! Silent Wings Pro 4 120', price: 199, specs: '12cm / 3000RPM / 82CFM / ≤36.5dB / 6极马达 / FDB轴承', score: 26000, tier: '极致静音性能', shape: 'fan', structuredSpecs: { size: 120, rpm: 3000, airflow: 82, pressure: 3.2, noise: 36.5, bearing: 'fdb', pwm: true, argb: false } },
      { name: 'be quiet! Silent Wings Pro 4 140', price: 219, specs: '14cm / 2400RPM / 97CFM / ≤34.4dB / 6极马达 / FDB轴承', score: 28000, tier: '14cm静音王', shape: 'fan', structuredSpecs: { size: 140, rpm: 2400, airflow: 97, pressure: 3.0, noise: 34.4, bearing: 'fdb', pwm: true, argb: false } },
      { name: 'Corsair QL120 RGB ×3', price: 597, specs: '12cm / 1500RPM / 41CFM / ≤26dB / ARGB双面光环 / 磁悬浮', score: 25000, tier: '海盗船灯效旗舰', shape: 'fan', structuredSpecs: { size: 120, rpm: 1500, airflow: 41, pressure: 1.5, noise: 26, bearing: 'maglev', pwm: true, argb: true } },
      { name: '海盗船 AF120 RGB ELITE ×3', price: 297, specs: '12cm / 1850RPM / 59CFM / ≤31.5dB / ARGB / 来福轴承', score: 20000, tier: '海盗船ARGB入门', shape: 'fan', structuredSpecs: { size: 120, rpm: 1850, airflow: 59, pressure: 1.8, noise: 31.5, bearing: 'rifle', pwm: true, argb: true } },
      { name: '利民 TL-C12 Pro ×3', price: 147, specs: '12cm / 1850RPM / 78CFM / ≤25.6dB / FDB轴承 / 4pin PWM', score: 20000, tier: '利民性能扇', shape: 'fan', structuredSpecs: { size: 120, rpm: 1850, airflow: 78, pressure: 2.0, noise: 25.6, bearing: 'fdb', pwm: true, argb: false } },
      { name: '利民 TL-B12 ×3', price: 177, specs: '12cm / 2150RPM / 69CFM / ≤28.1dB / FDB轴承 / 4pin PWM / 风压扇', score: 22000, tier: '利民风压扇', shape: 'fan', structuredSpecs: { size: 120, rpm: 2150, airflow: 69, pressure: 2.8, noise: 28.1, bearing: 'fdb', pwm: true, argb: false } },
      { name: '猫头鹰 NF-A14 iPPC-2000 PWM', price: 229, specs: '14cm / 2000RPM / 107CFM / ≤31.5dB / SSO2轴承 / 工业级', score: 28000, tier: '猫头鹰工业扇', shape: 'fan', structuredSpecs: { size: 140, rpm: 2000, airflow: 107, pressure: 4.2, noise: 31.5, bearing: 'sso2', pwm: true, argb: false } },
    ]
  }
};

// 部件分类顺序
const componentOrder = ['case', 'cpu', 'gpu', 'motherboard', 'ram', 'storage', 'psu', 'cooler', 'fan'];

// ==================== 鲁大师跑分估算 ====================
function estimateLudashiScore(selectedComponents) {
  let totalScore = 0;
  let cpuScore = 0, gpuScore = 0, ramScore = 0, storageScore = 0, otherScore = 0;

  for (const [key, compId] of Object.entries(selectedComponents)) {
    const comp = pcComponents[key];
    if (!comp || !compId) continue;
    const option = comp.options.find(o => o.name === compId);
    if (!option) continue;

    totalScore += option.score || 0;
    if (key === 'cpu') cpuScore = option.score;
    else if (key === 'gpu') gpuScore = option.score;
    else if (key === 'ram') ramScore = option.score;
    else if (key === 'storage') storageScore = option.score;
    else otherScore += option.score || 0;
  }

  const totalWan = Math.round(totalScore / 10000);
  const cpuWan = Math.round(cpuScore / 10000);
  const gpuWan = Math.round(gpuScore / 10000);
  const ramWan = Math.round(ramScore / 10000);
  const diskWan = Math.round(storageScore / 10000);
  const otherWan = Math.round(otherScore / 10000);

  let level, comment;
  if (totalWan >= 200) { level = '旗舰级'; comment = '畅玩4K大作，专业生产力工具无压力！'; }
  else if (totalWan >= 150) { level = '高端级'; comment = '2K高画质通吃，3A大作流畅无比！'; }
  else if (totalWan >= 110) { level = '主流级'; comment = '1080P游戏无压力，日常办公影音飞起！'; }
  else if (totalWan >= 80) { level = '入门级'; comment = '轻度游戏办公，够用就好！'; }
  else { level = '基础级'; comment = '日常上网看剧，轻松应对。'; }

  return {
    totalWan, cpuWan, gpuWan, ramWan, diskWan, otherWan,
    level, comment,
    breakdown: `处理器 ${cpuWan}万分 | 显卡 ${gpuWan}万分 | 内存 ${ramWan}万分 | 硬盘 ${diskWan}万分 | 其他 ${otherWan}万分`
  };
}
