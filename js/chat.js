// ============================================================
// 装机大师 - 客服聊天悬浮窗口
// 自执行，只需在页面加一行 <script src="js/chat.js"></script>
// ============================================================
(function(){
  const STORAGE_KEY = 'pcBuilder_chatHistory';
  const MAX_IMG_BYTES = 400 * 1024; // 400KB per image for localStorage

  // ========== DOM 注入 ==========
  const fab = document.createElement('button');
  fab.className = 'chat-fab';
  fab.innerHTML = '<i data-lucide="headset" style="width:24px;height:24px;color:#d4af37;"></i>';
  fab.title = '咨询问题点我试试';
  document.body.appendChild(fab);
  // ========== 拖拽功能 ==========
  (function makeDraggable(el, storageKey) {
    var pos = { x: 0, y: 0 };
    try { var saved = JSON.parse(localStorage.getItem(storageKey)); if (saved) pos = saved; } catch(e) {}
    el.style.right = 'auto'; el.style.bottom = 'auto';
    el.style.left = pos.x + 'px'; el.style.top = pos.y + 'px';
    
    var startX, startY, startLeft, startTop, dragging = false;
    
    function onStart(e) {
      if (e.target.tagName === 'I' || e.target.tagName === 'svg' || e.target.tagName === 'path') return; // let icon clicks through
      dragging = false;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      startY = e.touches ? e.touches[0].clientY : e.clientY;
      startLeft = parseInt(el.style.left) || 0;
      startTop = parseInt(el.style.top) || 0;
      el.style.transition = 'none';
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchmove', onMove, {passive: false});
      document.addEventListener('touchend', onEnd);
      e.preventDefault();
    }
    
    function onMove(e) {
      var cx = e.touches ? e.touches[0].clientX : e.clientX;
      var cy = e.touches ? e.touches[0].clientY : e.clientY;
      var dx = cx - startX, dy = cy - startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragging = true;
      if (dragging) {
        var newLeft = Math.max(0, Math.min(window.innerWidth - 60, startLeft + dx));
        var newTop = Math.max(0, Math.min(window.innerHeight - 60, startTop + dy));
        el.style.left = newLeft + 'px';
        el.style.top = newTop + 'px';
      }
    }
    
    function onEnd() {
      el.style.transition = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
      if (dragging) {
        try { localStorage.setItem(storageKey, JSON.stringify({x: parseInt(el.style.left), y: parseInt(el.style.top)})); } catch(e) {}
      }
      // if not dragged, it was a click
      if (!dragging) {
        setTimeout(function() { el.dispatchEvent(new Event('click-no-drag')); }, 0);
      }
    }
    
    el.addEventListener('mousedown', onStart);
    el.addEventListener('touchstart', onStart, {passive: false});
  })(fab, 'pcBuilder_chatFabPos');


  // tooltip 气泡
  const tooltip = document.createElement('span');
  tooltip.className = 'chat-tooltip';
  tooltip.textContent = '咨询问题点我试试';
  fab.appendChild(tooltip);

  const panel = document.createElement('div');
  panel.className = 'chat-panel';
  panel.innerHTML = `
    <div class="chat-header">
      <span><i data-lucide="bot" class="icon-sm"></i> 装机助手</span>
      <button class="chat-close">✕</button>
    </div>
    <div class="chat-messages" id="chatMessages">
      <div class="chat-bubble chat-bubble-bot">
        <div class="chat-bubble-text">你好！装机大师在线客服为您服务<br>可以帮你：<br>· 估算装机预算<br>· 推荐配件搭配<br>· 解答硬件问题<br>· 旧机估价回收<br><br>输入<strong>「转人工」</strong>可转接真人客服<br>上传装机效果图可预估配置价格</div>
      </div>
    </div>
    <div class="chat-preview" id="chatPreview" style="display:none;">
      <img id="chatPreviewImg" src="" alt="预览">
      <button class="chat-preview-remove" id="chatPreviewRemove">✕</button>
    </div>
    <div class="chat-input-area">
      <input type="file" accept="image/*" id="chatFileInput" style="display:none;">
      <button class="chat-btn-upload" id="chatBtnUpload" title="上传图片"><i data-lucide="paperclip" style="width:16px;height:16px;"></i></button>
      <input type="text" class="chat-input" id="chatInput" placeholder="输入你的问题..." maxlength="500">
      <button class="chat-btn-send" id="chatBtnSend">发送</button>
    </div>
  `;
  document.body.appendChild(panel);

  // ========== 状态 ==========
  let open = false;
  let pendingImage = null;
  let chatHistory = [];

  // ========== 元素引用 ==========
  const messagesEl = document.getElementById('chatMessages');
  const inputEl = document.getElementById('chatInput');
  const fileInput = document.getElementById('chatFileInput');
  const previewEl = document.getElementById('chatPreview');
  const previewImg = document.getElementById('chatPreviewImg');
  const previewRemove = document.getElementById('chatPreviewRemove');

  // ========== 加载历史 ==========
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) { chatHistory = JSON.parse(raw); renderHistory(); }
  } catch(e) { chatHistory = []; }

  function saveHistory() {
    // 压縮图片以控制存储
    const compact = chatHistory.map(m => {
      if (m.image && m.image.length > MAX_IMG_BYTES) {
        return { role: m.role, text: m.text, image: null, imageLost: true, ts: m.ts };
      }
      return m;
    });
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(compact)); } catch(e) {}
  }

  function renderHistory() {
    // 移除历史气泡，保留第一条欢迎消息
    const bubbles = messagesEl.querySelectorAll('.chat-bubble');
    bubbles.forEach((b, i) => { if (i > 0) b.remove(); });
    for (const m of chatHistory) {
      if (m.role === 'user') addUserBubble(m.text, m.image, m.imageLost);
      else addBotBubble(m.text);
    }
    scrollBottom();
  }

  // ========== UI 方法 ==========
  function addUserBubble(text, imgSrc, imgLost) {
    const div = document.createElement('div');
    div.className = 'chat-bubble chat-bubble-user';
    let inner = `<div class="chat-bubble-text">${escapeHtml(text)}</div>`;
    if (imgSrc && !imgLost) {
      inner += `<img class="chat-img-thumb" src="${imgSrc}" alt="上传图片">`;
    } else if (imgLost) {
      inner += `<div class="chat-img-lost">📷 图片已过期（超过大小限制）</div>`;
    }
    div.innerHTML = inner;
    messagesEl.appendChild(div);
    scrollBottom();
  }

  function addBotBubble(text) {
    const div = document.createElement('div');
    div.className = 'chat-bubble chat-bubble-bot';
    div.innerHTML = `<div class="chat-bubble-text">${text.replace(/\n/g, '<br>')}</div>`;
    messagesEl.appendChild(div);
    scrollBottom();
  }

  function scrollBottom() {
    requestAnimationFrame(() => { messagesEl.scrollTop = messagesEl.scrollHeight; });
  }

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // ========== 模拟 AI 回复 ==========
  function simulateResponse(userMsg, hasImg) {
    const msg = userMsg.toLowerCase();

    if (hasImg) {
      const prices = [
        '根据图片中的装机风格，我估算类似配置大约需要 <strong>¥6,000 - ¥8,000</strong>（不含外设）。<br><br>具体取决于：<br>· 机箱品牌和材质<br>· RGB 风扇/水冷的品牌<br>· 显卡和CPU的级别<br><br>建议去 <a href="recommend.html" style="color:#fff;">一键推荐</a> 页面输入预算，立即生成完整配置单！',
        '看起来很不错！这种风格的装机预算大概在 <strong>¥5,000 - ¥10,000</strong> 之间。<br><br>如果你想要精确报价，可以把预算告诉我去 <a href="recommend.html" style="color:#fff;">一键推荐</a> 生成配置单哦~',
        '收到！图中这种效果的装机，预算参考：<br>· 入门版 ≈ ¥4,000-¥5,000<br>· 主流版 ≈ ¥6,000-¥8,000<br>· 高配版 ≈ ¥10,000+<br><br>你也可以在 <a href="recommend.html" style="color:#fff;">一键推荐</a> 输入你的预算，我来帮你精准匹配！'
      ];
      return prices[Math.floor(Math.random() * prices.length)];
    }

    if (msg.includes('预算') || msg.includes('价格') || msg.includes('多少钱') || msg.includes('费用')) {
      return '装机预算参考（2026年5月）：<br><br>· 📊 <strong>办公影音</strong>：¥3,000 - ¥5,000<br>· 🎮 <strong>轻度游戏</strong>：¥5,000 - ¥7,000<br>· 🎯 <strong>3A大作</strong>：¥8,000 - ¥12,000<br>· 🎬 <strong>视频剪辑</strong>：¥9,000 - ¥14,000<br>· 🤖 <strong>AI/3D创作</strong>：¥12,000 - ¥20,000+<br><br>告诉我去 <a href="recommend.html" style="color:#fff;">一键推荐</a> 页面，输入预算就能自动生成配置！';
    }
    if (msg.includes('显卡') || msg.includes('gpu') || msg.includes('rtx') || msg.includes('4060') || msg.includes('4070')) {
      return '显卡选购要点：<br><br>· 🎮 <strong>1080P游戏</strong>：RTX 4060 / RX 7600（¥2,000-¥3,000）<br>· 🎯 <strong>2K游戏</strong>：RTX 4070 Super / RX 7700 XT（¥3,500-¥5,000）<br>· 🚀 <strong>4K游戏</strong>：RTX 4080 Super / RX 7900 XTX（¥6,000-¥10,000）<br><br>注意：三风扇显卡长度可能超过33cm，买之前一定查机箱显卡限长！';
    }
    if (msg.includes('cpu') || msg.includes('处理器') || msg.includes('intel') || msg.includes('amd') || msg.includes('i5') || msg.includes('i7') || msg.includes('r5') || msg.includes('r7')) {
      return 'CPU选购建议：<br><br>· <strong>Intel</strong>：i5-14600K（¥1,699）中端游戏首选，i7-14700K（¥2,599）生产力利器<br>· <strong>AMD</strong>：R5 7500F（¥999）入门性价比之王，R7 7800X3D（¥2,499）游戏最强U<br><br>游戏用户推荐 AMD X3D 系列，生产力用户推荐 Intel 多核U。需要我去 <a href="index.html" style="color:#fff;">互动装机</a> 帮你选配件吗？';
    }
    if (msg.includes('主板') || msg.includes('b760') || msg.includes('b650') || msg.includes('z790')) {
      return '主板选购要点：<br><br>· Intel U → B760（性价比）或 Z790（可超频）主板<br>· AMD U → B650（性价比）或 X670（扩展强）主板<br>· 选主板先看CPU接口，再确认机箱支持的主板尺寸（ATX/M-ATX/ITX）<br><br>注意：Intel和AMD的主板不通用，买错了插不进去！';
    }
    if (msg.includes('机箱') || msg.includes('外观') || msg.includes('好看') || msg.includes('海景房')) {
      return '机箱推荐：<br><br>· 🖥️ <strong>海景房风格</strong>：追风者G360A（¥399）、联力LANCOOL 216（¥499）<br>· 🎨 <strong>简约风</strong>：恩杰H5 Flow（¥599）、分形工艺North（¥799）<br><br>选机箱注意三个参数：支持的主板尺寸、显卡限长、散热器限高！';
    }
    if (msg.includes('上门') || msg.includes('组装') || msg.includes('装机') || msg.includes('安装') || msg.includes('预约')) {
      return '我们提供三种上门装机服务：<br><br>· 🔧 <strong>基础装机</strong> ¥199（1小时快速装机）<br>· ⚡ <strong>高级装机</strong> ¥349（含系统安装+走线整理）<br>· 👑 <strong>尊享装机</strong> ¥599（全套调试+超频+定制灯效）<br><br>可以去 <a href="booking.html" style="color:#fff;">同城预约</a> 选择时间和区域下单！';
    }
    if (msg.includes('售后') || msg.includes('维修') || msg.includes('故障') || msg.includes('坏了') || msg.includes('清灰')) {
      return '如需售后维保：<br><br>· 🔧 硬件故障诊断维修<br>· 🧹 定期清灰保养<br>· ⬆️ 配置升级（加内存、换显卡等）<br><br>请去 <a href="support.html" style="color:#fff;">售后工单</a> 提交申请，我们会尽快安排师傅上门！';
    }
    if (msg.includes('转人工') || msg.includes('人工客服') || msg.includes('真人')) {
      return '正在为您转接人工客服...\n\n👤 <strong>客服小林</strong> 已接入对话\n\n您好！我是装机大师的客服专员，请问有什么可以帮您的？\n\n· 如需预约上门装机，请提供您的城市和联系方式\n· 如需售后维修，请描述具体故障现象\n· 如需咨询配置，请告诉我预算和用途\n\n客服在线时间：9:00 - 21:00';
    }
    if (msg.includes('旧机') || msg.includes('回收') || msg.includes('折价') || msg.includes('以旧换新') || msg.includes('trade')) {
      return '我们有旧机回收估价服务！<br><br>勾选你的旧机配件和成色，立即计算出回收价格。回收金可以直接抵扣新机费用。<br><br>去 <a href="trade-in.html" style="color:#fff;">旧机估价</a> 看看吧！';
    }
    return '感谢咨询！我是装机小助手，可以帮你：<br><br>· 💰 估算装机预算<br>· 🎮 推荐游戏/办公配置<br>· 🔧 解答硬件选购问题<br>· ♻️ 旧机回收估价<br><br>输入<strong>「转人工」</strong>转接真人客服<br>或上传装机效果图预估价格';
  }

  // ========== 发送消息 ==========
  function sendMessage() {
    const text = inputEl.value.trim();
    if (!text && !pendingImage) return;

    const displayText = text || '（图片）';
    const imgSrc = pendingImage;

    addUserBubble(displayText, imgSrc);
    chatHistory.push({ role: 'user', text: displayText, image: imgSrc, ts: Date.now() });

    inputEl.value = '';
    clearPreview();

    // 模拟打字延迟
    const delay = 600 + Math.random() * 1200;
    setTimeout(() => {
      const reply = simulateResponse(displayText, !!imgSrc);
      addBotBubble(reply);
      chatHistory.push({ role: 'bot', text: reply, ts: Date.now() });
      saveHistory();
    }, delay);
  }

  // ========== 图片处理 ==========
  function clearPreview() {
    pendingImage = null;
    previewEl.style.display = 'none';
    previewImg.src = '';
    fileInput.value = '';
  }

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('请选择图片文件'); return; }
    if (file.size > 2 * 1024 * 1024) { alert('图片不能超过 2MB'); return; }

    const reader = new FileReader();
    reader.onload = () => {
      pendingImage = reader.result;
      previewImg.src = pendingImage;
      previewEl.style.display = 'flex';
    };
    reader.readAsDataURL(file);
  });

  // ========== 事件绑定 ==========
  document.getElementById('chatBtnSend').addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
  document.getElementById('chatBtnUpload').addEventListener('click', () => fileInput.click());
  previewRemove.addEventListener('click', clearPreview);

  fab.addEventListener('click', () => {
    open = !open;
    panel.classList.toggle('chat-open', open);
    fab.style.display = open ? 'none' : 'flex';
    if (open) { inputEl.focus(); scrollBottom(); }
  });

  document.querySelector('.chat-close').addEventListener('click', () => {
    open = false;
    panel.classList.remove('chat-open');
    fab.style.display = 'flex';
    saveHistory();
  });

  // 点击聊天面板中的链接，关闭聊天
  messagesEl.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      open = false;
      panel.classList.remove('chat-open');
      fab.style.display = 'flex';
      saveHistory();
    }
  });
})();
