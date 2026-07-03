/* ===========================================================
   YANXI AI · Japanese shared chrome (nav / footer) + small utilities
   =========================================================== */

const YX = (() => {

  const NAV = [
    { href:"index.html",         label:"ホーム" },
    { href:"booking.html",       label:"予約" },
    { href:"membership.html",    label:"会員" },
    { href:"skin-analysis.html", label:"AI肌分析" },
    { href:"shop.html",          label:"ショップ" },
    { href:"analytics.html",     label:"分析" },
    { href:"chatbot.html",       label:"AI相談" },
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
      <div class="demo-banner">これは <b>デモ用プロトタイプ</b> です。データ、AI結果、決済フローはすべて模擬表示で、実際の医療 / 決済システムには接続していません</div>
      <header class="nav">
        <div class="wrap nav-inner">
          <a href="index.html" class="brand">颜汐<span>YANXI AI BEAUTY</span></a>
          <nav class="nav-links" id="navLinks">${links}</nav>
          <div class="nav-cta">
            <a href="shop.html#cart" class="nav-cart" id="navCart" aria-label="カート" title="カート">
              🛍️<span class="badge" id="navCartBadge" style="display:none">0</span>
            </a>
            <a href="booking.html" class="btn btn-magenta btn-sm">予約する</a>
            <a href="../index.html" class="btn btn-ghost btn-sm">中文</a>
            <button class="nav-toggle" id="navToggle" aria-label="メニュー">☰</button>
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
            <a href="index.html" class="brand" style="color:var(--ink);text-decoration:none">颜汐<span style="color:var(--magenta)">YANXI AI BEAUTY</span></a>
            <nav class="foot-links">
              <a href="booking.html">予約</a>
              <a href="membership.html">会員</a>
              <a href="skin-analysis.html">AI肌分析</a>
              <a href="shop.html">ショップ</a>
              <a href="analytics.html">経営分析</a>
              <a href="chatbot.html">AI相談</a>
            </nav>
          </div>
          <p class="disclaimer">
            本サイトは「AI美容医療プラットフォーム」の製品デモです。予約、会員、AI肌分析、AI相談、ショップ、データ分析の6機能を確認するためのプロトタイプで、価格、予約枠、分析結果、注文、経営データはすべて<b>模擬生成</b>です。実際の医療情報システム、決済ゲートウェイ、第三者AIサービスには接続しておらず、診療上の助言、効果保証、正式見積ではありません。
          </p>
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
    return "¥" + Number(n).toLocaleString("ja-JP", { maximumFractionDigits:0 });
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

