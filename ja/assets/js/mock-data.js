/* ===========================================================
   YIXIN AI · Japanese mock data
   デモ専用:すべて模擬データで、実データベース / AIサービスには接続しません
   =========================================================== */

const YXDATA = (() => {

  /* ---------------- 服务施術(预约系统 / 商城套餐共用) ---------------- */
  const SERVICES = [
    { id:"svc-ai-scan",  cat:"AI診断", name:"AIスマート肌診断", duration:20, price:0,   tag:"無料", desc:"多角的なAI肌スキャンで専用分析レポートを生成" },
    { id:"svc-hydra",    cat:"ベーシックケア", name:"ディープクレンジング水光ケア", duration:60, price:680, desc:"清洁 + 保湿,唤醒肌肤基础状態" },
    { id:"svc-photo",    cat:"光治療", name:"フォトフェイシャル", duration:45, price:1280, desc:"色ムラや毛穴印象をケア" },
    { id:"svc-laser-rf", cat:"光治療", name:"RF輪郭タイトニング", duration:60, price:2480, desc:"RF熱エネルギーでハリと輪郭感をサポート" },
    { id:"svc-hyaluron", cat:"注入施術", name:"ヒアルロン酸デザイン注入", duration:40, price:3200, desc:"自然な立体感を目指す精密デザイン" },
    { id:"svc-water",    cat:"注入施術", name:"水光注射ベーシック保湿", duration:35, price:1580, desc:"直达真皮层保湿,改善干纹" },
    { id:"svc-botox",    cat:"注入施術", name:"ボツリヌス表情ジワケア", duration:30, price:1980, desc:"自然な表情を保ちながら表情ジワをケア" },
    { id:"svc-peel",     cat:"ベーシックケア", name:"AHAピーリングコース", duration:40, price:880, desc:"角質代謝を促し、くすみやざらつきをケア" },
    { id:"svc-eye",      cat:"パーツケア", name:"目元エイジングケア", duration:45, price:1680, desc:"针对眼周小ジワ与黑眼圈" },
  ];

  /* ---------------- 医生 / 技师 ---------------- */
  const STAFF = [
    { id:"st-01", name:"林 知夏", title:"スキンケア主任アドバイザー", years:12, tags:["光治療","ベーシックケア"], color:"linear-gradient(150deg,#c96b8a,#8a2447)" },
    { id:"st-02", name:"陳 嶼", title:"注入デザイン担当医", years:9,  tags:["注入施術","パーツケア"], color:"linear-gradient(150deg,#3f7cae,#2b5a86)" },
    { id:"st-03", name:"周 雅", title:"エイジングケア・再生領域", years:15, tags:["光治療","注入施術"], color:"linear-gradient(150deg,#2f7d74,#1f5a53)" },
    { id:"st-04", name:"AIスマートアドバイザー", title:"24時間オンライン・初期提案", years:0, tags:["AI診断"], color:"linear-gradient(150deg,#c9a23c,#a07c22)" },
  ];

  /* ---------------- 商城商品 ---------------- */
  const PRODUCTS = [
    { id:"p-01", cat:"美容液", name:"セルリニューアル リペア美容液", price:980,  originalPrice:1280, tag:"人気", rating:4.9, sold:2361, grad:["#fbe9f0","#b8355f"], desc:"高浓度活性成分,针对性修护肌底,提升肌肤弹性与光泽感。" },
    { id:"p-02", cat:"美容液", name:"5-ALA エナジーグロウ美容液", price:1180, originalPrice:1480, tag:"新商品", rating:4.8, sold:958,  grad:["#f6ede0","#a9862c"], desc:"呼应线粒体能量代谢理念,配合日常护理,提亮肤色。" },
    { id:"p-03", cat:"マスク/集中ケア", name:"水光酸素マスク(5枚入り)", price:420, originalPrice:520,  tag:"保湿",  rating:4.7, sold:4520, grad:["#e6f2f1","#1b857c"], desc:"术后急救舒缓,快速保湿镇静。" },
    { id:"p-04", cat:"マスク/集中ケア", name:"スージング リペアジェルマスク", price:360, originalPrice:null, tag:null, rating:4.6, sold:1875, grad:["#eef1f7","#243f6e"], desc:"敏感肌可用,舒缓泛红与刺激感。" },
    { id:"p-05", cat:"UV/デイリー", name:"軽やか物理UVミルク SPF50+", price:268, originalPrice:328, tag:"定番", rating:4.9, sold:6210, grad:["#fdf3e7","#c9a23c"], desc:"术后与日常防护首选,质地清透不泛白。" },
    { id:"p-06", cat:"UV/デイリー", name:"ナイトバリア リペアミルク", price:398, originalPrice:null, tag:null, rating:4.7, sold:1420, grad:["#f3eef7","#5a4b86"], desc:"夜间强化屏障,配合治疗周期使用。" },
    { id:"p-07", cat:"美容医療セット", name:"フォトフェイシャル 3 次疗程套餐", price:3280, originalPrice:3840, tag:"セット割", rating:4.9, sold:612, grad:["#fbe9f0","#b8355f"], desc:"配合 AI 皮肤检测,定制三次光电疗程排期。" },
    { id:"p-08", cat:"美容医療セット", name:"水光注射年間会員セット(6回)", price:7980, originalPrice:9480, tag:"会員限定", rating:5.0, sold:340, grad:["#eef1f7","#243f6e"], desc:"全年保湿管理,ブラック会員额外赠送 1 次。" },
    { id:"p-09", cat:"機器施術", name:"RF輪郭タイトニング1回体験", price:1980, originalPrice:2480, tag:"体験価格", rating:4.8, sold:288, grad:["#e6f2f1","#1b857c"], desc:"首次体验专属价格,含 AI 术前评估。" },
    { id:"p-10", cat:"ギフトカード", name:"依欣 · 电子ギフトカード ¥1000", price:1000, originalPrice:null, tag:"電子カード", rating:5.0, sold:150, grad:["#fdf3e7","#c9a23c"], desc:"可用于抵扣任意医美施術或商城商品。" },
    { id:"p-11", cat:"美容液", name:"コラーゲン ハリ感アイクリーム", price:560, originalPrice:680, tag:null, rating:4.6, sold:1023, grad:["#f6ede0","#a9862c"], desc:"针对眼周小ジワ与松弛,质地清爽易吸收。" },
    { id:"p-12", cat:"機器施術", name:"肌バリア診断 + 個別プラン", price:198, originalPrice:298, tag:"初回おすすめ", rating:4.9, sold:3025, grad:["#eef1f7","#243f6e"], desc:"AI診断 + 担当 1v1 解读,新客首选。" },
  ];

  /* ---------------- 会员体系 ---------------- */
  const TIERS = [
    { key:"silver",   name:"シルバー会員", min:0,    color:"#9099AF", perk:["誕生日特典","ポイント1倍"] },
    { key:"gold",     name:"ゴールド会員", min:3000, color:"#A9862C", perk:["誕生日特典","ポイント1.2倍","専任アドバイザー優先予約"] },
    { key:"platinum", name:"プラチナ会員", min:8000, color:"#243F6E", perk:["ポイント1.5倍","専任アドバイザー優先予約","每年 1 次無料 AI 深度检测"] },
    { key:"black",    name:"ブラック会員", min:20000,color:"#141E36", perk:["ポイント2倍","専任アドバイザー1対1","年2回無料施術","新商品优先体验"] },
  ];

  const CURRENT_MEMBER = {
    name:"陳様", phone:"138****6699", id:"YX2024081206",
    tier:"gold", points:4360, totalSpend:6280, joined:"2024-03-12",
    nextTier:"platinum", nextTierNeed:8000,
  };

  const POINTS_HISTORY = [
    { when:"2026-06-28", what:"完了「ヒアルロン酸デザイン注入」利用", delta:"+320", neg:false },
    { when:"2026-06-28", what:"AI 皮肤检测友人に共有", delta:"+30",  neg:false },
    { when:"2026-06-15", what:"交換「セルリニューアル リペア美容液」", delta:"-980", neg:true },
    { when:"2026-05-30", what:"完了「フォトフェイシャル」利用", delta:"+128", neg:false },
    { when:"2026-05-02", what:"会員デー2倍ポイント", delta:"+200", neg:false },
    { when:"2026-04-18", what:"完了「水光注射ベーシック保湿」利用", delta:"+158", neg:false },
  ];

  const APPOINTMENT_HISTORY = [
    { when:"2026-06-28 14:00", svc:"ヒアルロン酸デザイン注入", staff:"陳 嶼", status:"已完了" },
    { when:"2026-05-30 10:30", svc:"フォトフェイシャル", staff:"林 知夏", status:"已完了" },
    { when:"2026-04-18 16:00", svc:"水光注射ベーシック保湿", staff:"陳 嶼", status:"已完了" },
    { when:"2026-03-12 11:00", svc:"AIスマート肌診断", staff:"AIスマートアドバイザー", status:"已完了" },
  ];

  /* ---------------- AI 皮肤分析:维度与建议映射 ---------------- */
  const SKIN_METRICS = [
    { key:"hydration", label:"水分", desc:"角質層の水分量" },
    { key:"oil",       label:"皮脂", desc:"Tゾーンの皮脂分泌" },
    { key:"pore",      label:"毛穴", desc:"毛穴目立ち与堵塞情况" },
    { key:"wrinkle",   label:"小ジワ", desc:"表情ジワと静的ジワ" },
    { key:"pigment",   label:"シミ", desc:"色素沈着の均一性" },
    { key:"firmness",  label:"ハリ", desc:"肌弾力と輪郭サポート" },
  ];

  /* 每项分数为「健康度」,0-100,越高越好;低于阈值触发对应建议 */
  const SKIN_RECOMMEND = {
    hydration: { svc:"svc-hydra",   prod:"p-03", tip:"角質層の水分量偏低,建议加强深层保湿护理" },
    oil:       { svc:"svc-peel",    prod:"p-04", tip:"T区出油偏旺,建议控油 + 定期焕肤管理" },
    pore:      { svc:"svc-photo",   prod:"p-01", tip:"毛穴状態较粗大,可考虑フォトフェイシャル配合精华" },
    wrinkle:   { svc:"svc-botox",   prod:"p-11", tip:"小ジワ信号较明显,建议评估动态纹管理方案" },
    pigment:   { svc:"svc-photo",   prod:"p-02", tip:"色素分布不均,建议光电改善 + 美白精华" },
    firmness:  { svc:"svc-laser-rf",prod:"p-01", tip:"皮肤ハリ低下,建议评估轮廓紧致施術" },
  };

  function svcById(id){ return SERVICES.find(s=>s.id===id); }
  function prodById(id){ return PRODUCTS.find(p=>p.id===id); }

  /* ---------------- 智能客服问答库(关键词匹配) ---------------- */
  const CHAT_QUICK = ["料金相談","予約手順","AI肌診断","施術後ケア","店舗住所","キャンペーン"];

  const CHAT_RULES = [
    { kws:["你好","您好","在吗","hi","hello"], reply:"您好呀,我是依欣 AI 客服小汐 👋 可以问我预约、施術价格、AI 皮肤检测或门店信息,也可以点击下方快捷问题~" },
    { kws:["价格","多少钱","费用","报价"], reply:"我们的施術价格区间大致为:ベーシックケア ¥360–¥880,光治療 ¥1280–¥2480,注入施術 ¥1580–¥3200。具体报价会结合您的 AI 皮肤检测结果定制,建议先完了一次無料的「AIスマート肌診断」哦。" },
    { kws:["预约","约日時","怎么约","预定","予約"], reply:"予約は簡単です。「予約システム」→ 施術を選択 → 医師 / 担当者を選択 → 日時を選択 → 連絡先を確認、という流れで約1分で完了します。予約ページへご案内しましょうか。" },
    { kws:["ai","检测","皮肤分析","扫描"], reply:"「AI 皮肤分析」支持上传照片,约 15 秒生成水分、皮脂、毛穴、小ジワ、シミ、ハリ六项评分,并给出個別ケア提案,完全無料,是很多新客户的第一步~" },
    { kws:["术后","护理","恢复","注意事项"], reply:"施術後ケア小贴士:24 小时内避免沾水与化妆、48 小时内避免高温环境(桑拿/汗蒸)、坚持温和保湿与严格防晒。具体施術会有专属担当跟进护理提醒。" },
    { kws:["地址","门店","位置","在哪"], reply:"目前演示门店位于:上海静安店 / 北京朝阳店 / 深圳南山店,营业日時 10:00–21:00(周一至周日)。真实地址信息会在正式上线后同步。" },
    { kws:["优惠","活动","折扣","满减"], reply:"本月活动:新客首次「AI 皮肤检测 + 担当解读」仅 ¥198;会员日全场积分双倍;满 ¥3000 赠送水光针体验一次。活动详情可在「臻选商城」查看。" },
    { kws:["会员","积分","等级","会員","ポイント"], reply:"会員制度はシルバー / ゴールド / プラチナ / ブラックの4段階です。累計利用額が増えるほど、専任担当、ポイント倍率、無料施術などの特典が広がります。「会員センター」で現在のランクと進捗を確認できます。" },
    { kws:["人工","转人工","真人","客服","担当者"], reply:"担当者への引き継ぎ希望として記録しました。正式運用時は営業時間内(10:00–21:00)に専任担当からご連絡します。本デモ環境では実際の有人接続は行いません。" },
  ];
  const CHAT_FALLBACK = "この質問にはまだ対応していません。別の表現で入力するか、下のクイック質問を選択してください。「予約システム」から専任担当への相談もできます。";

  /* ---------------- 经营数据分析(模拟) ---------------- */
  const ANALYTICS = {
    kpis: [
      { label:"今月売上", value:"¥286,400", delta:"+12.4%", up:true },
      { label:"予約人数", value:"1,024",     delta:"+8.1%",  up:true },
      { label:"新規会員", value:"186",       delta:"+5.6%",  up:true },
      { label:"AI診断次数", value:"742",     delta:"+21.3%", up:true },
      { label:"リピート率", value:"46.8%",       delta:"-1.2%",  up:false },
      { label:"客単価", value:"¥1,860",      delta:"+3.4%",  up:true },
    ],
    revenueTrend: {
      labels:["1月","2月","3月","4月","5月","6月","7月"],
      series:[
        { key:"revenue", name:"売上 (万元)", color:"var(--chart-indigo)", data:[18.2,19.6,21.4,24.8,23.1,27.9,28.6] },
        { key:"target",  name:"目標 (万元)", color:"var(--chart-gold)",   data:[18,20,21,23,24,26,27] },
      ]
    },
    servicePopularity: [
      { name:"フォトフェイシャル", value:312, color:"var(--chart-magenta)" },
      { name:"水光针保湿", value:268, color:"var(--chart-indigo)" },
      { name:"AI 皮肤检测", value:742, color:"var(--chart-teal)" },
      { name:"RF輪郭タイトニング", value:154, color:"var(--chart-gold)" },
      { name:"玻尿酸填充", value:96,  color:"var(--chart-magenta)" },
    ],
    memberTier: [
      { name:"银卡", value:1240, color:"var(--chart-indigo)" },
      { name:"金卡", value:860,  color:"var(--chart-gold)" },
      { name:"铂金", value:340,  color:"var(--chart-teal)" },
      { name:"黑金", value:96,   color:"var(--chart-magenta)" },
    ],
    channel: [
      { name:"ミニアプリ予約", value:46 },
      { name:"AI相談経由", value:24 },
      { name:"来店", value:18 },
      { name:"電話相談", value:12 },
    ],
    skinConcern: [
      { name:"水分不足", value:38, color:"var(--chart-indigo)" },
      { name:"毛穴目立ち", value:27, color:"var(--chart-magenta)" },
      { name:"色ムラ", value:19, color:"var(--chart-gold)" },
      { name:"小ジワ初期", value:24, color:"var(--chart-teal)" },
      { name:"ハリ低下", value:15, color:"var(--chart-indigo)" },
    ],
  };

  return {
    SERVICES, STAFF, PRODUCTS, TIERS, CURRENT_MEMBER, POINTS_HISTORY, APPOINTMENT_HISTORY,
    SKIN_METRICS, SKIN_RECOMMEND, svcById, prodById,
    CHAT_QUICK, CHAT_RULES, CHAT_FALLBACK, ANALYTICS,
  };
})();


