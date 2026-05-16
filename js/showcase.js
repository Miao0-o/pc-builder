// ============================================================
// 成品方案展示 — 10套精选配置
// ============================================================

const SHOWCASE_BUILDS = [
  {id:'s1',name:'入门办公机',tag:'office',tagName:'办公设计',budget:'3-5k',price:3899,score:85,level:'入门级',
    cpu:'Intel i3-14100F',gpu:'NVIDIA RTX 4060',
    ram:'金士顿 16GB DDR5',storage:'西部数据 SN770 1TB',
    parts:[
      {cat:'CPU',name:'Intel 酷睿 i5-14600KF',price:1699,icon:'cpu'},
      {cat:'显卡',name:'NVIDIA RTX 4060 8G',price:2399,icon:'gamepad-2'},
      {cat:'主板',name:'微星 MAG B760M MORTAR WIFI',price:1099,icon:'layout-template'},
      {cat:'内存',name:'金士顿 FURY Beast 16GB DDR5',price:449,icon:'memory-stick'},
      {cat:'硬盘',name:'西部数据 SN770 1TB',price:459,icon:'hard-drive'},
      {cat:'电源',name:'长城 G7 650W 金牌全模组',price:499,icon:'plug-zap'},
      {cat:'机箱',name:'鑫谷 无尽版 Pro 黑色',price:199,icon:'monitor'},
      {cat:'散热器',name:'利民 PA120 SE 双塔风冷',price:149,icon:'fan'}
    ]
  },
  {id:'s2',name:'性价比游戏机',tag:'gaming',tagName:'游戏电竞',budget:'5-8k',price:6299,score:130,level:'主流级',
    cpu:'Intel i5-14600KF',gpu:'NVIDIA RTX 4060 Ti',
    ram:'芝奇 32GB DDR5',storage:'西部数据 SN770 1TB',
    parts:[
      {cat:'CPU',name:'Intel 酷睿 i5-14600KF',price:1699,icon:'cpu'},
      {cat:'显卡',name:'NVIDIA RTX 4060 Ti 8G',price:3299,icon:'gamepad-2'},
      {cat:'主板',name:'微星 MAG B760M MORTAR WIFI',price:1099,icon:'layout-template'},
      {cat:'内存',name:'芝奇 幻锋戟 32GB DDR5 6000',price:849,icon:'memory-stick'},
      {cat:'硬盘',name:'西部数据 SN770 1TB',price:459,icon:'hard-drive'},
      {cat:'电源',name:'海韵 FOCUS GX-750 金牌',price:749,icon:'plug-zap'},
      {cat:'机箱',name:'追风者 G360A 白色',price:399,icon:'monitor'},
      {cat:'散热器',name:'利民 PA120 SE 双塔风冷',price:149,icon:'fan'}
    ]
  },
  {id:'s3',name:'2K游戏战神',tag:'gaming',tagName:'游戏电竞',budget:'8-12k',price:9499,score:180,level:'高端级',
    cpu:'Intel i5-14600KF',gpu:'NVIDIA RTX 4070 Super',
    ram:'芝奇 32GB DDR5',storage:'致态 TiPlus7100 2TB',
    parts:[
      {cat:'CPU',name:'Intel 酷睿 i5-14600KF',price:1699,icon:'cpu'},
      {cat:'显卡',name:'NVIDIA RTX 4070 Super 12G',price:4799,icon:'gamepad-2'},
      {cat:'主板',name:'华硕 TUF GAMING B760M-PLUS WIFI',price:1299,icon:'layout-template'},
      {cat:'内存',name:'芝奇 幻锋戟 32GB DDR5 6000',price:849,icon:'memory-stick'},
      {cat:'硬盘',name:'致态 TiPlus7100 2TB',price:899,icon:'hard-drive'},
      {cat:'电源',name:'海韵 FOCUS GX-750 金牌',price:749,icon:'plug-zap'},
      {cat:'机箱',name:'联力 LANCOOL 216 黑色',price:499,icon:'monitor'},
      {cat:'散热器',name:'九州风神 冰堡垒 240 水冷',price:469,icon:'fan'}
    ]
  },
  {id:'s4',name:'4K电竞旗舰',tag:'gaming',tagName:'游戏电竞',budget:'12k+',price:14999,score:240,level:'旗舰级',
    cpu:'Intel i7-14700KF',gpu:'NVIDIA RTX 4080 Super',
    ram:'海盗船 32GB DDR5',storage:'三星 990 PRO 2TB',
    parts:[
      {cat:'CPU',name:'Intel 酷睿 i7-14700KF',price:2599,icon:'cpu'},
      {cat:'显卡',name:'NVIDIA RTX 4070 Super 12G',price:4799,icon:'gamepad-2'},
      {cat:'主板',name:'微星 PRO Z790-P WIFI',price:1699,icon:'layout-template'},
      {cat:'内存',name:'海盗船 复仇者 32GB DDR5 6400',price:999,icon:'memory-stick'},
      {cat:'硬盘',name:'三星 990 PRO 2TB',price:1299,icon:'hard-drive'},
      {cat:'电源',name:'振华 LEADEX III 850W 金牌',price:899,icon:'plug-zap'},
      {cat:'机箱',name:'恩杰 H5 Flow 黑色',price:599,icon:'monitor'},
      {cat:'散热器',name:'九州风神 冰堡垒 360 水冷',price:649,icon:'fan'}
    ]
  },
  {id:'s5',name:'AI创作工作站',tag:'ai',tagName:'AI创作',budget:'12k+',price:16899,score:260,level:'旗舰级',
    cpu:'Intel i7-14700KF',gpu:'NVIDIA RTX 4080',
    ram:'64GB DDR5',storage:'三星 990 PRO 2TB',
    parts:[
      {cat:'CPU',name:'Intel 酷睿 i7-14700KF',price:2599,icon:'cpu'},
      {cat:'显卡',name:'NVIDIA RTX 4070 Super 12G',price:4799,icon:'gamepad-2'},
      {cat:'主板',name:'微星 PRO Z790-P WIFI',price:1699,icon:'layout-template'},
      {cat:'内存',name:'芝奇 幻锋戟 32GB DDR5 6000',price:849,icon:'memory-stick'},
      {cat:'硬盘',name:'三星 990 PRO 2TB',price:1299,icon:'hard-drive'},
      {cat:'电源',name:'海韵 VERTEX GX-1000 金牌',price:1399,icon:'plug-zap'},
      {cat:'机箱',name:'联力 LANCOOL 216 黑色',price:499,icon:'monitor'},
      {cat:'散热器',name:'九州风神 冰堡垒 360 水冷',price:649,icon:'fan'}
    ]
  },
  {id:'s6',name:'AMD性价比王',tag:'gaming',tagName:'游戏电竞',budget:'5-8k',price:5499,score:125,level:'主流级',
    cpu:'AMD R5 7600X',gpu:'AMD RX 7700 XT',
    ram:'金百达 32GB DDR5',storage:'西部数据 SN770 1TB',
    parts:[
      {cat:'CPU',name:'AMD 锐龙 R5 7600X',price:1399,icon:'cpu'},
      {cat:'显卡',name:'AMD RX 7700 XT 12G',price:2999,icon:'gamepad-2'},
      {cat:'主板',name:'技嘉 B650M AORUS ELITE AX',price:1199,icon:'layout-template'},
      {cat:'内存',name:'金百达 银爵 32GB DDR5 6000',price:699,icon:'memory-stick'},
      {cat:'硬盘',name:'西部数据 SN770 1TB',price:459,icon:'hard-drive'},
      {cat:'电源',name:'海韵 FOCUS GX-750 金牌',price:749,icon:'plug-zap'},
      {cat:'机箱',name:'鑫谷 无尽版 Pro 黑色',price:199,icon:'monitor'},
      {cat:'散热器',name:'利民 PA120 SE 双塔风冷',price:149,icon:'fan'}
    ]
  },
  {id:'s7',name:'视频剪辑利器',tag:'office',tagName:'办公设计',budget:'12k+',price:12899,score:210,level:'旗舰级',
    cpu:'Intel i7-14700KF',gpu:'NVIDIA RTX 4070 Ti Super',
    ram:'64GB DDR5',storage:'致态 TiPlus7100 2TB',
    parts:[
      {cat:'CPU',name:'Intel 酷睿 i7-14700KF',price:2599,icon:'cpu'},
      {cat:'显卡',name:'NVIDIA RTX 4070 Super 12G',price:4799,icon:'gamepad-2'},
      {cat:'主板',name:'微星 PRO Z790-P WIFI',price:1699,icon:'layout-template'},
      {cat:'内存',name:'海盗船 复仇者 32GB DDR5 6400',price:999,icon:'memory-stick'},
      {cat:'硬盘',name:'致态 TiPlus7100 2TB',price:899,icon:'hard-drive'},
      {cat:'电源',name:'振华 LEADEX III 850W 金牌',price:899,icon:'plug-zap'},
      {cat:'机箱',name:'联力 LANCOOL 216 黑色',price:499,icon:'monitor'},
      {cat:'散热器',name:'九州风神 冰堡垒 360 水冷',price:649,icon:'fan'}
    ]
  },
  {id:'s8',name:'入门电竞',tag:'gaming',tagName:'游戏电竞',budget:'3-5k',price:4999,score:110,level:'主流级',
    cpu:'AMD R5 7600X',gpu:'NVIDIA RTX 4060',
    ram:'金士顿 32GB DDR5',storage:'西部数据 SN770 1TB',
    parts:[
      {cat:'CPU',name:'AMD 锐龙 R5 7600X',price:1399,icon:'cpu'},
      {cat:'显卡',name:'NVIDIA RTX 4060 8G',price:2399,icon:'gamepad-2'},
      {cat:'主板',name:'技嘉 B650M AORUS ELITE AX',price:1199,icon:'layout-template'},
      {cat:'内存',name:'金士顿 FURY Beast 16GB DDR5',price:449,icon:'memory-stick'},
      {cat:'硬盘',name:'西部数据 SN770 1TB',price:459,icon:'hard-drive'},
      {cat:'电源',name:'长城 G7 650W 金牌全模组',price:499,icon:'plug-zap'},
      {cat:'机箱',name:'鑫谷 无尽版 Pro 黑色',price:199,icon:'monitor'},
      {cat:'散热器',name:'利民 PA120 SE 双塔风冷',price:149,icon:'fan'}
    ]
  },
  {id:'s9',name:'专业渲染站',tag:'ai',tagName:'AI创作',budget:'12k+',price:22999,score:300,level:'旗舰级',
    cpu:'Intel i9-14900K',gpu:'NVIDIA RTX 4090',
    ram:'64GB DDR5',storage:'三星 990 PRO 2TB',
    parts:[
      {cat:'CPU',name:'Intel 酷睿 i7-14700KF',price:2599,icon:'cpu'},
      {cat:'显卡',name:'NVIDIA RTX 4070 Super 12G',price:4799,icon:'gamepad-2'},
      {cat:'主板',name:'微星 PRO Z790-P WIFI',price:1699,icon:'layout-template'},
      {cat:'内存',name:'海盗船 复仇者 32GB DDR5 6400',price:999,icon:'memory-stick'},
      {cat:'硬盘',name:'三星 990 PRO 2TB',price:1299,icon:'hard-drive'},
      {cat:'电源',name:'海韵 VERTEX GX-1000 金牌',price:1399,icon:'plug-zap'},
      {cat:'机箱',name:'联力 LANCOOL 216 黑色',price:499,icon:'monitor'},
      {cat:'散热器',name:'九州风神 冰堡垒 360 水冷',price:649,icon:'fan'}
    ]
  },
  {id:'s10',name:'办公影音轻装机',tag:'office',tagName:'办公设计',budget:'3-5k',price:3299,score:75,level:'入门级',
    cpu:'Intel i5-14600KF',gpu:'核显',
    ram:'16GB DDR5',storage:'西部数据 SN770 1TB',
    parts:[
      {cat:'CPU',name:'Intel 酷睿 i5-14600KF',price:1699,icon:'cpu'},
      {cat:'显卡',name:'核显',price:0,icon:'gamepad-2'},
      {cat:'主板',name:'微星 MAG B760M MORTAR WIFI',price:1099,icon:'layout-template'},
      {cat:'内存',name:'金士顿 FURY Beast 16GB DDR5',price:449,icon:'memory-stick'},
      {cat:'硬盘',name:'西部数据 SN770 1TB',price:459,icon:'hard-drive'},
      {cat:'电源',name:'长城 G7 650W 金牌全模组',price:499,icon:'plug-zap'},
      {cat:'机箱',name:'鑫谷 无尽版 Pro 黑色',price:199,icon:'monitor'},
      {cat:'散热器',name:'利民 PA120 SE 双塔风冷',price:149,icon:'fan'}
    ]
  }
];

