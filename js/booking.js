// ============================================================
// 装机大师 - 同城预约 JS
// ============================================================
const STORAGE_KEY = 'pcBuilder_bookings';

// 城市/区域数据
const CITY_DATA = [
  { name: '北京', districts: ['朝阳区','海淀区','丰台区','东城区','西城区','通州区','大兴区','石景山区','昌平区','顺义区'] },
  { name: '上海', districts: ['浦东新区','徐汇区','长宁区','静安区','黄浦区','杨浦区','闵行区','普陀区','宝山区','松江区'] },
  { name: '广州', districts: ['天河区','海珠区','越秀区','番禺区','白云区','荔湾区','黄埔区','花都区'] },
  { name: '深圳', districts: ['南山区','福田区','罗湖区','宝安区','龙岗区','龙华区','光明区','坪山区'] },
  { name: '杭州', districts: ['西湖区','拱墅区','上城区','滨江区','余杭区','萧山区','临平区','钱塘区'] },
  { name: '成都', districts: ['武侯区','锦江区','青羊区','金牛区','成华区','高新区','天府新区','双流区'] },
  { name: '武汉', districts: ['武昌区','洪山区','江岸区','江汉区','硚口区','汉阳区','青山区','东西湖区'] },
  { name: '南京', districts: ['鼓楼区','玄武区','秦淮区','建邺区','栖霞区','雨花台区','江宁区','浦口区'] },
  { name: '重庆', districts: ['渝中区','江北区','南岸区','沙坪坝区','九龙坡区','渝北区','巴南区','北碚区'] },
  { name: '天津', districts: ['和平区','南开区','河西区','河东区','河北区','红桥区','滨海新区','西青区'] },
  { name: '苏州', districts: ['姑苏区','虎丘区','吴中区','相城区','吴江区','工业园区'] },
  { name: '西安', districts: ['雁塔区','碑林区','未央区','莲湖区','新城区','长安区','灞桥区'] },
  { name: '长沙', districts: ['岳麓区','芙蓉区','天心区','开福区','雨花区','望城区'] },
  { name: '郑州', districts: ['金水区','二七区','中原区','管城区','惠济区','郑东新区'] },
  { name: '合肥', districts: ['蜀山区','包河区','庐阳区','瑶海区','滨湖新区'] },
  { name: '厦门', districts: ['思明区','湖里区','集美区','海沧区','同安区','翔安区'] },
  { name: '福州', districts: ['鼓楼区','台江区','仓山区','晋安区','马尾区'] },
  { name: '青岛', districts: ['市南区','市北区','李沧区','崂山区','城阳区','黄岛区'] },
  { name: '大连', districts: ['中山区','西岗区','沙河口区','甘井子区','高新园区'] },
  { name: '济南', districts: ['历下区','市中区','槐荫区','天桥区','历城区'] },
];

function initBookingPage() {
  buildCitySelector();

  // 设置最小日期为今天
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('bookingDate').setAttribute('min', today);

  // 服务类型卡片点击
  document.querySelectorAll('.type-card input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
      if (radio.checked) radio.closest('.type-card').classList.add('selected');
    });
  });

  // 时间段选择
  document.querySelectorAll('.time-slot').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.time-slot').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.getElementById('btnSubmit').addEventListener('click', handleSubmit);
  renderBookingHistory();
}

function buildCitySelector() {
  const citySelect = document.getElementById('citySelect');
  const districtSelect = document.getElementById('districtSelect');

  citySelect.addEventListener('change', () => {
    const city = CITY_DATA.find(c => c.name === citySelect.value);
    districtSelect.innerHTML = '<option value="">请选择区域</option>';
    districtSelect.disabled = !city;
    if (city) {
      city.districts.forEach(d => {
        districtSelect.innerHTML += `<option value="${d}">${d}</option>`;
      });
    }
  });
}

