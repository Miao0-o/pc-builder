// ============================================================
// 购物车系统
// ============================================================
(function(){
  var CART_KEY = 'pcBuilder_cart';
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch(e) {}

  function save() { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

  var nav = document.querySelector('.nav');
  if (!nav) return;

  var cartBtn = document.createElement('button');
  cartBtn.id = 'cartBtn';
  cartBtn.className = 'cart-btn';
  cartBtn.innerHTML = '<i data-lucide="shopping-cart" style="width:20px;height:20px;"></i><span id="cartCount" class="cart-count">0</span>';
  cartBtn.title = '购物车';
  nav.appendChild(cartBtn);

  var panel = document.createElement('div');
  panel.id = 'cartPanel';
  panel.className = 'cart-panel';
  panel.innerHTML = '<div class="cart-panel-header"><h3><i data-lucide="shopping-cart" class="icon-sm"></i> 购物车</h3><button class="cart-close" id="cartCloseBtn">&times;</button></div><div class="cart-items" id="cartItems"></div><div class="cart-footer"><div class="cart-total">合计：<span id="cartTotal">¥0</span></div><div class="cart-actions"><button class="cart-btn-clear" id="cartClear">清空</button><button class="cart-btn-checkout" id="cartCheckout">一键购买</button></div></div>';
  document.body.appendChild(panel);

  cartBtn.onclick = function(e) { e.stopPropagation(); panel.classList.toggle('open'); render(); };
  document.getElementById('cartCloseBtn').onclick = function() { panel.classList.remove('open'); };
  document.getElementById('cartClear').onclick = function() { cart = []; save(); render(); };
  document.getElementById('cartCheckout').onclick = function() {
    if (cart.length === 0) return;
    localStorage.setItem('pcBuilder_cartCheckout', JSON.stringify(cart));
    window.location.href = 'service.html?from=cart';
  };

  document.addEventListener('click', function(e) {
    if (!panel.classList.contains('open')) return;
    if (!panel.contains(e.target) && e.target !== cartBtn && !cartBtn.contains(e.target)) {
      panel.classList.remove('open');
    }
  });

  window.cartAdd = function(name, price, icon, category) {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].name === name) return;
    }
    cart.push({ name: name, price: price, icon: icon || 'package', category: category || '' });
    save(); render(); panel.classList.add('open');
  };

  window.cartRemove = function(index) {
    cart.splice(index, 1); save(); render();
  };

  function render() {
    var countEl = document.getElementById('cartCount');
    var itemsEl = document.getElementById('cartItems');
    var totalEl = document.getElementById('cartTotal');
    if (!countEl || !itemsEl || !totalEl) return;
    countEl.textContent = cart.length;
    countEl.style.display = cart.length > 0 ? 'flex' : 'none';
    if (cart.length === 0) {
      itemsEl.innerHTML = '<div class="cart-empty">购物车是空的<br><span style="font-size:12px;color:#555;">在配件详情中点 + 加入购物车</span></div>';
      totalEl.textContent = '¥0'; return;
    }
    var total = 0, html = '';
    for (var i = 0; i < cart.length; i++) {
      var item = cart[i]; total += item.price;
      html += '<div class="cart-item"><i data-lucide="' + item.icon + '" class="icon-sm"></i><div class="cart-item-info"><span class="cart-item-name">' + item.name + '</span><span class="cart-item-cat">' + item.category + '</span></div><span class="cart-item-price">¥' + item.price.toLocaleString() + '</span><button class="cart-item-remove" onclick="cartRemove(' + i + ')">&times;</button></div>';
    }
    itemsEl.innerHTML = html;
    totalEl.textContent = '¥' + total.toLocaleString();
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
  render();
})();
