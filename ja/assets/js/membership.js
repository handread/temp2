/* ===========================================================
   会员中心(演示原型,积分与兑换均为本地模拟状態)
   =========================================================== */

(() => {
  const POINTS_KEY = "yx_member_points_v1";
  const HIST_KEY = "yx_member_hist_v1";
  const $ = (s) => document.querySelector(s);

  const REDEEM_ITEMS = [
    { id:"r1", name:"果酸焕肤体验券", cost:800, desc:"抵扣一次果酸焕肤疗程" },
    { id:"r2", name:"商城满 ¥300 代金券", cost:500, desc:"可用于臻选商城任意商品" },
    { id:"r3", name:"细胞焕活精华 · 试用装", cost:300, desc:"5ml 小样,寄送至预留地址" },
    { id:"r4", name:"生日惊喜礼盒", cost:1200, desc:"含正装精华 + 面膜礼盒" },
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
      <div class="mid">手机 ${m.phone} · 入会于 ${m.joined}</div>
      <div class="points-row">
        <div class="points">${points.toLocaleString()}<small>可用积分</small></div>
        <div style="text-align:right">
          <div class="points" style="font-size:1.3rem">${YX.fmtCNY(m.totalSpend)}<small>累计消费</small></div>
        </div>
      </div>
      <div class="progress-wrap">
        <div class="lbl"><span>${tier.name}</span><span>${next ? `距 ${next.name} 还差 ${YX.fmtCNY(Math.max(0,next.min - m.totalSpend))}` : "已是最高等级"}</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
    `;
    return tier;
  }

  function renderTiers(currentTier){
    $("#tierGrid").innerHTML = YXDATA.TIERS.map(t => `
      <div class="tier-card ${t.key===currentTier.key?'current':''}">
        ${t.key===currentTier.key?'<span class="current-flag">当前等级</span>':''}
        <div class="swatch" style="background:${t.color}"></div>
        <h4>${t.name}</h4>
        <div class="min">累计消费满 ${YX.fmtCNY(t.min)}</div>
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
          <span>${r.cost} 积分</span>
        </div>
        <button class="btn btn-outline btn-sm" data-redeem="${r.id}">兑换</button>
      </div>
    `).join("");
    document.querySelectorAll("[data-redeem]").forEach(btn=>{
      btn.addEventListener("click", () => {
        const item = REDEEM_ITEMS.find(r=>r.id===btn.dataset.redeem);
        const points = getPoints();
        if(points < item.cost){ YX.toast("积分不足,快去消费攒积分吧"); return; }
        setPoints(points - item.cost);
        pushLocalHistory({ when: new Date().toISOString().slice(0,10), what: `兑换「${item.name}」`, delta: `-${item.cost}`, neg:true });
        YX.toast(`兑换成功:${item.name}`);
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
        YX.toast("邀请码已复制");
      }catch(e){
        $("#inviteCode").select();
        YX.toast("请手动招待コードをコピー");
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

