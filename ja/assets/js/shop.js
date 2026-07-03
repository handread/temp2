/* ===========================================================
   臻选商城(演示原型:购物车与结算流程均为本地模拟,不涉及真实支付)
   =========================================================== */

(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  const cats = ["すべて", ...Array.from(new Set(YXDATA.PRODUCTS.map(p=>p.cat)))];
  let activeCat = "すべて";
  let selectedPay = "WeChat Pay";
  let modalQty = 1;

  function imgStyle(p){
    return `background:linear-gradient(135deg,${p.grad[0]},${p.grad[1]})`;
  }

  function renderCatFilter(){
    $("#catFilter").innerHTML = cats.map(c => `<span class="pill ${c===activeCat?'sel':''}" data-cat="${c}">${c}</span>`).join("");
    $$("#catFilter .pill").forEach(p => p.addEventListener("click", () => {
      activeCat = p.dataset.cat; renderCatFilter(); renderGrid();
    }));
  }

  function renderGrid(){
    const list = activeCat==="すべて" ? YXDATA.PRODUCTS : YXDATA.PRODUCTS.filter(p=>p.cat===activeCat);
    $("#productGrid").innerHTML = list.map(p => `
      <div class="prod-card" data-id="${p.id}">
        <div class="prod-img" style="${imgStyle(p)}">
          ${p.tag ? `<span class="badge">${p.tag}</span>` : ""}
          <svg width="64" height="64" viewBox="0 0 64 64" opacity=".55"><circle cx="32" cy="24" r="14" fill="#fff" opacity=".7"/><path d="M14 54c0-12 8-20 18-20s18 8 18 20" fill="#fff" opacity=".7"/></svg>
        </div>
        <div class="prod-body">
          <div class="cat">${p.cat}</div>
          <h4>${p.name}</h4>
          <div class="rating">★ ${p.rating} · 販売数 ${p.sold}</div>
          <div class="price-row">
            <span class="price">${YX.fmtCNY(p.price)}</span>
            ${p.originalPrice ? `<span class="orig">${YX.fmtCNY(p.originalPrice)}</span>` : ""}
          </div>
        </div>
      </div>
    `).join("");
    $$(".prod-card").forEach(card => card.addEventListener("click", () => openProduct(card.dataset.id)));
  }

  /* ---------------- product modal ---------------- */
  function openProduct(id){
    const p = YXDATA.prodById(id);
    if(!p) return;
    modalQty = 1;
    $("#prodModalBody").innerHTML = `
      <div class="modal-prod-img" style="${imgStyle(p)}"></div>
      <div class="cat">${p.cat}</div>
      <h3 style="margin-top:.3rem">${p.name}</h3>
      <div class="rating" style="margin-top:.4rem">★ ${p.rating} · 販売数 ${p.sold}</div>
      <p class="muted" style="font-size:.86rem;margin-top:.8rem">${p.desc}</p>
      <div class="price-row mt-1">
        <span class="price" style="font-size:1.4rem">${YX.fmtCNY(p.price)}</span>
        ${p.originalPrice ? `<span class="orig">${YX.fmtCNY(p.originalPrice)}</span>` : ""}
      </div>
      <div class="qty-input">
        <button id="qtyMinus">-</button>
        <span id="qtyVal">1</span>
        <button id="qtyPlus">+</button>
      </div>
      <button class="btn btn-primary btn-block" id="modalAddBtn">カートに追加</button>
    `;
    $("#qtyMinus").addEventListener("click", () => { modalQty = Math.max(1, modalQty-1); $("#qtyVal").textContent = modalQty; });
    $("#qtyPlus").addEventListener("click", () => { modalQty += 1; $("#qtyVal").textContent = modalQty; });
    $("#modalAddBtn").addEventListener("click", () => {
      YX.addToCart(p, modalQty);
      YX.toast(`已カートに追加:${p.name} × ${modalQty}`);
      closeModal("prod");
      updateCartCountLabel();
    });
    openModal("prod");
  }

  /* ---------------- overlay helpers ---------------- */
  function openModal(key){
    $("#" + key + "Overlay").classList.add("open");
    $("#" + key + (key==="cart" ? "Drawer" : "Modal")).classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal(key){
    $("#" + key + "Overlay").classList.remove("open");
    $("#" + key + (key==="cart" ? "Drawer" : "Modal")).classList.remove("open");
    document.body.style.overflow = "";
  }
  $$("[data-close]").forEach(btn => btn.addEventListener("click", () => closeModal(btn.dataset.close)));
  ["prod","cart","checkout"].forEach(key => {
    document.getElementById(key+"Overlay").addEventListener("click", () => closeModal(key));
  });

  /* ---------------- cart drawer ---------------- */
  function updateCartCountLabel(){
    $("#cartCountLabel").textContent = YX.cartCount();
  }

  function renderCart(){
    const cart = YX.getCart();
    updateCartCountLabel();
    if(!cart.length){
      $("#cartBody").innerHTML = `<div class="empty-cart"><div class="ic" style="font-size:2rem">🛍️</div>カートは空です。商品を選んでください</div>`;
      $("#cartTotal").textContent = "¥0";
      return;
    }
    $("#cartBody").innerHTML = cart.map(item => {
      const p = YXDATA.prodById(item.id);
      const grad = p ? imgStyle(p) : "background:#eee";
      return `
        <div class="cart-row">
          <div class="cart-thumb" style="${grad}"></div>
          <div class="info">
            <h5>${item.name}</h5>
            <div class="price">${YX.fmtCNY(item.price)}</div>
            <div class="qty-ctrl">
              <button data-dec="${item.id}">-</button>
              <span>${item.qty}</span>
              <button data-inc="${item.id}">+</button>
              <button class="cart-remove" data-rm="${item.id}">削除</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
    const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
    $("#cartTotal").textContent = YX.fmtCNY(total);

    $$("[data-inc]").forEach(b=>b.addEventListener("click", ()=>{ const it=cart.find(i=>i.id===b.dataset.inc); YX.setQty(it.id, it.qty+1); renderCart(); }));
    $$("[data-dec]").forEach(b=>b.addEventListener("click", ()=>{ const it=cart.find(i=>i.id===b.dataset.dec); if(it.qty<=1){ YX.removeFromCart(it.id);} else { YX.setQty(it.id, it.qty-1);} renderCart(); }));
    $$("[data-rm]").forEach(b=>b.addEventListener("click", ()=>{ YX.removeFromCart(b.dataset.rm); renderCart(); }));
  }

  /* ---------------- checkout ---------------- */
  function openCheckout(){
    const cart = YX.getCart();
    if(!cart.length){ YX.toast("カートは空です"); return; }
    $("#checkoutForm").style.display = "block";
    $("#checkoutSuccess").style.display = "none";
    $("#checkoutTitle").textContent = "注文確認";
    const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
    $("#checkoutSummary").innerHTML = cart.map(i => `
      <div class="row" style="display:flex;justify-content:space-between;font-size:.84rem;padding:.35rem 0"><span class="muted">${i.name} × ${i.qty}</span><b>${YX.fmtCNY(i.price*i.qty)}</b></div>
    `).join("") + `<div class="row" style="display:flex;justify-content:space-between;font-size:.9rem;padding-top:.6rem;margin-top:.4rem;border-top:1px dashed var(--line)"><span>合計</span><b style="color:var(--magenta)">${YX.fmtCNY(total)}</b></div>`;
    closeModal("cart");
    openModal("checkout");
  }

  function initPayOptions(){
    $$(".pay-option").forEach(opt => {
      opt.addEventListener("click", () => {
        $$(".pay-option").forEach(o=>o.classList.remove("sel"));
        opt.classList.add("sel");
        opt.querySelector("input").checked = true;
        selectedPay = opt.textContent.trim();
      });
    });
  }

  function confirmPay(){
    const code = "ORD" + Date.now().toString().slice(-9);
    $("#orderCode").textContent = code;
    $("#checkoutForm").style.display = "none";
    $("#checkoutSuccess").style.display = "block";
    $("#checkoutTitle").textContent = "注文完了";
    YX.clearCart();
    renderCart();
    YX.toast("模拟支払い完了,订单已生成");
  }

  /* ---------------- deep link from skin-analysis.html?product=ID ---------------- */
  function handleDeepLink(){
    const id = new URLSearchParams(location.search).get("product");
    if(id && YXDATA.prodById(id)) setTimeout(()=>openProduct(id), 300);
  }

  function init(){
    renderCatFilter();
    renderGrid();
    renderCart();
    initPayOptions();

    $("#openCartBtn").addEventListener("click", () => { renderCart(); openModal("cart"); });
    document.getElementById("navCart")?.addEventListener("click", (e) => { e.preventDefault(); renderCart(); openModal("cart"); });
    $("#checkoutBtn").addEventListener("click", openCheckout);
    $("#confirmPayBtn").addEventListener("click", confirmPay);

    if(location.hash === "#cart"){ renderCart(); openModal("cart"); }
    handleDeepLink();
  }

  document.addEventListener("DOMContentLoaded", () => setTimeout(init, 0));
})();

