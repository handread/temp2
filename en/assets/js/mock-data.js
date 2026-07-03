/* ===========================================================
   YANXI AI · English mock data
   Demo only: all data is simulated and not connected to real services.
   =========================================================== */

const YXDATA = (() => {
  const SERVICES = [
    { id:"svc-ai-scan", cat:"AI Diagnosis", name:"AI Smart Skin Scan", duration:20, price:0, tag:"Free", desc:"Multi-dimensional AI skin scan with a personalized report" },
    { id:"svc-hydra", cat:"Basic Care", name:"Deep Clean Hydration Care", duration:60, price:680, desc:"Cleansing and hydration to refresh the skin base" },
    { id:"svc-photo", cat:"Light Therapy", name:"Photofacial Rejuvenation", duration:45, price:1280, desc:"Improves uneven tone and visible pores" },
    { id:"svc-laser-rf", cat:"Light Therapy", name:"RF Contour Tightening", duration:60, price:2480, desc:"Radiofrequency energy supports collagen renewal and contour lift" },
    { id:"svc-hyaluron", cat:"Injectables", name:"Hyaluronic Acid Contouring", duration:40, price:3200, desc:"Precision shaping for natural volume" },
    { id:"svc-water", cat:"Injectables", name:"Skin Booster Hydration", duration:35, price:1580, desc:"Deep hydration for dryness and fine lines" },
    { id:"svc-botox", cat:"Injectables", name:"Botulinum Dynamic Wrinkle Care", duration:30, price:1980, desc:"Softens expression lines while preserving natural movement" },
    { id:"svc-peel", cat:"Basic Care", name:"AHA Renewal Peel", duration:40, price:880, desc:"Promotes renewal and improves dull, rough texture" },
    { id:"svc-eye", cat:"Detail Care", name:"Eye Rejuvenation Management", duration:45, price:1680, desc:"Targets fine lines and dark circles around the eyes" },
  ];

  const STAFF = [
    { id:"st-01", name:"Z. Lin", title:"Lead Skin Consultant", years:12, tags:["Light Therapy","Basic Care"], color:"linear-gradient(150deg,#c96b8a,#8a2447)" },
    { id:"st-02", name:"Y. Chen", title:"Injectable Design Physician", years:9, tags:["Injectables","Detail Care"], color:"linear-gradient(150deg,#3f7cae,#2b5a86)" },
    { id:"st-03", name:"Y. Zhou", title:"Anti-aging and Regeneration Specialist", years:15, tags:["Light Therapy","Injectables"], color:"linear-gradient(150deg,#2f7d74,#1f5a53)" },
    { id:"st-04", name:"AI Advisor", title:"24/7 online preliminary plan", years:0, tags:["AI Diagnosis"], color:"linear-gradient(150deg,#c9a23c,#a07c22)" },
  ];

  const PRODUCTS = [
    { id:"p-01", cat:"Serum", name:"Cell Renewal Repair Serum", price:980, originalPrice:1280, tag:"Hot", rating:4.9, sold:2361, grad:["#fbe9f0","#b8355f"], desc:"High-potency actives for barrier repair, elasticity, and radiance." },
    { id:"p-02", cat:"Serum", name:"5-ALA Energy Glow Serum", price:1180, originalPrice:1480, tag:"New", rating:4.8, sold:958, grad:["#f6ede0","#a9862c"], desc:"Inspired by cellular energy metabolism to brighten daily skincare." },
    { id:"p-03", cat:"Mask / Rescue", name:"Hydra Oxygen Mask (5 pcs)", price:420, originalPrice:520, tag:"Hydration", rating:4.7, sold:4520, grad:["#e6f2f1","#1b857c"], desc:"Soothing post-treatment hydration and calming care." },
    { id:"p-04", cat:"Mask / Rescue", name:"Soothing Repair Gel Mask", price:360, originalPrice:null, tag:null, rating:4.6, sold:1875, grad:["#eef1f7","#243f6e"], desc:"Gentle repair for sensitive and redness-prone skin." },
    { id:"p-05", cat:"Sun / Daily", name:"Light Mineral Sunscreen SPF50+", price:268, originalPrice:328, tag:"Daily", rating:4.9, sold:6210, grad:["#fdf3e7","#c9a23c"], desc:"Lightweight protection for daily and post-treatment use." },
    { id:"p-06", cat:"Sun / Daily", name:"Night Barrier Repair Milk", price:398, originalPrice:null, tag:null, rating:4.7, sold:1420, grad:["#f3eef7","#5a4b86"], desc:"Strengthens the barrier during nighttime repair cycles." },
    { id:"p-07", cat:"Treatment Package", name:"Photofacial 3-Session Package", price:3280, originalPrice:3840, tag:"Package", rating:4.9, sold:612, grad:["#fbe9f0","#b8355f"], desc:"Three-session schedule based on AI skin assessment." },
    { id:"p-08", cat:"Treatment Package", name:"Annual Skin Booster Package (6 sessions)", price:7980, originalPrice:9480, tag:"Member", rating:5.0, sold:340, grad:["#eef1f7","#243f6e"], desc:"Year-round hydration management with member benefits." },
    { id:"p-09", cat:"Device Treatment", name:"RF Contour Tightening Trial", price:1980, originalPrice:2480, tag:"Trial", rating:4.8, sold:288, grad:["#e6f2f1","#1b857c"], desc:"First-time trial including AI pre-assessment." },
    { id:"p-10", cat:"Gift Card", name:"YANXI E-Gift Card ¥1000", price:1000, originalPrice:null, tag:"E-card", rating:5.0, sold:150, grad:["#fdf3e7","#c9a23c"], desc:"Can be used for demo treatments or shop products." },
    { id:"p-11", cat:"Serum", name:"Collagen Firming Eye Cream", price:560, originalPrice:680, tag:null, rating:4.6, sold:1023, grad:["#f6ede0","#a9862c"], desc:"Lightweight eye care for fine lines and laxity." },
    { id:"p-12", cat:"Device Treatment", name:"Skin Barrier Test + Custom Plan", price:198, originalPrice:298, tag:"Starter", rating:4.9, sold:3025, grad:["#eef1f7","#243f6e"], desc:"AI scan plus 1-on-1 consultant interpretation." },
  ];

  const TIERS = [
    { key:"silver", name:"Silver", min:0, color:"#9099AF", perk:["Birthday gift","1x points"] },
    { key:"gold", name:"Gold", min:3000, color:"#A9862C", perk:["Birthday gift","1.2x points","Priority consultant booking"] },
    { key:"platinum", name:"Platinum", min:8000, color:"#243F6E", perk:["1.5x points","Priority consultant booking","1 free AI deep scan per year"] },
    { key:"black", name:"Black Gold", min:20000, color:"#141E36", perk:["2x points","1-on-1 consultant","2 free treatments per year","Early product access"] },
  ];

  const CURRENT_MEMBER = { name:"Ms. Chen", phone:"138****6699", id:"YX2024081206", tier:"gold", points:4360, totalSpend:6280, joined:"2024-03-12", nextTier:"platinum", nextTierNeed:8000 };
  const POINTS_HISTORY = [
    { when:"2026-06-28", what:"Completed Hyaluronic Acid Contouring", delta:"+320", neg:false },
    { when:"2026-06-28", what:"Shared AI skin scan with a friend", delta:"+30", neg:false },
    { when:"2026-06-15", what:"Redeemed Cell Renewal Repair Serum", delta:"-980", neg:true },
    { when:"2026-05-30", what:"Completed Photofacial Rejuvenation", delta:"+128", neg:false },
    { when:"2026-05-02", what:"Member day double points", delta:"+200", neg:false },
    { when:"2026-04-18", what:"Completed Skin Booster Hydration", delta:"+158", neg:false },
  ];
  const APPOINTMENT_HISTORY = [
    { when:"2026-06-28 14:00", svc:"Hyaluronic Acid Contouring", staff:"Y. Chen", status:"Completed" },
    { when:"2026-05-30 10:30", svc:"Photofacial Rejuvenation", staff:"Z. Lin", status:"Completed" },
    { when:"2026-04-18 16:00", svc:"Skin Booster Hydration", staff:"Y. Chen", status:"Completed" },
    { when:"2026-03-12 11:00", svc:"AI Smart Skin Scan", staff:"AI Advisor", status:"Completed" },
  ];

  const SKIN_METRICS = [
    { key:"hydration", label:"Hydration", desc:"Stratum corneum water level" },
    { key:"oil", label:"Oil", desc:"T-zone sebum level" },
    { key:"pore", label:"Pores", desc:"Pore visibility and congestion" },
    { key:"wrinkle", label:"Fine Lines", desc:"Dynamic and static lines" },
    { key:"pigment", label:"Pigment", desc:"Pigmentation evenness" },
    { key:"firmness", label:"Firmness", desc:"Elasticity and contour support" },
  ];
  const SKIN_RECOMMEND = {
    hydration:{ svc:"svc-hydra", prod:"p-03", tip:"Hydration is low. Consider deep hydration care." },
    oil:{ svc:"svc-peel", prod:"p-04", tip:"Oil is high. Consider oil control and regular renewal care." },
    pore:{ svc:"svc-photo", prod:"p-01", tip:"Pores are visible. Photofacial care with serum support may help." },
    wrinkle:{ svc:"svc-botox", prod:"p-11", tip:"Fine-line signals are visible. Consider wrinkle management assessment." },
    pigment:{ svc:"svc-photo", prod:"p-02", tip:"Pigment distribution is uneven. Consider light therapy and brightening care." },
    firmness:{ svc:"svc-laser-rf", prod:"p-01", tip:"Firmness is reduced. Consider contour tightening assessment." },
  };
  function svcById(id){ return SERVICES.find(s=>s.id===id); }
  function prodById(id){ return PRODUCTS.find(p=>p.id===id); }

  const CHAT_QUICK = ["Pricing", "Booking", "AI skin scan", "Aftercare", "Store address", "Promotions"];
  const CHAT_RULES = [
    { kws:["hi","hello","hey"], reply:"Hi, I am YANXI AI assistant. Ask me about booking, pricing, AI skin analysis, membership, aftercare, or store information." },
    { kws:["price","cost","pricing","fee"], reply:"Demo price ranges: basic care ¥360-¥880, light therapy ¥1280-¥2480, injectables ¥1580-¥3200. A custom plan can be suggested after the free AI skin scan." },
    { kws:["book","booking","appointment","reserve"], reply:"Booking takes about one minute: choose a service, select a consultant, pick a date and time, then confirm your contact details." },
    { kws:["ai","scan","skin","analysis"], reply:"AI Skin Analysis simulates six scores: hydration, oil, pores, fine lines, pigment, and firmness, then recommends related treatments and products." },
    { kws:["aftercare","recover","care"], reply:"Aftercare tips: avoid water and makeup for 24 hours, avoid high heat for 48 hours, and keep hydration and sun protection consistent." },
    { kws:["address","store","location"], reply:"Demo stores: Shanghai Jing'an, Beijing Chaoyang, and Shenzhen Nanshan. Hours: 10:00-21:00 daily." },
    { kws:["promo","discount","campaign"], reply:"Demo promotions: first AI scan plus consultant interpretation for ¥198, double points on member day, and a gift treatment over ¥3000." },
    { kws:["member","membership","points","tier"], reply:"Membership has Silver, Gold, Platinum, and Black Gold tiers, with points multipliers, priority booking, and free service benefits." },
    { kws:["human","agent","staff"], reply:"A handoff to a human consultant has been marked. This demo does not connect to a real live agent." },
  ];
  const CHAT_FALLBACK = "I do not have an answer for that yet. Try another wording, use a quick question, or go to Booking to contact a consultant.";

  const ANALYTICS = {
    kpis:[
      { label:"Monthly Revenue", value:"¥286,400", delta:"+12.4%", up:true },
      { label:"Bookings", value:"1,024", delta:"+8.1%", up:true },
      { label:"New Members", value:"186", delta:"+5.6%", up:true },
      { label:"AI Scans", value:"742", delta:"+21.3%", up:true },
      { label:"Repurchase Rate", value:"46.8%", delta:"-1.2%", up:false },
      { label:"Average Order", value:"¥1,860", delta:"+3.4%", up:true },
    ],
    revenueTrend:{ labels:["Jan","Feb","Mar","Apr","May","Jun","Jul"], series:[ { key:"revenue", name:"Revenue (10k)", color:"var(--chart-indigo)", data:[18.2,19.6,21.4,24.8,23.1,27.9,28.6] }, { key:"target", name:"Target (10k)", color:"var(--chart-gold)", data:[18,20,21,23,24,26,27] } ] },
    servicePopularity:[ { name:"Photofacial", value:312, color:"var(--chart-magenta)" }, { name:"Skin Booster", value:268, color:"var(--chart-indigo)" }, { name:"AI Skin Scan", value:742, color:"var(--chart-teal)" }, { name:"RF Tightening", value:154, color:"var(--chart-gold)" }, { name:"HA Contouring", value:96, color:"var(--chart-magenta)" } ],
    memberTier:[ { name:"Silver", value:1240, color:"var(--chart-indigo)" }, { name:"Gold", value:860, color:"var(--chart-gold)" }, { name:"Platinum", value:340, color:"var(--chart-teal)" }, { name:"Black Gold", value:96, color:"var(--chart-magenta)" } ],
    channel:[ { name:"Mini-app Booking", value:46 }, { name:"AI Assistant", value:24 }, { name:"Walk-in", value:18 }, { name:"Phone Consultant", value:12 } ],
    skinConcern:[ { name:"Low Hydration", value:38, color:"var(--chart-indigo)" }, { name:"Visible Pores", value:27, color:"var(--chart-magenta)" }, { name:"Uneven Pigment", value:19, color:"var(--chart-gold)" }, { name:"Fine Lines", value:24, color:"var(--chart-teal)" }, { name:"Low Firmness", value:15, color:"var(--chart-indigo)" } ],
  };

  return { SERVICES, STAFF, PRODUCTS, TIERS, CURRENT_MEMBER, POINTS_HISTORY, APPOINTMENT_HISTORY, SKIN_METRICS, SKIN_RECOMMEND, svcById, prodById, CHAT_QUICK, CHAT_RULES, CHAT_FALLBACK, ANALYTICS };
})();

