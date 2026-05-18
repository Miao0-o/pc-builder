// ============================================================
// 装机大师 - 售后维保工单 JS
// ============================================================
const STORAGE_KEY = 'pcBuilder_tickets';

const TYPE_NAMES = {
  repair: '硬件故障', clean: '清灰保养', upgrade: '配置升级', other: '其他问题'
};
const TYPE_ICONS = {
  repair: 'wrench', clean: 'spray-can', upgrade: 'arrow-up', other: 'layout-template'
};
const URGENCY_NAMES = { low: '低', mid: '中', high: '高' };
const URGENCY_COLORS = { low: '#66ff99', mid: '#ffcc66', high: '#ff6666' };

function initSupportPage() {
  // 设置最小日期
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('ticketDate').setAttribute('min', today);

  // 问题类型卡片
  document.querySelectorAll('.ticket-type-card input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.ticket-type-card').forEach(c => c.classList.remove('selected'));
      if (radio.checked) radio.closest('.ticket-type-card').classList.add('selected');
    });
  });

  // 紧急程度
  document.querySelectorAll('.urgency-opt input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.urgency-opt').forEach(c => c.classList.remove('selected'));
      if (radio.checked) radio.closest('.urgency-opt').classList.add('selected');
    });
  });

  document.getElementById('btnTicketSubmit').addEventListener('click', handleSubmit);
  renderTicketList();
}

function handleSubmit() {
  const msgEl = document.getElementById('ticketMsg');
  msgEl.className = 'form-msg';

  const type = document.querySelector('input[name="ticketType"]:checked');
  const urgency = document.querySelector('input[name="urgency"]:checked');
  const desc = document.getElementById('ticketDesc').value.trim();
  const date = document.getElementById('ticketDate').value;
  const time = document.getElementById('ticketTime').value;
  const name = document.getElementById('ticketName').value.trim();
  const phone = document.getElementById('ticketPhone').value.trim();

  if (!type) { showTicketMsg('请选择问题类型', 'error'); return; }
  if (!urgency) { showTicketMsg('请选择紧急程度', 'error'); return; }
  if (!desc || desc.length < 6) { showTicketMsg('问题描述至少6个字', 'error'); return; }
  if (!name) { showTicketMsg('请填写姓名', 'error'); return; }
  if (!phone || !/^1\d{10}$/.test(phone)) { showTicketMsg('请填写正确的手机号码', 'error'); return; }

  const ticket = {
    id: 'TK' + Date.now().toString(36).toUpperCase(),
    type: type.value,
    typeName: TYPE_NAMES[type.value],
    typeIcon: TYPE_ICONS[type.value],
    urgency: urgency.value,
    urgencyName: URGENCY_NAMES[urgency.value],
    description: desc,
    preferredDate: date || '不限',
    preferredTime: time || '不限',
    name, phone,
    status: '已提交',
    createdAt: new Date().toISOString()
  };

  let tickets = [];
  try { tickets = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch(e) {}
  tickets.unshift(ticket);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets)); } catch(e) {
    showTicketMsg('存储空间不足', 'error'); return;
  }

  showTicketMsg('工单提交成功！我们会尽快联系您', 'success');
  resetTicketForm();
  renderTicketList();
}

function resetTicketForm() {
  document.querySelectorAll('input[name="ticketType"]').forEach(r => r.checked = false);
  document.querySelectorAll('.ticket-type-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('input[name="urgency"]').forEach(r => r.checked = false);
  document.querySelectorAll('.urgency-opt').forEach(c => c.classList.remove('selected'));
  document.getElementById('ticketDesc').value = '';
  document.getElementById('ticketDate').value = '';
  document.getElementById('ticketTime').value = '';
  document.getElementById('ticketName').value = '';
  document.getElementById('ticketPhone').value = '';
}

function showTicketMsg(text, type) {
  const el = document.getElementById('ticketMsg');
  el.textContent = text;
  el.className = 'form-msg ' + type;
  if (type === 'success') setTimeout(() => { el.className = 'form-msg'; el.textContent = ''; }, 5000);
}

function renderTicketList() {
  const listEl = document.getElementById('ticketList');
  const countEl = document.getElementById('ticketCount');
  let tickets = [];
  try { tickets = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch(e) {}

  countEl.textContent = tickets.length;
  if (tickets.length === 0) {
    listEl.innerHTML = '<div class="booking-empty">暂无工单记录</div>';
    return;
  }

  listEl.innerHTML = tickets.map(t => `
    <div class="ticket-card">
      <div class="tc-header">
        <span class="tc-type">${t.typeIcon} ${t.typeName}</span>
        <span class="tc-status status-${t.status === '已提交' ? 'submitted' : t.status === '处理中' ? 'processing' : t.status === '已解决' ? 'resolved' : 'cancelled'}">${t.status}</span>
      </div>
      <div class="tc-desc">${escapeHtml(t.description).substring(0, 80)}${t.description.length > 80 ? '...' : ''}</div>
      <div class="tc-meta">
        <span>🕐 ${t.preferredDate} ${t.preferredTime}</span>
        <span style="color:${URGENCY_COLORS[t.urgency] || '#888'}">● ${t.urgencyName}紧急</span>
        <span>${new Date(t.createdAt).toLocaleDateString('zh-CN')}</span>
      </div>
      <div class="tc-actions">
        ${t.status === '已提交' ? `<button class="tc-cancel" onclick="cancelTicket('${t.id}')">取消工单</button>` : ''}
      </div>
    </div>
  `).join('');
}

function cancelTicket(id) {
  if (!confirm('确定要取消这个工单吗？')) return;
  let tickets = [];
  try { tickets = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch(e) {}
  const idx = tickets.findIndex(t => t.id === id);
  if (idx !== -1) tickets[idx].status = '已取消';
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  renderTicketList();
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

window.cancelTicket = cancelTicket;
document.addEventListener('DOMContentLoaded', initSupportPage);
