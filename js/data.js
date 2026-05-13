// ============================================================
// 台式电脑配件数据库 - 小白装机指南
// ============================================================

const pcComponents = {

  // ==================== 机箱 ====================
  case: {
    id: 'case',
    name: '机箱 Case',
    icon: '🖥️',
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
      { name: '鑫谷 无尽版 Pro 黑色', price: 199, specs: '中塔ATX / 显卡限长350mm / 侧透钢化玻璃 / SPCC板材0.6mm', score: 40000, tier: '百元性价比之王', shape: 'mid-tower-basic' },
      { name: '追风者 G360A 白色', price: 399, specs: '中塔ATX / 显卡限长380mm / 3×ARGB风扇预装 / 0.7mm板材', score: 55000, tier: '高颜值ARGB', shape: 'mid-tower-rgb' },
      { name: '联力 LANCOOL 216 黑色', price: 499, specs: '中塔ATX / 显卡限长392mm / 前2×16cm+后14cm风扇 / 0.8mm板材', score: 60000, tier: '500元散热王者', shape: 'mid-tower-premium' },
      { name: '恩杰 H5 Flow 黑色', price: 599, specs: '中塔ATX / 显卡限长365mm / 独特下置风扇位 / SECC板材', score: 62000, tier: '恩杰品质', shape: 'mid-tower-nzxt' }
    ]
  },

  // ==================== CPU ====================
  cpu: {
    id: 'cpu',
    name: 'CPU 中央处理器',
    icon: '🧠',
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
      { name: 'Intel 酷睿 i5-14600KF', price: 1699, specs: '14核20线程 / 最高5.3GHz / 24MB L3 / 125W / LGA1700', score: 280000, tier: '中端游戏首选', shape: 'cpu-intel' },
      { name: 'Intel 酷睿 i7-14700KF', price: 2599, specs: '20核28线程 / 最高5.6GHz / 33MB L3 / 125W / LGA1700', score: 380000, tier: '高端游戏+生产力', shape: 'cpu-intel' },
      { name: 'AMD 锐龙 R5 7600X', price: 1399, specs: '6核12线程 / 最高5.3GHz / 32MB L3 / 105W / AM5', score: 250000, tier: 'AMD性价比之选', shape: 'cpu-amd' },
      { name: 'AMD 锐龙 R7 7800X3D', price: 2899, specs: '8核16线程 / 96MB L3缓存 / 120W / AM5', score: 360000, tier: '游戏最强U', shape: 'cpu-amd' }
    ]
  },

  // ==================== GPU ====================
  gpu: {
    id: 'gpu',
    name: '显卡 GPU',
    icon: '🎮',
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
      { name: 'NVIDIA RTX 4060 8G', price: 2399, specs: '8GB GDDR6 / 3072 CUDA / 115W / 双风扇 / 支持DLSS3', score: 320000, tier: '1080P入门甜品', shape: 'gpu-dual' },
      { name: 'NVIDIA RTX 4060 Ti 8G', price: 3299, specs: '8GB GDDR6 / 4352 CUDA / 160W / 双/三风扇 / DLSS3', score: 380000, tier: '2K入门', shape: 'gpu-triple' },
      { name: 'NVIDIA RTX 4070 Super 12G', price: 4799, specs: '12GB GDDR6X / 7168 CUDA / 220W / 三风扇 / DLSS3', score: 520000, tier: '4K入门/2K高刷', shape: 'gpu-triple' },
      { name: 'AMD RX 7700 XT 12G', price: 2999, specs: '12GB GDDR6 / 3456流处理器 / 245W / 三风扇', score: 400000, tier: 'AMD性价比2K卡', shape: 'gpu-triple' }
    ]
  },

  // ==================== 主板 ====================
  motherboard: {
    id: 'motherboard',
    name: '主板 Motherboard',
    icon: '📋',
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
      { name: '微星 MAG B760M MORTAR WIFI', price: 1099, specs: 'B760 / LGA1700 / 4×DDR5 / 2×M.2 / M-ATX / WiFi6', score: 100000, tier: 'Intel热门中端板', shape: 'mb-matx' },
      { name: '华硕 TUF GAMING B760M-PLUS WIFI', price: 1299, specs: 'B760 / LGA1700 / 4×DDR5 / 2×M.2 / M-ATX / WiFi6', score: 105000, tier: '军规用料扎实', shape: 'mb-matx' },
      { name: '技嘉 B650M AORUS ELITE AX', price: 1199, specs: 'B650 / AM5 / 4×DDR5 / 2×M.2 / M-ATX / WiFi6E', score: 105000, tier: 'AMD中端标杆', shape: 'mb-matx' },
      { name: '微星 PRO Z790-P WIFI', price: 1699, specs: 'Z790 / LGA1700 / 4×DDR5 / 4×M.2 / ATX / WiFi6E', score: 120000, tier: 'Z790入门超频板', shape: 'mb-atx' }
    ]
  },

  // ==================== 内存 ====================
  ram: {
    id: 'ram',
    name: '内存 RAM',
    icon: '📏',
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
      { name: '金士顿 FURY Beast 16GB DDR5 6000', price: 449, specs: '16GB(16×1) / DDR5 6000MHz / CL36 / 无灯', score: 120000, tier: '入门DDR5', shape: 'ram-stick' },
      { name: '芝奇 幻锋戟 32GB DDR5 6000', price: 849, specs: '32GB(16×2) / DDR5 6000MHz / CL30 / RGB灯', score: 150000, tier: '高性能双通道RGB', shape: 'ram-stick-rgb' },
      { name: '海盗船 复仇者 32GB DDR5 6400', price: 999, specs: '32GB(16×2) / DDR5 6400MHz / CL32 / 无灯', score: 160000, tier: '极速高频条', shape: 'ram-stick' },
      { name: '金百达 银爵 32GB DDR5 6000', price: 699, specs: '32GB(16×2) / DDR5 6000MHz / CL30 / 无灯', score: 145000, tier: '国产性价比双通道', shape: 'ram-stick' }
    ]
  },

  // ==================== 硬盘 ====================
  storage: {
    id: 'storage',
    name: '硬盘 Storage',
    icon: '💾',
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
      { name: '西部数据 SN770 1TB', price: 459, specs: '1TB / NVMe PCIe4.0 / 读5150MB/s / 写4900MB/s / 无缓存', score: 110000, tier: '高性价比', shape: 'ssd-m2' },
      { name: '三星 990 EVO Plus 1TB', price: 549, specs: '1TB / NVMe PCIe4.0 / 读7250MB/s / 写6300MB/s / 无缓存', score: 130000, tier: '旗舰速度', shape: 'ssd-m2' },
      { name: '致态 TiPlus7100 2TB', price: 899, specs: '2TB / NVMe PCIe4.0 / 读7000MB/s / 写6000MB/s / 无缓存', score: 140000, tier: '国产旗舰2TB', shape: 'ssd-m2' },
      { name: '三星 990 PRO 2TB', price: 1299, specs: '2TB / NVMe PCIe4.0 / 读7450MB/s / 写6900MB/s / 独立缓存', score: 160000, tier: '顶级性能', shape: 'ssd-m2-premium' }
    ]
  },

  // ==================== 电源 ====================
  psu: {
    id: 'psu',
    name: '电源 PSU',
    icon: '🔌',
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
      { name: '长城 G7 650W 金牌全模组', price: 499, specs: '650W / 80PLUS金牌 / 全模组 / 日系电容 / 7年保', score: 80000, tier: '主流性价比', shape: 'psu-standard' },
      { name: '海韵 FOCUS GX-750 金牌', price: 749, specs: '750W / 80PLUS金牌 / 全模组 / 日系电容 / 10年保 / ATX3.0', score: 90000, tier: '品质标杆', shape: 'psu-premium' },
      { name: '振华 LEADEX III 850W 金牌', price: 899, specs: '850W / 80PLUS金牌 / 全模组 / 日系电容 / 10年保', score: 95000, tier: '高配安心之选', shape: 'psu-premium' },
      { name: '海韵 VERTEX GX-1000 金牌', price: 1399, specs: '1000W / 80PLUS金牌 / 全模组 / ATX3.0 / 12年保', score: 105000, tier: '旗舰级战未来', shape: 'psu-premium' }
    ]
  },

  // ==================== CPU散热器 ====================
  cooler: {
    id: 'cooler',
    name: 'CPU散热器 Cooler',
    icon: '❄️',
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
      { name: '利民 PA120 SE 双塔风冷', price: 149, specs: '双塔双风扇 / 6热管 / 解热265W / ≤25.6dB / 高度155mm', score: 50000, tier: '百元风冷之王', shape: 'cooler-air-dual' },
      { name: '九州风神 冰堡垒 240 水冷', price: 469, specs: '240mm一体水冷 / ARGB风扇 / 解热300W / ≤30dB', score: 65000, tier: '入门水冷高颜值', shape: 'cooler-aio-240' },
      { name: '九州风神 冰堡垒 360 水冷', price: 649, specs: '360mm一体水冷 / ARGB风扇 / 解热350W+ / ≤32dB', score: 72000, tier: '大冷排强劲散热', shape: 'cooler-aio-360' },
      { name: '恩杰 Kraken X53 240 RGB', price: 799, specs: '240mm一体水冷 / 1.54寸LCD屏幕 / 6年保 / Asetek7代泵', score: 75000, tier: '旗舰带屏幕', shape: 'cooler-aio-240-nzxt' }
    ]
  },

  // ==================== 散热风扇 ====================
  fan: {
    id: 'fan',
    name: '散热风扇 Case Fan',
    icon: '🌀',
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
      { name: '利民 TL-C12C-S 黑色×3', price: 117, specs: '12cm / 1500RPM / 66CFM / ≤25.6dB / 来福轴承 / 4pin PWM', score: 15000, tier: '入门性价比', shape: 'fan' },
      { name: 'ARCTIC P12 PWM PST ×3', price: 177, specs: '12cm / 1800RPM / 56CFM / ≤22.5dB / FDB轴承 / 4pin PWM', score: 22000, tier: '静音性能王', shape: 'fan' },
      { name: '酷冷至尊 MF120 Halo ×3', price: 207, specs: '12cm / 1800RPM / 55CFM / ≤30dB/ ARGB双面光环 / 来福轴承', score: 20000, tier: 'ARGB高颜值', shape: 'fan' },
      { name: '猫头鹰 NF-A12x25 PWM', price: 199, specs: '12cm / 2000RPM / 60CFM / ≤22.6dB / SSO磁悬浮轴承 / 6年保', score: 28000, tier: '顶级静音王', shape: 'fan' },
      { name: '联力 积木SL120 V2 ×3', price: 597, specs: '12cm / 2000RPM / 64CFM / ≤29dB / ARGB磁吸拼接 / FDB轴承', score: 32000, tier: 'RGB天花板', shape: 'fan' },
      { name: '追风者 D30 120 ×3', price: 357, specs: '12cm / 2000RPM / 64CFM / ≤31dB / ARGB 30mm厚扇 / FDB轴承', score: 26000, tier: '30mm厚扇大性能', shape: 'fan' }
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
