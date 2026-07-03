/* ===========================================================
   Booking System · step wizard (演示原型,数据All为本地模拟)
   =========================================================== */

(() => {
  const BOOKINGS_KEY = "yx_bookings_v1";
  const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const state = { step:1, svc:null, staff:null, date:null, time:null };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  /* ---------------- step 1: service ---------------- */
  const cats = ["All", ...Array.from(new Set(YXDATA.SERVICES.map(s=>s.cat)))];
  let activeCat = "All";

  function renderCatFilter(){
    $("#svcCatFilter").innerHTML = cats.map(c =>
      `<span class="pill ${c===activeCat?'sel':''}" data-cat="${c}">${c}</span>`
    ).join("");
    $$("#svcCatFilter .pill").forEach(p=>{
      p.addEventListener("click", () => { activeCat = p.dataset.cat; renderCatFilter(); renderSvcList(); });
    });
  }

  function renderSvcList(){
    const list = activeCat === "All" ? YXDATA.SERVICES : YXDATA.SERVICES.filter(s=>s.cat===activeCat);
    $("#svcList").innerHTML = list.map(s => `
      <div class="svc-card ${state.svc===s.id?'sel':''}" data-id="${s.id}">
        <div class="row">
          <h4>${s.name}</h4>
          <div class="price">${s.price===0?'Free':YX.fmtCNY(s.price)}</div>
        </div>
        <p>${s.desc}</p>
        <div class="meta">${s.cat} · About ${s.duration} min</div>
      </div>
    `).join("");
    $$("#svcList .svc-card").forEach(card=>{
      card.addEventListener("click", () => {
        state.svc = card.dataset.id;
        state.staff = null; state.date = null; state.time = null;
        renderSvcList();
        updateNextEnabled();
      });
    });
  }

  /* ---------------- step 2: staff ---------------- */
  function renderStaffList(){
    const svc = YXDATA.svcById(state.svc);
    let list = YXDATA.STAFF.filter(s => s.tags.includes(svc.cat));
    if(!list.length) list = YXDATA.STAFF.filter(s=>s.id!=="st-04");
    $("#staffList").innerHTML = list.map(s => `
      <div class="staff-card ${state.staff===s.id?'sel':''}" data-id="${s.id}">
        <div class="staff-avatar" style="background:${s.color}">${s.name.slice(0,1)}</div>
        <h4>${s.name}</h4>
        <div class="role">${s.title}</div>
        <div class="role" style="margin-top:.3rem">${s.years?`Experience ${s.years} years`:'AI online'}</div>
      </div>
    `).join("");
    $$("#staffList .staff-card").forEach(card=>{
      card.addEventListener("click", () => {
        state.staff = card.dataset.id;
        renderStaffList();
        updateNextEnabled();
      });
    });
  }

  /* ---------------- step 3: date & time ---------------- */
  function nextDays(n){
    const out = [];
    const base = new Date();
    for(let i=0;i<n;i++){
      const d = new Date(base);
      d.setDate(base.getDate()+i);
      out.push(d);
    }
    return out;
  }
  function isoDate(d){ return `${d.getFullYear()}-${YX.pad(d.getMonth()+1)}-${YX.pad(d.getDate())}`; }

  function renderDayRow(){
    const days = nextDays(14);
    if(!state.date) state.date = isoDate(days[0]);
    $("#dayRow").innerHTML = days.map(d => {
      const iso = isoDate(d);
      return `<div class="day-pill ${state.date===iso?'sel':''}" data-iso="${iso}">
        <div class="wd">${WEEKDAYS[d.getDay()]}</div>
        <div class="dt">${d.getDate()}</div>
      </div>`;
    }).join("");
    $$("#dayRow .day-pill").forEach(p=>{
      p.addEventListener("click", () => {
        state.date = p.dataset.iso; state.time = null;
        renderDayRow(); renderTimeGrid();
        updateNextEnabled();
      });
    });
  }

  function hashStr(s){
    let h=0; for(let i=0;i<s.length;i++){ h=(h*31+s.charCodeAt(i))>>>0; } return h;
  }

  function renderTimeGrid(){
    const slots = [];
    for(let h=10; h<=19; h++){
      slots.push(`${YX.pad(h)}:00`);
      if(h<19) slots.push(`${YX.pad(h)}:30`);
    }
    $("#timeGrid").innerHTML = slots.map(t => {
      const disabled = (hashStr(state.date+t+state.svc) % 100) < 32;
      const sel = state.time===t;
      return `<span class="pill ${sel?'sel':''} ${disabled?'disabled':''}" data-t="${t}" ${disabled?'aria-disabled="true"':''}>${t}</span>`;
    }).join("");
    $$("#timeGrid .pill:not(.disabled)").forEach(p=>{
      p.addEventListener("click", () => {
        state.time = p.dataset.t;
        renderTimeGrid();
        updateNextEnabled();
      });
    });
  }

  /* ---------------- step 4: confirm ---------------- */
  function renderSummary(targetSel){
    const svc = YXDATA.svcById(state.svc);
    const staff = YXDATA.STAFF.find(s=>s.id===state.staff);
    const [y,m,d] = state.date.split("-");
    $(targetSel).innerHTML = `
      <div class="row"><span class="muted">Service</span><b>${svc.name}</b></div>
      <div class="row"><span class="muted">Consultant</span><b>${staff.name}</b></div>
      <div class="row"><span class="muted">Time</span><b>${y}-${m}-${d} ${state.time}</b></div>
      <div class="row"><span class="muted">Duration</span><b>About ${svc.duration} min</b></div>
      <div class="row"><span class="muted">Fee</span><b style="color:var(--magenta)">${svc.price===0?'Free':YX.fmtCNY(svc.price)}</b></div>
    `;
  }

  /* ---------------- step navigation ---------------- */
  function updateNextEnabled(){
    const btn = $("#nextBtn");
    let ok = true;
    if(state.step===1) ok = !!state.svc;
    if(state.step===2) ok = !!state.staff;
    if(state.step===3) ok = !!(state.date && state.time);
    btn.disabled = !ok;
  }

  function goStep(n){
    state.step = n;
    $$(".step-panel").forEach(p => p.classList.toggle("active", +p.dataset.step === n));
    $$("#steps li").forEach((li,i) => {
      li.classList.toggle("active", i+1===n);
      li.classList.toggle("done", i+1<n);
    });
    $("#prevBtn").style.visibility = n===1 ? "hidden" : "visible";
    $("#wizardNav").style.display = n===5 ? "none" : "flex";
    if(n===2) renderStaffList();
    if(n===3){ renderDayRow(); renderTimeGrid(); }
    if(n===4) renderSummary("#summaryBox");
    updateNextEnabled();
    if(n<5) $("#nextBtn").textContent = n===4 ? "Submit Booking →" : "Next →";
    window.scrollTo({ top: document.querySelector(".wizard").getBoundingClientRect().top + window.scrollY - 90, behavior:"smooth" });
  }

  function submitBooking(){
    const name = $("#fName").value.trim() || "Demo User";
    const phone = $("#fPhone").value.trim() || "138****0000";
    const svc = YXDATA.svcById(state.svc);
    const staff = YXDATA.STAFF.find(s=>s.id===state.staff);
    const code = "YX" + Date.now().toString().slice(-8);
    const booking = {
      code, name, phone, note:$("#fNote").value.trim(),
      svcId: svc.id, svcName: svc.name, price: svc.price,
      staffName: staff.name, date: state.date, time: state.time,
      status: "Pending Visit", createdAt: new Date().toISOString(),
    };
    const list = getBookings();
    list.unshift(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
    $("#confCode").textContent = "Booking No. " + code;
    renderSummary("#summaryBox2");
    renderMyBookings();
    YX.toast("Booking Submitted");
  }

  function getBookings(){
    try{ return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || []; }catch(e){ return []; }
  }
  function cancelBooking(code){
    const list = getBookings().filter(b=>b.code!==code);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
    renderMyBookings();
    YX.toast("Booking cancelled");
  }

  function renderMyBookings(){
    const own = getBookings();
    const history = YXDATA.APPOINTMENT_HISTORY;
    const mount = $("#bookingsList");
    if(!own.length && !history.length){
      mount.innerHTML = `<div class="empty"><div class="ic">🗓️</div>No booking history</div>`;
      return;
    }
    const ownHtml = own.map(b => `
      <div class="card mybooking-card">
        <div>
          <div class="flex gap-1 center-y"><span class="tag">${b.status}</span><span class="muted" style="font-size:.78rem">No. ${b.code}</span></div>
          <h4 style="margin-top:.5rem">${b.svcName}</h4>
          <p class="muted" style="font-size:.84rem;margin-top:.3rem">${b.date} ${b.time} · ${b.staffName} · ${b.price===0?'Free':YX.fmtCNY(b.price)}</p>
        </div>
        <button class="btn btn-ghost btn-sm" data-cancel="${b.code}">Cancel Booking</button>
      </div>
    `).join("");
    const historyHtml = history.map(h => `
      <div class="card mybooking-card">
        <div>
          <div class="flex gap-1 center-y"><span class="tag muted">${h.status}</span></div>
          <h4 style="margin-top:.5rem">${h.svc}</h4>
          <p class="muted" style="font-size:.84rem;margin-top:.3rem">${h.when} · ${h.staff}</p>
        </div>
      </div>
    `).join("");
    mount.innerHTML = ownHtml + historyHtml;
    $$("[data-cancel]").forEach(btn => btn.addEventListener("click", () => cancelBooking(btn.dataset.cancel)));
  }

  /* ---------------- init ---------------- */
  function applyDeepLink(){
    const id = new URLSearchParams(location.search).get("svc");
    const svc = id && YXDATA.svcById(id);
    if(svc){ activeCat = svc.cat; state.svc = svc.id; }
  }

  function init(){
    applyDeepLink();
    renderCatFilter();
    renderSvcList();
    renderMyBookings();

    $("#prevBtn").addEventListener("click", () => { if(state.step>1) goStep(state.step-1); });
    $("#nextBtn").addEventListener("click", () => {
      if(state.step===4){ submitBooking(); goStep(5); return; }
      if(state.step<5) goStep(state.step+1);
    });
    goStep(1);
    if(state.svc) YX.toast("A service was preselected based on AI analysis suggestions");
  }

  document.addEventListener("DOMContentLoaded", init);
})();

