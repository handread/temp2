/* ===========================================================
   Membership Center(演示原型,积分与Redeem均为本地模拟Status)
   =========================================================== */

(() => {
  const POINTS_KEY = "yx_member_points_v1";
  const HIST_KEY = "yx_member_hist_v1";
  const $ = (s) => document.querySelector(s);

  const REDEEM_ITEMS = [
    { id:"r1", name:"AHA Peel Trial Voucher", cost:800, desc:"Redeem for one AHA peel treatment" },
    { id:"r2", name:"¥300 Shop Voucher", cost:500, desc:"Usable on any shop product" },
    { id:"r3", name:"Cell Renewal Serum Trial", cost:300, desc:"5ml sample shipped to saved address" },
    { id:"r4", name:"Birthday Gift Box", cost:1200, desc:"Includes full-size serum and mask gift box" },
  ];

  function getPoints(){
    const v = localStorage.getItem(POINTS_KEY);
    return v===null ? YXDATA.CURRENT_MEMBER.points : Number(v);
  }
  function setPoints(p){ localStorage.setItem(POINTS_KEY, String(p)); }
  function getLocalHistory(){
    try{ return JSON.parse(localStorage.getItem(HIST_KEY)) || []; }catch(e){ return []; }
  }
  function pushLocalHistory(entry){
    const list = getLocalHistory();
    list.unshift(entry);
    localStorage.setItem(HIST_KEY, JSON.stringify(list));
  }

  function tierOf(points, spend){
    // membership tier is driven by cumulative spend in this demo
    const tiers = YXDATA.TIERS;
    let cur = tiers[0];
    for(const t of tiers){ if(spend >= t.min) cur = t; }
    return cur;
  }

  function renderCard(){
    const m = YXDATA.CURRENT_MEMBER;
    const points = getPoints();
    const tier = tierOf(points, m.totalSpend);
    const tiers = YXDATA.TIERS;
    const idx = tiers.findIndex(t=>t.key===tier.key);
    const next = tiers[idx+1];
    const pct = next ? Math.min(100, Math.round(((m.totalSpend - tier.min) / (next.min - tier.min))*100)) : 100;

    $("#memberCard").innerHTML = `
      <div class="top">
        <div>
          <span class="tierbadge">★ ${tier.name}</span>
        </div>
        <div class="chip"></div>
      </div>
      <h2>${m.name} <span style="font-size:.8rem;color:#AEB6CC;font-weight:300">${m.id}</span></h2>
      <div class="mid">Phone ${m.phone} · Joined  ${m.joined}</div>
      <div class="points-row">
        <div class="points">${points.toLocaleString()}<small>Available Points</small></div>
        <div style="text-align:right">
          <div class="points" style="font-size:1.3rem">${YX.fmtCNY(m.totalSpend)}<small>Total Spend</small></div>
        </div>
      </div>
      <div class="progress-wrap">
        <div class="lbl"><span>${tier.name}</span><span>${next ? `Need ${next.name} to ${YX.fmtCNY(Math.max(0,next.min - m.totalSpend))}` : "Highest tier"}</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
    `;
    return tier;
  }

  function renderTiers(currentTier){
    $("#tierGrid").innerHTML = YXDATA.TIERS.map(t => `
      <div class="tier-card ${t.key===currentTier.key?'current':''}">
        ${t.key===currentTier.key?'<span class="current-flag">Current Tier</span>':''}
        <div class="swatch" style="background:${t.color}"></div>
        <h4>${t.name}</h4>
        <div class="min">Total Spend满 ${YX.fmtCNY(t.min)}</div>
        <ul>${t.perk.map(p=>`<li>${p}</li>`).join("")}</ul>
      </div>
    `).join("");
  }

  function renderRedeem(){
    $("#redeemList").innerHTML = REDEEM_ITEMS.map(r => `
      <div class="redeem-item">
        <div class="info">
          <h5>${r.name}</h5>
          <p class="muted" style="font-size:.78rem;margin-top:.15rem">${r.desc}</p>
          <span>${r.cost} points</span>
        </div>
        <button class="btn btn-outline btn-sm" data-redeem="${r.id}">Redeem</button>
      </div>
    `).join("");
    document.querySelectorAll("[data-redeem]").forEach(btn=>{
      btn.addEventListener("click", () => {
        const item = REDEEM_ITEMS.find(r=>r.id===btn.dataset.redeem);
        const points = getPoints();
        if(points < item.cost){ YX.toast("Not enough points. Earn more through purchases."); return; }
        setPoints(points - item.cost);
        pushLocalHistory({ when: new Date().toISOString().slice(0,10), what: `Redeem「${item.name}」`, delta: `-${item.cost}`, neg:true });
        YX.toast(`Redeemed: ${item.name}`);
        renderAll();
      });
    });
  }

  function renderHistory(){
    const merged = [...getLocalHistory(), ...YXDATA.POINTS_HISTORY];
    $("#pointsHistory").innerHTML = merged.map(h => `
      <div class="vtl-item ${h.neg?'neg':''}">
        <div class="dot"></div>
        <div class="when">${h.when}</div>
        <div class="what">${h.what} <span class="delta">${h.delta}</span></div>
      </div>
    `).join("");
  }

  function renderAppointments(){
    $("#apptTable").innerHTML = YXDATA.APPOINTMENT_HISTORY.map(a => `
      <tr><td>${a.when}</td><td>${a.svc}</td><td>${a.staff}</td><td><span class="tag muted">${a.status}</span></td></tr>
    `).join("");
  }

  function renderAll(){
    const tier = renderCard();
    renderTiers(tier);
    renderRedeem();
    renderHistory();
  }

  function initInvite(){
    $("#copyInvite").addEventListener("click", async () => {
      const val = $("#inviteCode").value;
      try{
        await navigator.clipboard.writeText(val);
        YX.toast("Invite code copied");
      }catch(e){
        $("#inviteCode").select();
        YX.toast("Please copy the invite code manually");
      }
    });
  }

  function init(){
    renderAll();
    renderAppointments();
    initInvite();
  }

  document.addEventListener("DOMContentLoaded", init);
})();