function initShowcase() {
  var grid = document.getElementById('showcaseGrid');
  if (!grid) return;
  renderCards(SHOWCASE_BUILDS);

  var chips = document.querySelectorAll('#showcaseFilters .filter-chip');
  for (var i = 0; i < chips.length; i++) {
    chips[i].addEventListener('click', function() {
      var parent = this.parentElement;
      var siblings = parent.querySelectorAll('.filter-chip');
      for (var j = 0; j < siblings.length; j++) siblings[j].classList.remove('active');
      this.classList.add('active');
      applyFilters();
    });
  }
}

function applyFilters() {
  var budget = getActiveFilter('budget');
  var usage = getActiveFilter('usage');
  var filtered = SHOWCASE_BUILDS.filter(function(b) {
    return (budget === 'all' || b.budget === budget) &&
           (usage === 'all' || b.tag === usage);
  });
  renderCards(filtered);
}

function getActiveFilter(type) {
  var active = document.querySelector('#showcaseFilters .filter-chip.active[data-' + type + ']');
  return active ? active.getAttribute('data-' + type) : 'all';
}

function renderCards(builds) {
  var grid = document.getElementById('showcaseGrid');
  if (!grid) return;
  grid.innerHTML = '';

  for (var i = 0; i < builds.length; i++) {
    var build = builds[i];
    var card = document.createElement('div');
    card.className = 'showcase-card';
    card.setAttribute('data-budget', build.budget);
    card.setAttribute('data-usage', build.tag);

    var partsHTML = '';
    for (var j = 0; j < build.parts.length; j++) {
      var p = build.parts[j];
      partsHTML += '<div class="sc-part-row"><span class="pname"><i data-lucide="' + p.icon + '" class="icon-sm"></i> ' + p.name + '</span><span class="pprice">' + (p.price > 0 ? '¥' + p.price.toLocaleString() : '—') + '</span></div>';
    }

    var buyHTML = '';
    for (var k = 0; k < Math.min(build.parts.length, 4); k++) {
      var pk = build.parts[k];
      if (pk.price > 0) {
        buyHTML += '<a href="https://search.jd.com/Search?keyword=' + encodeURIComponent(pk.name) + '&enc=utf-8" target="_blank" class="sc-buy-link">' + pk.name.substring(0, 8) + '...</a>';
      }
    }

    card.innerHTML = '<div class="sc-name">' + build.name + '</div>' +
      '<span class="sc-tag ' + build.tag + '">' + build.tagName + '</span>' +
      '<div class="sc-specs">' + build.cpu + ' + ' + build.gpu + '<br>' + build.ram + ' · ' + build.storage + '</div>' +
      '<div class="sc-price">¥' + build.price.toLocaleString() + '</div>' +
      '<div class="sc-score">预估 ' + build.score + '万分 · ' + build.level + '</div>' +
      '<div class="sc-actions">' +
        '<button class="sc-btn-detail" onclick="var p=this.parentElement.parentElement.querySelector(\'.sc-parts-expand\');p.classList.toggle(\'open\');this.textContent=p.classList.contains(\'open\')?\'收起\':\'查看配置详情\';if(typeof lucide!==\'undefined\')lucide.createIcons();">查看配置详情</button>' +
        '<button class="sc-btn-cart" onclick="event.stopPropagation();window._scParts=window._scParts||{};window._scParts[' + JSON.stringify(build.id) + ']=' + JSON.stringify(build.parts) + ';var ps=window._scParts[' + JSON.stringify(build.id) + '];for(var i=0;i<ps.length;i++){if(ps[i].price>0&&typeof cartAdd!==\'undefined\')cartAdd(ps[i].name,ps[i].price,ps[i].icon,ps[i].cat);}">加入购物车</button>' +
        '<button class="sc-btn-buy" onclick="localStorage.setItem(\'pcBuilder_showcaseBuy\',JSON.stringify({name:\'' + build.name.replace(/'/g,"\\'") + '\',price:' + build.price + ',parts:' + JSON.stringify(build.parts) + '}));window.location.href=\'service.html?from=cart\'">立即购买</button>' +
      '</div>' +
      '<div class="sc-parts-expand">' + partsHTML +
        '<div class="sc-buy-links">' + buyHTML + '</div>' +
      '</div>';

    grid.appendChild(card);
  }

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', initShowcase);
