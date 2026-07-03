/* ===========================================================
   依欣 YIXIN AI · tiny SVG chart helpers
   thin marks · 2px lines · 4px rounded bar caps · hairline grid
   hover tooltip · table-view toggle (per dataviz skill guidance)
   =========================================================== */

const YXChart = (() => {

  function resolveColor(c){
    if(c && c.startsWith("var(")){
      const name = c.slice(4,-1).trim();
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#243F6E";
    }
    return c;
  }

  function svgEl(tag, attrs){
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for(const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  function ensureTooltip(container){
    let tip = container.querySelector(".chart-tooltip");
    if(!tip){
      tip = document.createElement("div");
      tip.className = "chart-tooltip";
      container.style.position = "relative";
      container.appendChild(tip);
    }
    return tip;
  }

  function showTip(container, tip, x, y, html){
    tip.innerHTML = html;
    tip.style.left = x + "px";
    tip.style.top = y + "px";
    tip.classList.add("show");
  }
  function hideTip(tip){ tip.classList.remove("show"); }

  /* ---------------- Line chart (multi-series) ---------------- */
  function lineChart(container, opts){
    const { labels, series, height=240, yFormat=(v)=>v } = opts;
    container.innerHTML = "";
    const W = container.clientWidth || 600, H = height;
    const padL=40, padR=16, padT=16, padB=28;
    const plotW = W - padL - padR, plotH = H - padT - padB;

    const allVals = series.flatMap(s=>s.data);
    const maxV = Math.ceil(Math.max(...allVals) * 1.15);
    const minV = 0;

    const svg = svgEl("svg", { viewBox:`0 0 ${W} ${H}`, width:"100%", height:H, role:"img", "aria-label":"折线图" });

    const x = (i) => padL + (plotW * i) / (labels.length - 1);
    const y = (v) => padT + plotH - (plotH * (v - minV)) / (maxV - minV);

    // gridlines (hairline, recessive)
    const gridSteps = 4;
    for(let i=0;i<=gridSteps;i++){
      const gy = padT + (plotH * i) / gridSteps;
      const val = Math.round(maxV - (maxV * i) / gridSteps);
      svg.appendChild(svgEl("line", { x1:padL, x2:W-padR, y1:gy, y2:gy, stroke:"var(--chart-grid)", "stroke-width":1 }));
      const t = svgEl("text", { x:padL-8, y:gy+4, "text-anchor":"end", "font-size":10, fill:"var(--chart-axis)" });
      t.textContent = yFormat(val);
      svg.appendChild(t);
    }
    // x labels
    labels.forEach((l,i)=>{
      const t = svgEl("text", { x:x(i), y:H-8, "text-anchor":"middle", "font-size":10, fill:"var(--chart-axis)" });
      t.textContent = l;
      svg.appendChild(t);
    });

    const tip = ensureTooltip(container);

    series.forEach((s, si) => {
      const color = resolveColor(s.color);
      const pts = s.data.map((v,i)=>[x(i), y(v)]);
      // area wash for first series only, ~10% opacity
      if(si === 0){
        const area = "M" + pts.map(p=>p.join(",")).join(" L") + ` L${x(labels.length-1)},${padT+plotH} L${padL},${padT+plotH} Z`;
        svg.appendChild(svgEl("path", { d:area, fill:color, opacity:.1, stroke:"none" }));
      }
      const line = "M" + pts.map(p=>p.join(",")).join(" L");
      svg.appendChild(svgEl("path", { d:line, fill:"none", stroke:color, "stroke-width":2, "stroke-linecap":"round", "stroke-linejoin":"round" }));

      pts.forEach(([px,py], i) => {
        const dot = svgEl("circle", { cx:px, cy:py, r:4, fill:color, stroke:"var(--surface)", "stroke-width":2, style:"cursor:pointer" });
        dot.addEventListener("mouseenter", () => {
          showTip(container, tip, px, py - 6, `<b>${labels[i]}</b><br>${s.name}: ${yFormat(s.data[i])}`);
        });
        dot.addEventListener("mouseleave", () => hideTip(tip));
        svg.appendChild(dot);
      });
    });

    container.appendChild(svg);
  }

  /* ---------------- Bar chart (vertical, grouped or single) ---------------- */
  function barChart(container, opts){
    const { data, height=240, yFormat=(v)=>v, horizontal=false } = opts;
    container.innerHTML = "";
    const W = container.clientWidth || 600, H = height;
    const tip = ensureTooltip(container);

    if(horizontal){
      const padL = 96, padR = 48, padT = 8, padB = 8;
      const rowH = Math.min(34, (H - padT - padB) / data.length);
      const plotW = W - padL - padR;
      const maxV = Math.max(...data.map(d=>d.value)) * 1.15;
      const svg = svgEl("svg", { viewBox:`0 0 ${W} ${rowH*data.length + padT + padB}`, width:"100%", height:rowH*data.length+padT+padB });
      data.forEach((d,i)=>{
        const color = resolveColor(d.color);
        const barH = Math.min(20, rowH*.55);
        const cy = padT + rowH*i + rowH/2;
        const barW = Math.max(2, (plotW * d.value) / maxV);
        const label = svgEl("text", { x:padL-10, y:cy+4, "text-anchor":"end", "font-size":11.5, fill:"var(--ink-soft)" });
        label.textContent = d.name;
        svg.appendChild(label);
        const track = svgEl("rect", { x:padL, y:cy-barH/2, width:plotW, height:barH, rx:4, fill:"var(--chart-grid)", opacity:.5 });
        svg.appendChild(track);
        const bar = svgEl("rect", { x:padL, y:cy-barH/2, width:barW, height:barH, rx:4, fill:color, style:"cursor:pointer" });
        bar.addEventListener("mouseenter", (e)=> showTip(container, tip, padL+barW, cy-14, `<b>${d.name}</b>: ${yFormat(d.value)}`));
        bar.addEventListener("mouseleave", ()=>hideTip(tip));
        svg.appendChild(bar);
        const val = svgEl("text", { x:padL+barW+8, y:cy+4, "font-size":11.5, fill:"var(--ink)", "font-weight":600 });
        val.textContent = yFormat(d.value);
        svg.appendChild(val);
      });
      container.appendChild(svg);
      return;
    }

    const padL=40, padR=16, padT=16, padB=34;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const maxV = Math.ceil(Math.max(...data.map(d=>d.value)) * 1.2);
    const svg = svgEl("svg", { viewBox:`0 0 ${W} ${H}`, width:"100%", height:H });

    const gridSteps = 4;
    for(let i=0;i<=gridSteps;i++){
      const gy = padT + (plotH * i) / gridSteps;
      const val = Math.round(maxV - (maxV * i) / gridSteps);
      svg.appendChild(svgEl("line", { x1:padL, x2:W-padR, y1:gy, y2:gy, stroke:"var(--chart-grid)", "stroke-width":1 }));
      const t = svgEl("text", { x:padL-8, y:gy+4, "text-anchor":"end", "font-size":10, fill:"var(--chart-axis)" });
      t.textContent = yFormat(val);
      svg.appendChild(t);
    }

    const slot = plotW / data.length;
    const barW = Math.min(28, slot * 0.5);
    data.forEach((d,i) => {
      const color = resolveColor(d.color);
      const bh = plotH * d.value / maxV;
      const bx = padL + slot*i + slot/2 - barW/2;
      const by = padT + plotH - bh;
      const bar = svgEl("rect", { x:bx, y:by, width:barW, height:Math.max(bh,2), rx:4, fill:color, style:"cursor:pointer" });
      bar.addEventListener("mouseenter", ()=> showTip(container, tip, bx+barW/2, by-6, `<b>${d.name}</b>: ${yFormat(d.value)}`));
      bar.addEventListener("mouseleave", ()=>hideTip(tip));
      svg.appendChild(bar);
      const label = svgEl("text", { x:bx+barW/2, y:H-10, "text-anchor":"middle", "font-size":10, fill:"var(--chart-axis)" });
      label.textContent = d.name;
      svg.appendChild(label);
    });

    container.appendChild(svg);
  }

  /* ---------------- Donut chart ---------------- */
  function donutChart(container, opts){
    const { data, size=200, thickness=26, centerLabel="", yFormat=(v)=>v } = opts;
    container.innerHTML = "";
    const tip = ensureTooltip(container);
    const total = data.reduce((s,d)=>s+d.value,0);
    const r = size/2 - thickness/2 - 2;
    const cx = size/2, cy = size/2;
    const gapDeg = 2; // surface gap between segments
    let angle = -90;

    const svg = svgEl("svg", { viewBox:`0 0 ${size} ${size}`, width:size, height:size });
    const circumference = 2*Math.PI*r;

    data.forEach(d=>{
      const color = resolveColor(d.color);
      const frac = d.value/total;
      const deg = frac*360 - gapDeg;
      const dash = (deg/360)*circumference;
      const gap = circumference - dash;
      const rot = angle + gapDeg/2;
      const circle = svgEl("circle", {
        cx, cy, r, fill:"none", stroke:color, "stroke-width":thickness,
        "stroke-dasharray":`${dash} ${gap}`,
        transform:`rotate(${rot} ${cx} ${cy})`,
        style:"cursor:pointer"
      });
      circle.addEventListener("mouseenter", (e)=>{
        const rect = container.getBoundingClientRect();
        showTip(container, tip, size/2, size/2-thickness, `<b>${d.name}</b>: ${yFormat(d.value)} (${(frac*100).toFixed(1)}%)`);
      });
      circle.addEventListener("mouseleave", ()=>hideTip(tip));
      svg.appendChild(circle);
      angle += frac*360;
    });

    if(centerLabel){
      const t1 = svgEl("text", { x:cx, y:cy-4, "text-anchor":"middle", "font-size":13, fill:"var(--muted)" });
      t1.textContent = centerLabel;
      svg.appendChild(t1);
      const t2 = svgEl("text", { x:cx, y:cy+16, "text-anchor":"middle", "font-size":18, fill:"var(--ink)", "font-weight":700 });
      t2.textContent = total.toLocaleString();
      svg.appendChild(t2);
    }

    container.appendChild(svg);
  }

  /* ---------------- Radar chart (skin analysis) ---------------- */
  function radarChart(container, opts){
    const { labels, data, max=100, size=320, color="var(--magenta)" } = opts;
    container.innerHTML = "";
    const c = resolveColor(color);
    const cx = size/2, cy = size/2, r = size/2 - 46;
    const n = labels.length;
    const angleFor = (i) => -Math.PI/2 + (2*Math.PI*i)/n;
    const svg = svgEl("svg", { viewBox:`0 0 ${size} ${size}`, width:"100%", height:size });

    // rings
    [0.25,0.5,0.75,1].forEach(f=>{
      const pts = labels.map((_,i)=>{
        const a = angleFor(i);
        return [cx + r*f*Math.cos(a), cy + r*f*Math.sin(a)];
      });
      svg.appendChild(svgEl("polygon", { points:pts.map(p=>p.join(",")).join(" "), fill:"none", stroke:"var(--chart-grid)", "stroke-width":1 }));
    });
    // spokes + labels
    labels.forEach((l,i)=>{
      const a = angleFor(i);
      const x2 = cx + r*Math.cos(a), y2 = cy + r*Math.sin(a);
      svg.appendChild(svgEl("line", { x1:cx, y1:cy, x2, y2, stroke:"var(--chart-grid)", "stroke-width":1 }));
      const lx = cx + (r+26)*Math.cos(a), ly = cy + (r+26)*Math.sin(a);
      const t = svgEl("text", { x:lx, y:ly+4, "text-anchor":"middle", "font-size":12, fill:"var(--ink-soft)", "font-weight":500 });
      t.textContent = l;
      svg.appendChild(t);
    });
    // data polygon
    const pts = data.map((v,i)=>{
      const a = angleFor(i);
      const f = Math.max(0,Math.min(1,v/max));
      return [cx + r*f*Math.cos(a), cy + r*f*Math.sin(a)];
    });
    svg.appendChild(svgEl("polygon", { points:pts.map(p=>p.join(",")).join(" "), fill:c, opacity:.16, stroke:c, "stroke-width":2 }));
    pts.forEach(([px,py],i)=>{
      const dot = svgEl("circle", { cx:px, cy:py, r:4, fill:c, stroke:"var(--surface)", "stroke-width":2 });
      svg.appendChild(dot);
    });

    container.appendChild(svg);
  }

  function renderTable(container, headers, rows){
    const wrap = document.createElement("div");
    wrap.className = "table-wrap mt-1";
    const thead = headers.map(h=>`<th>${h}</th>`).join("");
    const tbody = rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("");
    wrap.innerHTML = `<table><thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table>`;
    container.appendChild(wrap);
  }

  return { lineChart, barChart, donutChart, radarChart, renderTable };
})();

