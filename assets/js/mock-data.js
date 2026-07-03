/* ===========================================================
   颜汐 YANXI AI · mock data
   演示原型专用:全部为模拟数据,不连接真实数据库 / AI 服务
   =========================================================== */

const YXDATA = (() => {

  /* ---------------- 服务项目(预约系统 / 商城套餐共用) ---------------- */
  const SERVICES = [
    { id:"svc-ai-scan",  cat:"AI 检测", name:"AI 智能皮肤检测", duration:20, price:0,   tag:"免费", desc:"多维度 AI 皮肤扫描,生成专属分析报告" },
    { id:"svc-hydra",    cat:"基础护理", name:"深层清洁水光护理", duration:60, price:680, desc:"清洁 + 补水,唤醒肌肤基础状态" },
    { id:"svc-photo",    cat:"光电项目", name:"光子嫩肤", duration:45, price:1280, desc:"改善肤色不均、细小毛孔" },
    { id:"svc-laser-rf", cat:"光电项目", name:"热塑轮廓紧致", duration:60, price:2480, desc:"射频热能刺激胶原新生,提升轮廓" },
    { id:"svc-hyaluron", cat:"注射项目", name:"玻尿酸精雕填充", duration:40, price:3200, desc:"精准塑形,自然饱满" },
    { id:"svc-water",    cat:"注射项目", name:"水光针基础补水", duration:35, price:1580, desc:"直达真皮层补水,改善干纹" },
    { id:"svc-botox",    cat:"注射项目", name:"肉毒素动态除皱", duration:30, price:1980, desc:"改善表情纹,维持自然表情" },
    { id:"svc-peel",     cat:"基础护理", name:"果酸焕肤疗程", duration:40, price:880, desc:"促进角质代谢,改善暗沉粗糙" },
    { id:"svc-eye",      cat:"精细项目", name:"眼部年轻化管理", duration:45, price:1680, desc:"针对眼周细纹与黑眼圈" },
  ];

  /* ---------------- 医生 / 技师 ---------------- */
  const STAFF = [
    { id:"st-01", name:"林知夏", title:"皮肤管理首席顾问", years:12, tags:["光电项目","基础护理"], color:"linear-gradient(150deg,#c96b8a,#8a2447)" },
    { id:"st-02", name:"陈屿", title:"注射美塑主诊医师", years:9,  tags:["注射项目","精细项目"], color:"linear-gradient(150deg,#3f7cae,#2b5a86)" },
    { id:"st-03", name:"周雅", title:"抗衰老与再生方向", years:15, tags:["光电项目","注射项目"], color:"linear-gradient(150deg,#2f7d74,#1f5a53)" },
    { id:"st-04", name:"AI 智能顾问", title:"全天候在线 · 初步方案建议", years:0, tags:["AI 检测"], color:"linear-gradient(150deg,#c9a23c,#a07c22)" },
  ];

  /* ---------------- 商城商品 ---------------- */
  const PRODUCTS = [
    { id:"p-01", cat:"护肤精华", name:"细胞焕活修护精华", price:980,  originalPrice:1280, tag:"热卖", rating:4.9, sold:2361, grad:["#fbe9f0","#b8355f"], desc:"高浓度活性成分,针对性修护肌底,提升肌肤弹性与光泽感。" },
    { id:"p-02", cat:"护肤精华", name:"5-ALA 能量焕颜精华", price:1180, originalPrice:1480, tag:"新品", rating:4.8, sold:958,  grad:["#f6ede0","#a9862c"], desc:"呼应线粒体能量代谢理念,配合日常护理,提亮肤色。" },
    { id:"p-03", cat:"面膜/急救", name:"水光注氧面膜(5 片装)", price:420, originalPrice:520,  tag:"补水",  rating:4.7, sold:4520, grad:["#e6f2f1","#1b857c"], desc:"术后急救舒缓,快速补水镇静。" },
    { id:"p-04", cat:"面膜/急救", name:"舒缓修护冻膜", price:360, originalPrice:null, tag:null, rating:4.6, sold:1875, grad:["#eef1f7","#243f6e"], desc:"敏感肌可用,舒缓泛红与刺激感。" },
    { id:"p-05", cat:"防晒/日常", name:"轻透物理防晒乳 SPF50+", price:268, originalPrice:328, tag:"必备", rating:4.9, sold:6210, grad:["#fdf3e7","#c9a23c"], desc:"术后与日常防护首选,质地清透不泛白。" },
    { id:"p-06", cat:"防晒/日常", name:"晚安屏障修护乳", price:398, originalPrice:null, tag:null, rating:4.7, sold:1420, grad:["#f3eef7","#5a4b86"], desc:"夜间强化屏障,配合治疗周期使用。" },
    { id:"p-07", cat:"医美套餐", name:"光子嫩肤 3 次疗程套餐", price:3280, originalPrice:3840, tag:"套餐优惠", rating:4.9, sold:612, grad:["#fbe9f0","#b8355f"], desc:"配合 AI 皮肤检测,定制三次光电疗程排期。" },
    { id:"p-08", cat:"医美套餐", name:"水光针年度会员套餐(6 次)", price:7980, originalPrice:9480, tag:"会员专享", rating:5.0, sold:340, grad:["#eef1f7","#243f6e"], desc:"全年补水管理,黑金会员额外赠送 1 次。" },
    { id:"p-09", cat:"仪器项目", name:"热塑轮廓紧致单次体验", price:1980, originalPrice:2480, tag:"体验价", rating:4.8, sold:288, grad:["#e6f2f1","#1b857c"], desc:"首次体验专属价格,含 AI 术前评估。" },
    { id:"p-10", cat:"礼品卡", name:"颜汐 · 电子礼品卡 ¥1000", price:1000, originalPrice:null, tag:"电子卡", rating:5.0, sold:150, grad:["#fdf3e7","#c9a23c"], desc:"可用于抵扣任意医美项目或商城商品。" },
    { id:"p-11", cat:"护肤精华", name:"胶原紧致精华眼霜", price:560, originalPrice:680, tag:null, rating:4.6, sold:1023, grad:["#f6ede0","#a9862c"], desc:"针对眼周细纹与松弛,质地清爽易吸收。" },
    { id:"p-12", cat:"仪器项目", name:"皮肤屏障检测 + 定制方案", price:198, originalPrice:298, tag:"入门推荐", rating:4.9, sold:3025, grad:["#eef1f7","#243f6e"], desc:"AI 检测 + 顾问 1v1 解读,新客首选。" },
  ];

  /* ---------------- 会员体系 ---------------- */
  const TIERS = [
    { key:"silver",   name:"银卡会员", min:0,    color:"#9099AF", perk:["生日礼遇","积分 1x 累积"] },
    { key:"gold",     name:"金卡会员", min:3000, color:"#A9862C", perk:["生日礼遇","积分 1.2x 累积","专属顾问预约优先"] },
    { key:"platinum", name:"铂金会员", min:8000, color:"#243F6E", perk:["积分 1.5x 累积","专属顾问预约优先","每年 1 次免费 AI 深度检测"] },
    { key:"black",    name:"黑金会员", min:20000,color:"#141E36", perk:["积分 2x 累积","专属顾问 1v1","每年 2 次免费项目","新品优先体验"] },
  ];

  const CURRENT_MEMBER = {
    name:"陈小姐", phone:"138****6699", id:"YX2024081206",
    tier:"gold", points:4360, totalSpend:6280, joined:"2024-03-12",
    nextTier:"platinum", nextTierNeed:8000,
  };

  const POINTS_HISTORY = [
    { when:"2026-06-28", what:"完成「玻尿酸精雕填充」消费", delta:"+320", neg:false },
    { when:"2026-06-28", what:"AI 皮肤检测分享至好友", delta:"+30",  neg:false },
    { when:"2026-06-15", what:"兑换「细胞焕活修护精华」", delta:"-980", neg:true },
    { when:"2026-05-30", what:"完成「光子嫩肤」消费", delta:"+128", neg:false },
    { when:"2026-05-02", what:"会员日双倍积分奖励", delta:"+200", neg:false },
    { when:"2026-04-18", what:"完成「水光针基础补水」消费", delta:"+158", neg:false },
  ];

  const APPOINTMENT_HISTORY = [
    { when:"2026-06-28 14:00", svc:"玻尿酸精雕填充", staff:"陈屿", status:"已完成" },
    { when:"2026-05-30 10:30", svc:"光子嫩肤", staff:"林知夏", status:"已完成" },
    { when:"2026-04-18 16:00", svc:"水光针基础补水", staff:"陈屿", status:"已完成" },
    { when:"2026-03-12 11:00", svc:"AI 智能皮肤检测", staff:"AI 智能顾问", status:"已完成" },
  ];

  /* ---------------- AI 皮肤分析:维度与建议映射 ---------------- */
  const SKIN_METRICS = [
    { key:"hydration", label:"水分", desc:"角质层含水量" },
    { key:"oil",       label:"油脂", desc:"T区皮脂分泌水平" },
    { key:"pore",      label:"毛孔", desc:"毛孔粗大与堵塞情况" },
    { key:"wrinkle",   label:"细纹", desc:"动态纹与静态纹" },
    { key:"pigment",   label:"色斑", desc:"色素沉着均匀度" },
    { key:"firmness",  label:"紧致度", desc:"皮肤弹性与轮廓支撑" },
  ];

  /* 每项分数为「健康度」,0-100,越高越好;低于阈值触发对应建议 */
  const SKIN_RECOMMEND = {
    hydration: { svc:"svc-hydra",   prod:"p-03", tip:"角质层含水量偏低,建议加强深层补水护理" },
    oil:       { svc:"svc-peel",    prod:"p-04", tip:"T区出油偏旺,建议控油 + 定期焕肤管理" },
    pore:      { svc:"svc-photo",   prod:"p-01", tip:"毛孔状态较粗大,可考虑光子嫩肤配合精华" },
    wrinkle:   { svc:"svc-botox",   prod:"p-11", tip:"细纹信号较明显,建议评估动态纹管理方案" },
    pigment:   { svc:"svc-photo",   prod:"p-02", tip:"色素分布不均,建议光电改善 + 美白精华" },
    firmness:  { svc:"svc-laser-rf",prod:"p-01", tip:"皮肤紧致度下降,建议评估轮廓紧致项目" },
  };

  function svcById(id){ return SERVICES.find(s=>s.id===id); }
  function prodById(id){ return PRODUCTS.find(p=>p.id===id); }

  /* ---------------- 智能客服问答库(关键词匹配) ---------------- */
  const CHAT_QUICK = ["价格咨询","预约流程","AI皮肤检测","术后护理","门店地址","优惠活动"];

  const CHAT_RULES = [
    { kws:["你好","您好","在吗","hi","hello"], reply:"您好呀,我是颜汐 AI 客服小汐 👋 可以问我预约、项目价格、AI 皮肤检测或门店信息,也可以点击下方快捷问题~" },
    { kws:["价格","多少钱","费用","报价"], reply:"我们的项目价格区间大致为:基础护理 ¥360–¥880,光电项目 ¥1280–¥2480,注射项目 ¥1580–¥3200。具体报价会结合您的 AI 皮肤检测结果定制,建议先完成一次免费的「AI 智能皮肤检测」哦。" },
    { kws:["预约","约时间","怎么约","预定"], reply:"预约很简单:进入「预约系统」→ 选择项目 → 选择医生/技师 → 选择日期时间 → 填写联系方式确认即可,全程约 1 分钟。需要我直接带您跳转吗?" },
    { kws:["ai","检测","皮肤分析","扫描"], reply:"「AI 皮肤分析」支持上传照片,约 15 秒生成水分、油脂、毛孔、细纹、色斑、紧致度六项评分,并给出个性化护理建议,完全免费,是很多新客户的第一步~" },
    { kws:["术后","护理","恢复","注意事项"], reply:"术后护理小贴士:24 小时内避免沾水与化妆、48 小时内避免高温环境(桑拿/汗蒸)、坚持温和保湿与严格防晒。具体项目会有专属顾问跟进护理提醒。" },
    { kws:["地址","门店","位置","在哪"], reply:"目前演示门店位于:上海静安店 / 北京朝阳店 / 深圳南山店,营业时间 10:00–21:00(周一至周日)。真实地址信息会在正式上线后同步。" },
    { kws:["优惠","活动","折扣","满减"], reply:"本月活动:新客首次「AI 皮肤检测 + 顾问解读」仅 ¥198;会员日全场积分双倍;满 ¥3000 赠送水光针体验一次。活动详情可在「臻选商城」查看。" },
    { kws:["会员","积分","等级"], reply:"会员体系分为银卡 / 金卡 / 铂金 / 黑金四个等级,累计消费越多,权益越丰富,包括专属顾问、积分加成与免费项目。可以在「会员中心」查看您的当前等级与进度。" },
    { kws:["人工","转人工","真人","客服"], reply:"已为您标记转接人工客服,真实门店上线后将由专属顾问在工作时间内(10:00–21:00)与您联系。本演示环境暂不支持真人接入。" },
  ];
  const CHAT_FALLBACK = "这个问题我暂时还没学会呢~ 您可以换个说法,或点击下方快捷问题,也可以直接前往「预约系统」联系专属顾问。";

  /* ---------------- 经营数据分析(模拟) ---------------- */
  const ANALYTICS = {
    kpis: [
      { label:"本月营收", value:"¥286,400", delta:"+12.4%", up:true },
      { label:"预约人次", value:"1,024",     delta:"+8.1%",  up:true },
      { label:"新增会员", value:"186",       delta:"+5.6%",  up:true },
      { label:"AI 检测次数", value:"742",     delta:"+21.3%", up:true },
      { label:"复购率", value:"46.8%",       delta:"-1.2%",  up:false },
      { label:"客单价", value:"¥1,860",      delta:"+3.4%",  up:true },
    ],
    revenueTrend: {
      labels:["1月","2月","3月","4月","5月","6月","7月"],
      series:[
        { key:"revenue", name:"营收 (万元)", color:"var(--chart-indigo)", data:[18.2,19.6,21.4,24.8,23.1,27.9,28.6] },
        { key:"target",  name:"目标 (万元)", color:"var(--chart-gold)",   data:[18,20,21,23,24,26,27] },
      ]
    },
    servicePopularity: [
      { name:"光子嫩肤", value:312, color:"var(--chart-magenta)" },
      { name:"水光针补水", value:268, color:"var(--chart-indigo)" },
      { name:"AI 皮肤检测", value:742, color:"var(--chart-teal)" },
      { name:"热塑轮廓紧致", value:154, color:"var(--chart-gold)" },
      { name:"玻尿酸填充", value:96,  color:"var(--chart-magenta)" },
    ],
    memberTier: [
      { name:"银卡", value:1240, color:"var(--chart-indigo)" },
      { name:"金卡", value:860,  color:"var(--chart-gold)" },
      { name:"铂金", value:340,  color:"var(--chart-teal)" },
      { name:"黑金", value:96,   color:"var(--chart-magenta)" },
    ],
    channel: [
      { name:"小程序自主预约", value:46 },
      { name:"AI 客服引导", value:24 },
      { name:"门店到店", value:18 },
      { name:"顾问电话", value:12 },
    ],
    skinConcern: [
      { name:"水分不足", value:38, color:"var(--chart-indigo)" },
      { name:"毛孔粗大", value:27, color:"var(--chart-magenta)" },
      { name:"色斑不均", value:19, color:"var(--chart-gold)" },
      { name:"细纹初现", value:24, color:"var(--chart-teal)" },
      { name:"紧致度下降", value:15, color:"var(--chart-indigo)" },
    ],
  };

  return {
    SERVICES, STAFF, PRODUCTS, TIERS, CURRENT_MEMBER, POINTS_HISTORY, APPOINTMENT_HISTORY,
    SKIN_METRICS, SKIN_RECOMMEND, svcById, prodById,
    CHAT_QUICK, CHAT_RULES, CHAT_FALLBACK, ANALYTICS,
  };
})();
