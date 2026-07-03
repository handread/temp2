/* ===========================================================
   AI Skin Analysis(演示原型:上传/示例照片 → 模拟分析 → 生成报告)
   分析过程与结果均为前端随机模拟,不做真实图像识别
   =========================================================== */

(() => {
  const HIST_KEY = "yx_skin_history_v1";
  const $ = (s) => document.querySelector(s);

  const DEMO_PHOTO = (() => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
        <rect width="300" height="400" fill="#f3e3e9"/>
        <ellipse cx="150" cy="230" rx="86" ry="108" fill="#e9c6cf"/>
        <circle cx="122" cy="205" r="7" fill="#3a2b3a"/>
        <circle cx="178" cy="205" r="7" fill="#3a2b3a"/>
        <path d="M128 258q22 16 44 0" stroke="#3a2b3a" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M90 160q60-40 120 0" stroke="#5a4235" stroke-width="14" fill="none" stroke-linecap="round"/>
      </svg>`;
    return "data:image/svg+xml;base64," + btoa(svg);
  })();

  let currentImg = null;

  function setImage(src){
    currentImg = src;
    $("#uploadHint").style.display = "none";
    let img = $("#uploadZone img");
    if(!img){
      img = document.createElement("img");
      $("#uploadZone").prepend(img);
    }
    img.src = src;
    $("#startBtn").disabled = false;
  }

  function initUpload(){
    const zone = $("#uploadZone");
    zone.addEventListener("click", (e) => { if(e.target.id!=="startBtn") $("#fileInput").click(); });
    $("#fileInput").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    });
    ["dragover","dragenter"].forEach(ev => zone.addEventListener(ev, (e)=>{ e.preventDefault(); zone.classList.add("drag"); }));
    ["dragleave","drop"].forEach(ev => zone.addEventListener(ev, (e)=>{ e.preventDefault(); zone.classList.remove("drag"); }));
    zone.addEventListener("drop", (e) => {
      const file = e.dataTransfer.files[0];
      if(!file || !file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    });
    $("#demoPhotoBtn").addEventListener("click", () => setImage(DEMO_PHOTO));
    $("#startBtn").addEventListener("click", runAnalysis);
  }

  function rand(min, max){ return Math.round(min + Math.random()*(max-min)); }

  function generateMetrics(){
    return {
      hydration: rand(38,95),
      oil: rand(38,95),
      pore: rand(35,95),
      wrinkle: rand(45,98),
      pigment: rand(40,95),
      firmness: rand(42,95),
    };
  }

  function meterColor(v){
    if(v>=75) return "var(--teal)";
    if(v>=55) return "var(--gold)";
    return "var(--magenta)";
  }

  function skinType(m){
    if(m.hydration<55 && m.oil<60) return "Dry Skin";
    if(m.hydration<62 && m.oil>=72) return "Dehydrated Oily Skin";
    if(m.oil>=75) return "Oily Skin";
    if(m.hydration>=72 && m.oil<=68) return "Balanced Skin";
    return "Combination Skin";
  }

  const STATUS_STEPS = [
    { at:0,  text:"Recognizing facial features..." },
    { at:30, text:"Evaluating hydration and oil balance..." },
    { at:60, text:"Analyzing pores, fine lines, and pigment..." },
    { at:85, text:"Generating personalized care suggestions..." },
  ];

  function runAnalysis(){
    if(!currentImg) return;
    const zone = $("#uploadZone");
    zone.classList.add("scanning");
    $("#startBtn").disabled = true;
    $("#demoPhotoBtn").disabled = true;
    $("#resultPane").innerHTML = `<div class="empty"><div class="ic">✨</div>AI is generating the analysis report...</div>`;

    const scanBar = $("#scanBar");
    scanBar.style.display = "block";
    let progress = 0;
    const totalMs = 2600;
    const stepMs = 60;
    const timer = setInterval(() => {
      progress += 100 * (stepMs/totalMs);
      if(progress > 100) progress = 100;
      $("#progFill").style.width = progress + "%";
      scanBar.style.top = progress + "%";
      const step = [...STATUS_STEPS].reverse().find(s => progress >= s.at);
      if(step) $("#statusLine").textContent = step.text;
      if(progress >= 100){
        clearInterval(timer);
        setTimeout(finishAnalysis, 200);
      }
    }, stepMs);
  }

  function finishAnalysis(){
    const zone = $("#uploadZone");
    zone.classList.remove("scanning");
    $("#scanBar").style.display = "none";
    $("#startBtn").disabled = false;
    $("#demoPhotoBtn").disabled = false;

    const metrics = generateMetrics();
    const score = Math.round(Object.values(metrics).reduce((a,b)=>a+b,0)/6);
    const type = skinType(metrics);

    renderResult(metrics, score, type);
    saveHistory(metrics, score, type);
    renderHistory();
    YX.toast("AI analysis complete");
  }

  function renderResult(metrics, score, type){
    const pane = $("#resultPane");
    pane.innerHTML = `
      <div class="score-hero">
        <div class="score-circle" style="--p:${score}"><div class="inner"><b>${score}</b><small>Overall Score</small></div></div>
        <div>
          <div class="tag">${type}</div>
          <p style="margin-top:.6rem;font-size:.9rem;color:var(--ink-soft)">Based on the uploaded photo simulation, the six scores are shown below. Higher scores indicate healthier status.</p>
        </div>
      </div>

      <div class="radar-wrap mt-2" id="radarBox"></div>

      <div class="card mt-2" id="metricList"></div>

      <div class="mt-2">
        <h3 style="font-size:1.05rem;margin-bottom:1rem">Personalized Care Suggestions</h3>
        <div class="grid" style="gap:.9rem" id="recList"></div>
      </div>
    `;

    YXChart.radarChart($("#radarBox"), {
      labels: YXDATA.SKIN_METRICS.map(m=>m.label),
      data: YXDATA.SKIN_METRICS.map(m=>metrics[m.key]),
      size: 320,
      color: "var(--magenta)",
    });

    $("#metricList").innerHTML = YXDATA.SKIN_METRICS.map(m => {
      const v = metrics[m.key];
      return `
        <div class="metric-row">
          <div class="name">${m.label}</div>
          <div class="meter-track"><div class="meter-fill" style="width:${v}%;background:${meterColor(v)}"></div></div>
          <div class="val">${v}</div>
        </div>
      `;
    }).join("");

    const recs = YXDATA.SKIN_METRICS
      .map(m => ({ m, v: metrics[m.key] }))
      .filter(x => x.v < 70)
      .sort((a,b)=>a.v-b.v)
      .slice(0,4);

    const recEl = $("#recList");
    if(!recs.length){
      recEl.innerHTML = `<div class="empty" style="padding:1.4rem"><div class="ic">🌟</div>All metrics look good. Continue daily care.</div>`;
    }else{
      recEl.innerHTML = recs.map(({m,v}) => {
        const r = YXDATA.SKIN_RECOMMEND[m.key];
        const svc = YXDATA.svcById(r.svc);
        const prod = YXDATA.prodById(r.prod);
        return `
          <div class="rec-card">
            <div class="tip"><b>${m.label} ${v}分</b> · ${r.tip}</div>
            <div class="flex gap-1">
              <a href="booking.html?svc=${svc.id}" class="btn btn-outline btn-sm">Book "${svc.name}」</a>
              <a href="shop.html?product=${prod.id}" class="btn btn-ghost btn-sm">View "${prod.name}」</a>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  function saveHistory(metrics, score, type){
    const list = getHistory();
    list.unshift({ when: new Date().toISOString().slice(0,16).replace("T"," "), score, type, metrics });
    localStorage.setItem(HIST_KEY, JSON.stringify(list.slice(0,6)));
  }
  function getHistory(){
    try{ return JSON.parse(localStorage.getItem(HIST_KEY)) || []; }catch(e){ return []; }
  }
  function renderHistory(){
    const list = getHistory();
    if(!list.length){ $("#historyBox").style.display = "none"; return; }
    $("#historyBox").style.display = "block";
    $("#historyStrip").innerHTML = list.map(h => `
      <div class="history-item">
        <div class="sc">${h.score}</div>
        <div class="muted" style="font-size:.72rem;margin-top:.2rem">${h.when}</div>
        <div class="tag muted mt-1" style="font-size:.68rem">${h.type}</div>
      </div>
    `).join("");
  }

  function init(){
    initUpload();
    renderHistory();
  }

  document.addEventListener("DOMContentLoaded", init);
})();

