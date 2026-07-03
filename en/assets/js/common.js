/* ===========================================================
   YANXI AI · English shared chrome (nav / footer) + utilities
   =========================================================== */

const YX = (() => {
  const NAV = [
    { href:"index.html", label:"Home" },
    { href:"booking.html", label:"Booking" },
    { href:"membership.html", label:"Membership" },
    { href:"skin-analysis.html", label:"AI Skin" },
    { href:"shop.html", label:"Shop" },
    { href:"analytics.html", label:"Analytics" },
    { href:"chatbot.html", label:"AI Assistant" },
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
      <div class="demo-banner">This is a <b>demo prototype</b>. All data, AI results, and payment flows are simulated and are not connected to real medical or payment systems.</div>
      <header class="nav">
        <div class="wrap nav-inner">
          <a href="index.html" class="brand">颜汐<span>YANXI AI BEAUTY</span></a>
          <nav class="nav-links" id="navLinks">${links}</nav>
          <div class="nav-cta">
            <a href="shop.html#cart" class="nav-cart" id="navCart" aria-label="Cart" title="Cart">
              🛍️<span class="badge" id="navCartBadge" style="display:none">0</span>
            </a>
            <a href="../index.html" class="btn btn-ghost btn-sm">中文</a>
            <a href="../ja/index.html" class="btn btn-ghost btn-sm">日本語</a>
            <a href="booking.html" class="btn btn-magenta btn-sm">Book Now</a>
            <button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>
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
              <a href="booking.html">Booking</a>
              <a href="membership.html">Membership</a>
              <a href="skin-analysis.html">AI Skin</a>
              <a href="shop.html">Shop</a>
              <a href="analytics.html">Analytics</a>
              <a href="chatbot.html">AI Assistant</a>
            </nav>
          </div>
          <p class="disclaimer">
            This site is a product demo for an AI beauty medical platform, showing booking, membership, AI skin analysis, AI assistant, shop, and analytics modules. Prices, schedules, analysis results, orders, and operating data are <b>simulated</b>. It is not connected to real hospital systems, payment gateways, or third-party AI services, and does not provide medical advice, efficacy claims, or commercial quotations.
          </p>
          <p class="disclaimer" style="border-top:none;padding-top:.8rem">Developer: <b>benihuang78@gmail.com</b></p>
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

  const CART_KEY = "yx_cart_v1";
  function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch(e){ return []; } }
  function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartBadge(); }
  function cartCount(){ return getCart().reduce((s,i)=>s+i.qty,0); }
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
  function removeFromCart(id){ saveCart(getCart().filter(i=>i.id!==id)); }
  function setQty(id, qty){ const cart = getCart(); const found = cart.find(i=>i.id===id); if(found){ found.qty = Math.max(1, qty); } saveCart(cart); }
  function clearCart(){ saveCart([]); }
  function fmtCNY(n){ return "¥" + Number(n).toLocaleString("en-US", { maximumFractionDigits:0 }); }
  function pad(n){ return String(n).padStart(2,"0"); }
  function init(){ renderHeader(); renderFooter(); initReveal(); }

  return { NAV, init, toast, getCart, saveCart, cartCount, addToCart, removeFromCart, setQty, clearCart, fmtCNY, pad, initReveal };
})();

document.addEventListener("DOMContentLoaded", YX.init);

