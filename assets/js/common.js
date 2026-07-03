/* ===========================================================
   依欣 YIXIN AI · shared chrome (nav / footer) + small utilities
   =========================================================== */

const YX = (() => {

  const NAV = [
    { href:"index.html",         label:"平台首页" },
    { href:"booking.html",       label:"预约系统" },
    { href:"membership.html",    label:"会员中心" },
    { href:"skin-analysis.html", label:"AI 皮肤分析" },
    { href:"shop.html",          label:"臻选商城" },
    { href:"analytics.html",     label:"经营分析" },
    { href:"chatbot.html",       label:"AI 客服" },
  ];

  function currentPage(){
    const p = location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  function renderHeader(){
    const mount = document.getElementById("site-header");
    if(!mount) return;
    const cur = currentPage();
    const links = NAV.map(n => `<a href="${n.href}" class="${n.href===cur?'active':''}">${n.label}</a>`).join("");
    mount.innerHTML = `
      <div class="demo-banner">这是 <b>演示原型</b> · 全部数据、AI 结果与支付流程均为模拟展示,不对接真实医疗 / 支付系统</div>
      <header class="nav">
        <div class="wrap nav-inner">
          <a href="index.html" class="brand">依欣<span>YIXIN AI BEAUTY</span></a>
          <nav class="nav-links" id="navLinks">${links}</nav>
          <div class="nav-cta">
            <a href="shop.html#cart" class="nav-cart" id="navCart" aria-label="购物车" title="购物车">
              🛍️<span class="badge" id="navCartBadge" style="display:none">0</span>
            </a>
            <a href="ja/index.html" class="btn btn-ghost btn-sm">日本語</a>
            <a href="en/index.html" class="btn btn-ghost btn-sm">English</a>
            <a href="booking.html" class="btn btn-magenta btn-sm">立即预约</a>
            <button class="nav-toggle" id="navToggle" aria-label="菜单">☰</button>
          </div>
        </div>
      </header>
    `;
    const toggle = document.getElementById("navToggle");
    const linksEl = document.getElementById("navLinks");
    toggle.addEventListener("click", () => linksEl.classList.toggle("open"));
    updateCartBadge();
  }

  function renderFooter(){
    const mount = document.getElementById("site-footer");
    if(!mount) return;
    mount.innerHTML = `
      <footer>
        <div class="wrap">
          <div class="foot-top">
            <a href="index.html" class="brand" style="color:var(--ink);text-decoration:none">依欣<span style="color:var(--magenta)">YIXIN AI BEAUTY</span></a>
            <nav class="foot-links">
              <a href="booking.html">预约系统</a>
              <a href="membership.html">会员中心</a>
              <a href="skin-analysis.html">AI 皮肤分析</a>
              <a href="shop.html">臻选商城</a>
              <a href="analytics.html">经营分析</a>
              <a href="chatbot.html">AI 客服</a>
            </nav>
          </div>
          <p class="disclaimer">
            本站为「AI 医美平台」产品演示原型,用于展示预约、会员、AI 皮肤分析、智能客服、商城与数据分析六大模块的交互设计与信息架构。页面中的价格、排期、分析结果、订单与经营数据均为<b>模拟生成</b>,不连接真实医院信息系统、支付网关或第三方 AI 服务,不构成诊疗建议、疗效承诺或商业报价,仅供产品演示与内部评审使用。
          </p>
          <p class="disclaimer" style="border-top:none;padding-top:.8rem">联系开发者 <b>benihuang78@gmail.com</b></p>
        </div>
      </footer>
    `;
  }

  function initReveal(){
    const els = document.querySelectorAll(".reveal");
    if(!els.length) return;
    const io = new IntersectionObserver((es)=>{
      es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    },{threshold:.12});
    els.forEach(el=>io.observe(el));
  }

  let toastTimer=null;
  function toast(msg){
    let el = document.getElementById("yxToast");
    if(!el){
      el = document.createElement("div");
      el.id = "yxToast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.innerHTML = `<span class="dotok"></span>${msg}`;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>el.classList.remove("show"), 2600);
  }

  /* ---- cart (shared across nav badge + shop page), localStorage-backed ---- */
  const CART_KEY = "yx_cart_v1";
  function getCart(){
    try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch(e){ return []; }
  }
  function saveCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }
  function cartCount(){
    return getCart().reduce((s,i)=>s+i.qty,0);
  }
  function updateCartBadge(){
    const badge = document.getElementById("navCartBadge");
    if(!badge) return;
    const n = cartCount();
    badge.textContent = n > 99 ? "99+" : n;
    badge.style.display = n > 0 ? "grid" : "none";
  }
  function addToCart(product, qty=1){
    const cart = getCart();
    const found = cart.find(i=>i.id===product.id);
    if(found){ found.qty += qty; } else { cart.push({ id:product.id, name:product.name, price:product.price, img:product.img, cat:product.cat, qty }); }
    saveCart(cart);
  }
  function removeFromCart(id){
    saveCart(getCart().filter(i=>i.id!==id));
  }
  function setQty(id, qty){
    const cart = getCart();
    const found = cart.find(i=>i.id===id);
    if(found){ found.qty = Math.max(1, qty); }
    saveCart(cart);
  }
  function clearCart(){ saveCart([]); }

  function fmtCNY(n){
    return "¥" + Number(n).toLocaleString("zh-CN", { maximumFractionDigits:0 });
  }
  function pad(n){ return String(n).padStart(2,"0"); }

  function init(){
    renderHeader();
    renderFooter();
    initReveal();
  }

  return { NAV, init, toast, getCart, saveCart, cartCount, addToCart, removeFromCart, setQty, clearCart, fmtCNY, pad, initReveal };
})();

document.addEventListener("DOMContentLoaded", YX.init);
