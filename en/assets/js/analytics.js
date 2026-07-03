/* ===========================================================
   Analytics看板(演示原型,All为模拟经营数据)
   =========================================================== */

(() => {
  const $ = (s) => document.querySelector(s);
  const D = YXDATA.ANALYTICS;
  const CHANNEL_COLORS = ["var(--chart-indigo)","var(--chart-magenta)","var(--chart-teal)","var(--chart-gold)"];

  function renderKpis(){
    $("#kpiGrid").innerHTML = D.kpis.map(k => `
      <div class="stat-tile">
        <div class="label">${k.label}</div>
        <div class="value">${k.value}</div>
        <div class="delta ${k.up?'up':'down'}">${k.up?'▲':'▼'} ${k.delta} <span class="muted" style="margin-left:.2em">vs last month</span></div>
      </div>
    `).join("");
  }

  function renderLegend(container, items){
    container.innerHTML = items.map(it => `
      <span class="lg"><span class="sw" style="background:${resolve(it.color)}"></span>${it.name}</span>
    `).join("");
  }
  function resolve(c){
    if(c && c.startsWith("var(")) return getComputedStyle(document.documentElement).getPropertyValue(c.slice(4,-1).trim()).trim();
    return c;
  }

  function renderRevenue(){
    YXChart.lineChart($("#revenueChart"), {
      labels: D.revenueTrend.labels,
      series: D.revenueTrend.series,
      height: 280,
      yFormat: v => v,
    });
    renderLegend($("#revenueLegend"), D.revenueTrend.series.map(s=>({name:s.name,color:s.color})));
  }

  function renderService(){
    YXChart.barChart($("#serviceChart"), {
      data: D.servicePopularity,
      horizontal: true,
      height: 220,
      yFormat: v => v,
    });
  }

  function renderTier(){
    YXChart.donutChart($("#tierChart"), { data: D.memberTier, size:200, thickness:26, centerLabel:"Members", yFormat:v=>v.toLocaleString() });
    renderLegend($("#tierLegend"), D.memberTier);
  }

  function renderChannel(){
    const withColors = D.channel.map((c,i)=>({...c, color: CHANNEL_COLORS[i%CHANNEL_COLORS.length]}));
    YXChart.donutChart($("#channelChart"), { data: withColors, size:200, thickness:26, centerLabel:"Share", yFormat:v=>v+"%" });
    renderLegend($("#channelLegend"), withColors);
  }

  function renderSkin(){
    YXChart.barChart($("#skinChart"), {
      data: D.skinConcern,
      height: 240,
      yFormat: v => v,
    });
  }

  function initTableToggles(){
    document.querySelectorAll("[data-toggle-table]").forEach(btn => {
      let shown = false;
      const chartId = btn.dataset.toggleTable;
      const chartEl = document.getElementById(chartId);
      let tableEl = null;
      btn.addEventListener("click", () => {
        shown = !shown;
        if(shown){
          const { headers, rows } = buildTableData(chartId);
          tableEl = document.createElement("div");
          chartEl.parentNode.insertBefore(tableEl, chartEl.nextSibling);
          YXChart.renderTable(tableEl, headers, rows);
          chartEl.style.display = "none";
          btn.textContent = "View Chart";
        }else{
          if(tableEl) tableEl.remove();
          chartEl.style.display = "";
          btn.textContent = "View Data Table";
        }
      });
    });
  }

  function buildTableData(chartId){
    switch(chartId){
      case "revenueChart":
        return {
          headers: ["Month", ...D.revenueTrend.series.map(s=>s.name)],
          rows: D.revenueTrend.labels.map((l,i)=>[l, ...D.revenueTrend.series.map(s=>s.data[i])]),
        };
      case "serviceChart":
        return { headers:["Service","Bookings"], rows: D.servicePopularity.map(d=>[d.name,d.value]) };
      case "tierChart":
        return { headers:["Tier","People"], rows: D.memberTier.map(d=>[d.name,d.value]) };
      case "channelChart":
        return { headers:["Channel","Share (%)"], rows: D.channel.map(d=>[d.name,d.value]) };
      case "skinChart":
        return { headers:["Concern","People"], rows: D.skinConcern.map(d=>[d.name,d.value]) };
    }
    return { headers:[], rows:[] };
  }

  function init(){
    renderKpis();
    renderRevenue();
    renderService();
    renderTier();
    renderChannel();
    renderSkin();
    initTableToggles();
  }

  document.addEventListener("DOMContentLoaded", init);
})();

