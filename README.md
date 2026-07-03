# 依欣 YIXIN AI · AI 医美平台演示原型

一个 **AI 医美平台的可交互演示原型**,视觉语言延续「辉凤会 · 细胞与再生医疗」页面的设计系统(洋红 `#B8355F` / 藏青 `#243F6E` / 墨绿 `#1B857C` / 金色 `#A9862C`,Noto Sans SC / Noto Serif SC,卡片与圆点时间轴等组件)。

⚠️ **这是产品演示原型,不是可上线的生产系统**:所有数据、AI 分析结果、支付与经营数据均为前端模拟生成,不连接真实数据库、支付网关或第三方 AI 服务。

## 六大功能模块

| 模块 | 页面 | 说明 |
|---|---|---|
| 预约系统 | `booking.html` | 项目 → 顾问 → 日期时间 → 信息确认 的分步向导,预约记录持久化在浏览器 `localStorage` |
| 会员管理 | `membership.html` | 会员卡、四级会员体系、积分兑换、积分明细时间轴、消费历史 |
| AI 皮肤分析 | `skin-analysis.html` | 上传/示例照片 → 模拟扫描动画 → 六维雷达图报告 → 个性化建议(联动预约与商城) |
| AI 简单客服 | `chatbot.html` | 关键词规则匹配问答、快捷问题、打字动效 |
| 网上商城 | `shop.html` | 分类浏览、商品详情、购物车、模拟结算下单 |
| 数据综合分析 | `analytics.html` | KPI 看板、营收趋势、项目热度、会员结构、获客渠道、AI 检测问题分布(自绘 SVG 图表) |

`index.html` 为平台首页,串联六大模块并展示完整顾客旅程。

## 技术实现

纯静态前端,零构建、零依赖,可直接用任意静态服务器或双击打开:

- **HTML / CSS / 原生 JavaScript**,无框架
- `assets/css/style.css`:共享设计系统(色彩变量、排版、卡片、表单、弹窗、图表组件等)
- `assets/js/common.js`:导航栏/页脚渲染、购物车状态(`localStorage`)、Toast 提示、滚动揭示动画
- `assets/js/mock-data.js`:全站模拟数据(服务项目、顾问、商品、会员、问答库、经营数据)
- `assets/js/charts.js`:轻量 SVG 图表库(折线图、柱状图、环形图、雷达图),含悬浮提示与数据表切换
- 各页面 `assets/js/<page>.js`:该页面的交互逻辑

## 本地预览

```bash
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080/index.html
```

## 目录结构

```
index.html            平台首页
booking.html           预约系统
membership.html         会员中心
skin-analysis.html       AI 皮肤分析
chatbot.html            AI 客服
shop.html              臻选商城
analytics.html           经营分析看板
assets/
  css/style.css          共享设计系统
  js/
    common.js            导航/页脚/购物车/Toast
    mock-data.js          全站模拟数据
    charts.js            SVG 图表组件库
    booking.js / membership.js / skin-analysis.js /
    chatbot.js / shop.js / analytics.js   各页面逻辑
```