function handleSubmit() {
  const msgEl = document.getElementById('formMsg');
  msgEl.className = 'form-msg';

  // 验证
  const city = document.getElementById('citySelect').value;
  const district = document.getElementById('districtSelect').value;
  const serviceType = document.querySelector('input[name="serviceType"]:checked');
  const date = document.getElementById('bookingDate').value;
  const timeSlot = document.querySelector('.time-slot.active');
  const name = document.getElementById('bookingName').value.trim();
  const phone = document.getElementById('bookingPhone').value.trim();
  const address = document.getElementById('bookingAddress').value.trim();

  if (!city) { showMsg('请选择城市', 'error'); return; }
  if (!district) { showMsg('请选择区域', 'error'); return; }
  if (!serviceType) { showMsg('请选择服务类型', 'error'); return; }
  if (!date) { showMsg('请选择预约日期', 'error'); return; }
  if (!timeSlot) { showMsg('请选择时间段', 'error'); return; }
  if (!name) { showMsg('请填写姓名', 'error'); return; }
  if (!phone || !/^1\d{10}$/.test(phone)) { showMsg('请填写正确的手机号码', 'error'); return; }
  if (!address) { showMsg('请填写详细地址', 'error'); return; }

  const isUrgent = document.getElementById('urgentCheck').checked;
  const note = document.getElementById('bookingNote').value.trim();

  const serviceNames = { basic: '基础装机 ¥199', premium: '高级装机 ¥349', vip: '尊享装机 ¥599' };
  const slotNames = { morning: '上午 9-12', afternoon: '下午 13-17', evening: '晚间 18-21' };

  const booking = {
    id: 'BK' + Date.now().toString(36).toUpperCase(),
    city, district,
    serviceType: serviceType.value,
    serviceName: serviceNames[serviceType.value],
    urgent: isUrgent,
    date, timeSlot: timeSlot.dataset.slot,
    timeSlotName: slotNames[timeSlot.dataset.slot],
    name, phone, address, note,
    status: '已确认',
    createdAt: new Date().toISOString()
  };

  // 存储
  let bookings = [];
  try { bookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch(e) {}
  bookings.unshift(booking);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings)); } catch(e) {
    showMsg('存储空间不足，请清理旧记录', 'error'); return;
  }

  showMsg('✅ 预约成功！师傅将在 ' + date + ' ' + booking.timeSlotName + ' 上门', 'success');
  resetForm();
  renderBookingHistory();
}

function resetForm() {
  document.getElementById('citySelect').value = '';
  document.getElementById('districtSelect').innerHTML = '<option value="">请先选择城市</option>';
  document.getElementById('districtSelect').disabled = true;
  document.querySelectorAll('input[name="serviceType"]').forEach(r => r.checked = false);
  document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('urgentCheck').checked = false;
  document.getElementById('bookingDate').value = '';
  document.querySelectorAll('.time-slot').forEach(b => b.classList.remove('active'));
  document.getElementById('bookingName').value = '';
  document.getElementById('bookingPhone').value = '';
  document.getElementById('bookingAddress').value = '';
  document.getElementById('bookingNote').value = '';
}

function showMsg(text, type) {
  const el = document.getElementById('formMsg');
  el.textContent = text;
  el.className = 'form-msg ' + type;
  if (type === 'success') setTimeout(() => { el.className = 'form-msg'; el.textContent = ''; }, 5000);
}

function renderBookingHistory() {
  const listEl = document.getElementById('historyList');
  const countEl = document.getElementById('historyCount');
  let bookings = [];
  try { bookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch(e) {}

  countEl.textContent = bookings.length;
  if (bookings.length === 0) {
    listEl.innerHTML = '<div class="booking-empty">暂无预约记录</div>';
    return;
  }

  listEl.innerHTML = bookings.map(b => `
    <div class="booking-history-item">
      <div class="bhi-left">
        <div class="bhi-type">${b.serviceName}${b.urgent ? ' ⚡加急' : ''}</div>
        <div class="bhi-info">${b.city}·${b.district} | ${b.date} ${b.timeSlotName}</div>
        <div class="bhi-addr">📍 ${b.address}</div>
      </div>
      <div class="bhi-right">
        <span class="bhi-status status-${b.status === '已确认' ? 'active' : 'done'}">${b.status}</span>
        ${b.status === '已确认' ? `<button class="bhi-cancel" onclick="cancelBooking('${b.id}')">取消</button>` : ''}
      </div>
    </div>
  `).join('');
}

function cancelBooking(id) {
  if (!confirm('确定要取消这个预约吗？')) return;
  let bookings = [];
  try { bookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch(e) {}
  const idx = bookings.findIndex(b => b.id === id);
  if (idx !== -1) bookings[idx].status = '已取消';
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  renderBookingHistory();
}

window.cancelBooking = cancelBooking;
document.addEventListener('DOMContentLoaded', initBookingPage);
