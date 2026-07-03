/* ===========================================================
   AI Assistant(演示原型:关键词规则匹配,非真实大模型接入)
   =========================================================== */

(() => {
  const $ = (s) => document.querySelector(s);

  function nowStr(){
    const d = new Date();
    return `${YX.pad(d.getHours())}:${YX.pad(d.getMinutes())}`;
  }

  function appendMsg(role, text){
    const body = $("#chatBody");
    const el = document.createElement("div");
    el.className = `msg ${role}`;
    el.innerHTML = `
      <div class="av">${role==="bot"?"汐":"我"}</div>
      <div>
        <div class="bubble">${text}</div>
        <div class="time">${nowStr()}</div>
      </div>
    `;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  function showTyping(){
    const body = $("#chatBody");
    const el = document.createElement("div");
    el.className = "msg bot typing";
    el.id = "typingMsg";
    el.innerHTML = `<div class="av">汐</div><div class="bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }
  function hideTyping(){
    const el = $("#typingMsg");
    if(el) el.remove();
  }

  function matchReply(text){
    const t = text.toLowerCase();
    for(const rule of YXDATA.CHAT_RULES){
      if(rule.kws.some(k => t.includes(k.toLowerCase()))) return rule.reply;
    }
    return YXDATA.CHAT_FALLBACK;
  }

  function handleUserText(text){
    if(!text.trim()) return;
    appendMsg("user", escapeHtml(text));
    $("#chatInput").value = "";
    showTyping();
    const delay = 500 + Math.random()*500;
    setTimeout(() => {
      hideTyping();
      appendMsg("bot", matchReply(text));
    }, delay);
  }

  function escapeHtml(s){
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function renderQuick(){
    $("#quickRow").innerHTML = YXDATA.CHAT_QUICK.map(q => `<span class="pill" data-q="${q}">${q}</span>`).join("");
    document.querySelectorAll("[data-q]").forEach(p=>{
      p.addEventListener("click", () => handleUserText(p.dataset.q));
    });
  }

  function init(){
    renderQuick();
    appendMsg("bot", YXDATA.CHAT_RULES[0].reply);

    $("#sendBtn").addEventListener("click", () => handleUserText($("#chatInput").value));
    $("#chatInput").addEventListener("keydown", (e) => {
      if(e.key === "Enter") handleUserText($("#chatInput").value);
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();

