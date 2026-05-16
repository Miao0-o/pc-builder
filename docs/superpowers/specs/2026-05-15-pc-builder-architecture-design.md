# 装机大师 PC Builder — 完整产品架构设计

> 版本: v1.0 | 日期: 2026-05-15 | 状态: 设计完成，待实现

---

## 目录

1. [项目现状分析](#1-项目现状分析)
2. [产品信息架构 IA](#2-产品信息架构-ia)
3. [技术栈选型](#3-技术栈选型)
4. [P0 基础必做模块](#4-p0-基础必做模块)
5. [P1 中期功能模块](#5-p1-中期功能模块)
6. [P2 AI Agent 模块](#6-p2-ai-agent-模块)
7. [数据库 Schema 设计](#7-数据库-schema-设计)
8. [API 模块设计](#8-api-模块设计)
9. [前端模块拆分](#9-前端模块拆分)
10. [数据流设计](#10-数据流设计)
11. [状态机设计](#11-状态机设计)
12. [实施优先级与依赖](#12-实施优先级与依赖)

---

## 1. 项目现状分析

### 1.1 当前架构

| 维度 | 现状 |
|------|------|
| 部署 | GitHub Pages 纯静态托管 |
| 前端 | 原生 HTML/JS/CSS，ES Module，无框架 |
| 3D | Three.js 0.157 程序化模型 + GLB 异步加载 |
| 数据 | `js/data.js` 静态硬件数据库（9类配件） |
| 状态 | 内存 + localStorage，无持久化 |
| 后端 | 无 |
| 数据库 | 无 |
| 用户系统 | 无 |
| API | 无 |

### 1.2 当前页面

- `index.html` — 3D互动装机（核心体验）
- `recommend.html` — 一键推荐（预算+用途）
- `service.html` — 上门组装/快递
- `trade-in.html` — 旧机估价
- `support.html` — 售后工单
- `model-generator.html` — GLB模型生成器

### 1.3 核心问题

1. 配置无法持久保存（localStorage 不可靠）
2. 分享依赖 hash 片段 + 本地存储，无法跨设备
3. 无兼容性检测，用户可能选出冲突配置
4. 无价格实时性，数据静态硬编码
5. 无用户系统，无云同步
6. 缺少系统性的错误处理和状态管理

---

## 2. 产品信息架构 IA

### 2.1 核心用户旅程

- **小白用户**: 首页 → 一键推荐 → AI解释 → 3D预览 → 分享/购买
- **进阶用户**: 首页 → 3D自选装机 → 兼容性实时检测 → 跑分 → 保存/分享
- **对比党**: 配置A → 保存 → 配置B → 保存 → 配置对比页 → 决策
- **AI求助**: AI装机顾问 → 自然语言需求 → AI生成+解释配置 → 一键套用

### 2.2 完整页面结构树

```
📁 PC Builder
├── 🏠 首页 / 3D装机 (index.html) — 核心体验
│   ├── 3D 机箱预览（Three.js）
│   ├── 配件选择器面板
│   ├── 硬件详情 + 在售面板（含筛选）
│   ├── 底部配置总览栏 + 兼容性指示灯
│   ├── 跑分弹窗
│   ├── 配置保存/分享弹窗
│   └── 兼容性报告面板
│
├── 🪄 一键推荐 (recommend.html) — 升级为3方案输出
├── 🔍 配置对比 (compare.html) 🆕
├── 🤖 AI 装机顾问 (ai-advisor.html) 🆕
├── 📋 我的配置 (my-configs.html) 🆕
├── 🔗 公开配置页 (/s/:shareCode) 🆕
├── 👤 个人中心 (profile.html) 🆕
├── 🚚 上门组装/快递 (service.html)
├── ♻️ 旧机估价 (trade-in.html)
└── 🔧 售后工单 (support.html) — 升级：自动附带配置
```

---

## 3. 技术栈选型

| 层级 | 选型 | 理由 |
|------|------|------|
| 前端框架 | 原生 JS + ES Modules | 保持现有架构，渐进增强 |
| 3D 引擎 | Three.js 0.157 | 已集成 |
| 后端 BaaS | **Supabase** | PostgreSQL + Auth + Edge Functions + Storage |
| 数据库 | PostgreSQL (via Supabase) | 关系型，兼容性检测需要 JOIN |
| API 层 | Supabase Edge Functions (Deno) | Serverless，零运维 |
| AI 模型 | Claude API (Anthropic) | Function Calling + 硬件领域知识 |
| 认证 | Supabase Auth | 邮箱/手机OTP/Google/GitHub |
| 部署 | GitHub Pages (前端) + Supabase (后端) | 前端部署不变 |

---

## 4. P0 基础必做模块

### 4.1 配置保存系统

**用户流程**: 选好配件 → 点击分享按钮 → 命名配置 → 选可见性(私有/公开) → 保存 → 获得分享短链

**数据模型** (configs 表):
```sql
CREATE TABLE configs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name            TEXT NOT NULL DEFAULT '我的配置',
  status          TEXT NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft','published','private','trashed')),
  parts_snapshot  JSONB NOT NULL DEFAULT '{}',
  total_price     INT NOT NULL DEFAULT 0,
  benchmark_score INT NOT NULL DEFAULT 0,
  benchmark_level TEXT,
  platform        TEXT,
  is_public       BOOLEAN NOT NULL DEFAULT false,
  share_code      TEXT UNIQUE,
  shared_at       TIMESTAMPTZ,
  view_count      INT NOT NULL DEFAULT 0,
  version         INT NOT NULL DEFAULT 1,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at      TIMESTAMPTZ
);
```

**状态流转**: NEW → DRAFT → PUBLISHED/PRIVATE → TRASHED

**页面状态**: Loading(骨架屏) | Success | Empty(空状态引导) | Error(重试按钮) | Offline(localStorage降级) | 404(分享链接失效)

**前端模块**: `js/config-manager.js`
- `saveConfig(name, parts, isPublic)` → POST /api/configs
- `loadMyConfigs(filter, page)` → GET /api/configs
- `loadConfigById(id)` → GET /api/configs/:id
- `updateConfig(id, data, version)` → PATCH /api/configs/:id (乐观锁)
- `deleteConfig(id)` → DELETE /api/configs/:id (软删除)
- `loadSharedConfig(shareCode)` → GET /api/s/:shareCode
- `saveConfigLocal(config)` → localStorage 离线降级
- `syncPendingConfigs()` → 联网后批量同步
- `mergeLocalToCloud(userId)` → 登录后合并

**API**:
- `POST /api/configs` — 创建配置
- `GET /api/configs` — 我的配置列表 (需登录)
- `GET /api/configs/:id` — 配置详情
- `PATCH /api/configs/:id` — 更新配置 (需登录 + 乐观锁)
- `DELETE /api/configs/:id` — 软删除 (需登录)
- `GET /api/s/:shareCode` — 公开分享页数据 (免登录)

**异常处理**:
- 网络超时: 自动重试3次（指数退避），失败后本地保存
- 服务端5xx: 降级到 localStorage + 提示用户
- 存储空间满: 提示清理旧配置
- 分享码冲突: 服务端自动重新生成
- 未登录保存: 匿名可用 localStorage，登录后自动合并
- 并发编辑冲突: 乐观锁 version 字段，冲突时提示选择版本

---

### 4.2 配置分享系统

**用户流程**: 保存配置时选择"公开分享" → 生成短链 `pc-builder.app/s/ABC123` → 复制/下载图片/分享到社交平台

**公开配置页** (`/s/:shareCode`):
- 配置快照只读展示（配件列表 + 总价 + 跑分 + 兼容性状态）
- 一键复制到我的配置（需登录）
- 购买链接直达
- 页面状态: 404(配置不存在/已删除)

**API**: `GET /api/s/:shareCode` → 返回配置公开数据

---

### 4.3 兼容性检测系统

**9项检测矩阵**:

| # | 检查项 | 严重级别 | 检查逻辑 |
|---|--------|----------|----------|
| 1 | CPU ↔ 主板 Socket | 🔴 BLOCK | CPU.socket === MB.socket |
| 2 | 主板 ↔ 内存代数 | 🔴 BLOCK | MB.memoryType === RAM.type |
| 3 | 电源功率 | 🔴 BLOCK | PSU.wattage >= CPU.tdp + GPU.tdp + 150W |
| 4 | 显卡长度 ↔ 机箱 | 🟡 WARN | GPU.length <= Case.gpuMaxLength |
| 5 | 散热器高度 ↔ 机箱 | 🟡 WARN | Cooler.height <= Case.coolerMaxHeight |
| 6 | 机箱 ↔ 主板板型 | 🟡 WARN | Case.supportedMBTypes includes MB.formFactor |
| 7 | CPU ↔ 芯片组搭配 | 🟢 INFO | K系CPU配B系主板=不能超频 |
| 8 | 水冷冷排 ↔ 机箱 | 🟢 INFO | AIO.radiatorSize in Case.supportedRadiatorSizes |
| 9 | M.2数量 vs 硬盘 | 🟢 INFO | 主板M.2接口数 >= NVMe盘数 |

**双层引擎架构**:
- **前端** `js/compat-engine.js`: CompatEngine 类，纯内存计算 <5ms，实时检测
- **后端** `POST /api/compat/validate`: 保存前权威验证，规则可动态更新

**UI交互**:
- 底部兼容性指示灯: 🟢全部兼容 / 🟡N个注意 / 🔴N个冲突
- 展开兼容性报告面板: 每条冲突显示原因 + 替换建议按钮
- 🔴冲突时禁用保存和分享按钮

**数据结构升级**: 所有 `data.js` 中的 option 新增 `structuredSpecs` 字段:
```javascript
structuredSpecs: {
  socket: 'LGA1700',    // CPU/主板
  tdp: 125,             // CPU/GPU
  length: 310,          // GPU
  height: 155,          // 散热器
  wattage: 750,         // 电源
  type: 'DDR5',         // 内存
  formFactor: 'M-ATX',  // 主板/机箱
  // ... 等
}
```

---

### 4.4 价格统计系统

**用户流程**: 选配件 → 底部实时显示总价/功耗/性价比 → 点击展开明细面板(各类占比环形图 + 多平台最低价比价)

**前端模块** `js/price-calc.js`:
- `getTotal(selectedParts)` → { total, breakdown }
- `getPowerEstimate(selectedParts)` → { totalWatts, cpuTdp, gpuTdp, headroom, headroomPercent }
- `getValueScore(selectedParts, benchmark)` → { score, grade }
- `getPriceAlerts(breakdown, total)` → 价格占比预警
- `compareLowestPrice(partName)` → 多平台比价

**API**: `GET /api/price/lookup?keyword=...` → { jd, tb, pdd, lowest } (缓存1小时)

**页面状态**: 无配件(¥0) | 正常(数字滚动) | 功耗超限(红色警告) | 比价失败(显示参考价标记)

---

### 4.5 问题反馈系统

**用户流程**: 右下角"反馈"按钮 → 选类型(Bug/建议/数据错误/其他) → 填描述(≥10字) → 可选截图 → 自动附带上下文信息

**自动捕获上下文**:
- 当前配置(配件列表 + 总价)
- 页面路径 + referrer
- 浏览器信息(UserAgent / 窗口尺寸 / 语言)
- 最近5条 console error
- 页面停留时间 + 操作次数

**数据模型** (feedbacks 表):
```sql
CREATE TABLE feedbacks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id),
  type        TEXT NOT NULL CHECK (type IN ('bug','feature','data','other')),
  description TEXT NOT NULL CHECK (length(description) >= 10),
  screenshot  TEXT,
  context     JSONB NOT NULL DEFAULT '{}',
  status      TEXT NOT NULL DEFAULT 'open'
              CHECK (status IN ('open','acknowledged','resolved','closed')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**前端模块**: `js/feedback.js`
- FeedbackWidget — 悬浮按钮 + 弹窗
- autoCaptureContext() — 自动收集状态信息
- submitFeedback(type, desc, screenshot) → POST /api/feedback
- ErrorLogCollector — 劫持 console.error + window.onerror

---

### 4.6 错误处理与状态管理

**全局状态规范** (所有页面统一):

| 状态 | UI规范 | 代码模式 |
|------|--------|----------|
| 🔄 Loading | 骨架屏（非空白spinner） | `state: 'loading'` + Skeleton组件 |
| 📭 Empty | 插画 + 引导文字 + CTA按钮 | `state: 'empty'` + EmptyState组件 |
| ✅ Success | 正常渲染数据 | `state: 'success'` |
| ❌ Error | 具体错误描述 + 重试按钮 | `state: 'error'` + ErrorBanner + retry() |
| ⏳ Stale | 灰色遮罩 + "数据可能已过期" | `state: 'stale'` + StaleBadge |

**核心模块**:
- `js/state-machine.js`: AsyncState 类，统一异步状态机（指数退避重试）
- `js/api-client.js`: 统一API封装（JWT/超时15s/自动重试/请求去重/离线降级）
- `js/error-banner.js`: 全局错误横幅 + Toast组件
- 全局错误边界: `window.onerror` + `unhandledrejection` 兜底

---

## 5. P1 中期功能模块

### 5.1 用户系统

**登录方式**: 邮箱 + 手机OTP + Google + GitHub (Supabase Auth)

**数据模型**:
```sql
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username    TEXT UNIQUE,
  avatar_url  TEXT,
  preferences JSONB DEFAULT '{"theme":"dark","currency":"CNY","platform":"auto"}',
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE favorites (
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE,
  config_id  UUID REFERENCES configs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, config_id)
);

CREATE TABLE view_history (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE,
  config_id  UUID REFERENCES configs(id) ON DELETE CASCADE,
  viewed_at  TIMESTAMPTZ DEFAULT now()
);
```

**匿名→登录迁移**: 登录后自动将 localStorage 中的配置批量上传到云端，标记来源=local-merge

**Token管理**: Supabase JWT (Access Token 1h + Refresh Token 7d)，SDK自动续期

**前端模块**: `js/auth.js` — initAuth / signUp / signIn / signInWithOAuth / signOut / mergeLocalToCloud / syncCloudToLocal

---

### 5.2 配置对比系统

**用户流程**: 我的配置 → 勾选2套 → 对比 → 双栏视图 + 差异高亮

**差异仪表盘**: 价差 ±¥X / 跑分差 / 功耗差 / 综合推荐

**前端模块**: `js/compare.js`
- `ConfigComparer.compare(configA, configB)` → 逐配件差异 + 综合结论
- 纯前端计算，无需额外API

---

### 5.3 推荐配置系统（升级版）

**升级内容**:
1. 单套 → 3套方案 (性价比/均衡/性能)
2. 每套方案经过 CompatEngine 验证
3. 调用比价API获取实时价格
4. 后端缓存热门预算+用途组合

**前端模块**: `js/recommend-v2.js`
- `RecommendEngine.generate(budget, usages, platform)` → 3套方案

**API**: `GET /api/recommend?budget=8000&usages=aaa-game,ai` (Supabase Materialized View 缓存)

---

### 5.4 搜索与筛选系统

**筛选维度**: 搜索框 + 品牌(多选) + 价格区间 + 功耗区间 + 尺寸限制

**前端模块**: `js/search-filter.js`
- `PartsFilter.filter({ query, brands, priceRange, tdpRange, dimensions })` → 过滤结果
- 纯前端内存过滤 <10ms
- 模糊匹配（中文友好）

---

## 6. P2 AI Agent 模块

### 6.1 总体架构

```
前端 (ai-advisor.html)
  │ POST /api/ai/chat (SSE 流式)
  ▼
Supabase Edge Function (Deno)
  │ System Prompt + Tool Definitions
  ▼
Claude API (Anthropic)
  │ Function Calling
  ├── query_parts_database() → PostgreSQL
  ├── check_compatibility() → CompatEngine
  ├── estimate_price() → PriceCalc
  ├── estimate_benchmark() → estimateLudashiScore
  └── search_web() → Web Search
  │
  ▼ SSE 流式返回 → 前端逐字渲染
```

### 6.2 AI 装机顾问

**用户流程**: 对话式 → "我想玩4K黑神话，预算8000" → AI调用Tool查询硬件 → 生成配置单 → 验证兼容性 → 逐项解释 → 一键应用

**前端状态机**: idle → thinking → streaming → done / error / rate_limited

### 6.3 AI 兼容性分析

**与P0-3的关系**: P0-3告诉你"哪里不兼容"，P2-2解释"为什么不兼容 + 怎么改"

**用户流程**: 点击冲突条目 → "AI分析" → 解释物理原理 → 给出2-3替换方案 → 一键应用

### 6.4 AI 配置优化

**优化维度**: 性价比 / 功耗 / 散热 / 升级空间

**用户流程**: 现有配置 → 选择优化目标 → AI逐项建议 → 差异对比 → 确认应用

### 6.5 AI 场景异常处理

| 异常 | 处理 |
|------|------|
| API超时(30s) | 返回已生成部分 + "请稍后重试" |
| API 5xx | 自动重试1次 → 降级到P0规则推荐 |
| Token超限 | 截断数据库结果(只传最相关10条) |
| Tool返回空 | 告知放宽筛选条件 |
| AI幻觉 | Tool checkCompatibility()验证 → 自我修正 |
| 预算不足 | 诚实告知 + 给出最低可行方案 |

### 6.6 后端模块

```
supabase/functions/ai-chat/
├── index.ts           — 主入口(SSE流式)
├── system-prompt.ts   — 装机顾问提示词
├── tools.ts           — Tool Definitions
└── tool-handlers.ts   — Tool执行逻辑(查询DB/兼容性/价格/跑分)

supabase/functions/_shared/
└── claude-client.ts   — Claude API封装(streamChat / chat)
```

---

## 7. 数据库 Schema 设计

### 7.1 完整 ER 关系

```
auth.users (Supabase内置)
  │ 1:1
  ▼
profiles
  │ 1:N ──→ configs
  │ 1:N ──→ favorites ──→ configs
  │ 1:N ──→ view_history ──→ configs
  │ 1:N ──→ feedbacks
  │
configs (配置主表)
  │ 独立存储，user_id可为NULL(匿名)

feedbacks (反馈表)
  │ user_id可为NULL(匿名反馈)

parts_cache (配件价格缓存表)
  │ 独立，无外键

rate_limits (AI调用频率限制表)
  │ 关联 profiles
```

### 7.2 建表语句汇总

见各模块的完整SQL定义。关键设计原则：
- 所有表启用 Row Level Security (RLS)
- configs 使用 parts_snapshot JSONB 存储完整配件快照
- 聚合字段(total_price/benchmark_score/platform)冗余存储加速列表查询
- 软删除设计(deleted_at)保护数据
- 乐观锁(version)处理并发编辑

---

## 8. API 模块设计

### 8.1 完整端点列表

| 方法 | 端点 | 鉴权 | 所属模块 |
|------|------|------|----------|
| POST | /api/configs | 可选 | P0-1 配置保存 |
| GET | /api/configs | 必需 | P0-1 我的配置列表 |
| GET | /api/configs/:id | 按需 | P0-1 配置详情 |
| PATCH | /api/configs/:id | 必需 | P0-1 更新配置 |
| DELETE | /api/configs/:id | 必需 | P0-1 删除配置 |
| GET | /api/s/:shareCode | 无 | P0-2 分享页数据 |
| POST | /api/compat/validate | 无 | P0-3 兼容性验证 |
| GET | /api/price/lookup | 无 | P0-4 比价查询 |
| POST | /api/feedback | 可选 | P0-5 提交反馈 |
| POST | /api/auth/phone/send | 无 | P1-1 发送验证码 |
| POST | /api/auth/phone/verify | 无 | P1-1 验证码登录 |
| GET | /api/recommend | 无 | P1-3 推荐配置(缓存) |
| POST | /api/ai/chat | 可选 | P2-1 AI装机(SSE) |
| POST | /api/ai/compatibility | 无 | P2-2 AI兼容分析 |
| POST | /api/ai/optimize | 可选 | P2-3 AI优化(SSE) |

### 8.2 API 设计原则

- 前端优先使用 Supabase PostgREST 直连（读操作），减少 Edge Function 调用
- 写操作/复杂逻辑走 Edge Function
- Supabase RLS 自动鉴权，API层不再重复验证
- 所有 API 响应统一格式: `{ data, error, meta }`

---

## 9. 前端模块拆分

```
js/
├── 核心（已有，升级）
│   ├── main.js              — 3D 引擎 + 场景管理
│   ├── data.js              — 硬件数据库 (升级: 增加 structuredSpecs)
│   └── recommend.js         — 推荐引擎 (升级: 3方案输出)
│
├── P0 新增
│   ├── config-manager.js    — 配置 CRUD + 云同步 + 离线降级
│   ├── compat-engine.js     — 兼容性规则引擎
│   ├── price-calc.js        — 价格/功耗/性价比计算器
│   ├── feedback.js          — 反馈收集 + 上下文捕获
│   ├── state-machine.js     — 异步状态机
│   ├── api-client.js        — 统一 API 封装
│   └── error-banner.js      — 全局错误横幅
│
├── P1 新增
│   ├── auth.js              — Supabase Auth 封装
│   ├── compare.js           — 配置对比引擎
│   └── search-filter.js     — 多维筛选
│
├── P2 新增
│   └── ai-client.js         — AI SSE 流式客户端
│
└── 现有
    ├── chat.js              — 客服聊天
    └── lib/                 — Three.js + Controls + GLTFLoader
```

---

## 10. 数据流设计

```
用户操作 (UI Event)
    │
    ▼
State Store (内存)
    │ 双向绑定
    ▼
UI Components
    │ 网络操作触发
    ▼
api-client.js (统一封装)
    │ JWT / 重试 / 超时 / 去重
    ▼
Supabase
├── PostgREST (直连DB读)
├── Edge Function (API写逻辑)
├── Auth (认证鉴权)
└── Storage (图片文件)
    │
    ├──→ PostgreSQL (数据持久化)
    └──→ Claude API (AI Agent)

离线降级路径:
api-client → fetch失败 → localStorage → 联网后自动同步
```

---

## 11. 状态机设计

### 11.1 配置生命周期

```
NEW (刚创建)
  │ 保存
  ▼
DRAFT (草稿)
  ├──→ PUBLISHED (公开分享) ──→ PRIVATE (取消分享)
  └──→ TRASHED (软删除, 30天后物理删除)
```

### 11.2 异步请求状态机

```
IDLE ──→ LOADING ──→ SUCCESS ──→ STALE
  │         │           │
  │         └──→ ERROR ─┼──→ LOADING (retry)
  │                     │
  └──→ EMPTY (无数据)   │
                        │
              (所有ERROR可触发) → retry → LOADING
```

### 11.3 AI 对话状态机

```
IDLE ──→ THINKING ──→ STREAMING ──→ DONE
  │         │            │
  │         └──→ ERROR ──┼──→ IDLE (retry)
  │                      │
  └──→ RATE_LIMITED ──→ IDLE (倒计时后)
```

---

## 12. 实施优先级与依赖

### 12.1 实施顺序

```
Phase 1: 基础架构 (2-3天)
├── Supabase 项目创建 + 数据库建表
├── api-client.js + state-machine.js + error-banner.js
└── data.js structuredSpecs 升级

Phase 2: P0 核心 (1周)
├── 4.1/4.2 配置保存 + 分享系统
├── 4.3 兼容性检测系统
├── 4.4 价格统计系统
├── 4.5 反馈系统
└── 4.6 各页面接入错误处理

Phase 3: P1 用户 (3-5天)
├── 5.1 用户系统 (Supabase Auth)
├── 5.2 配置对比
├── 5.3 推荐升级
└── 5.4 搜索筛选

Phase 4: P2 AI (3-5天)
├── 6.2 AI 装机顾问 (Edge Function + Claude API)
├── 6.3 AI 兼容性分析
└── 6.4 AI 配置优化
```

### 12.2 依赖关系

```
Phase 1 ──→ Phase 2 ──→ Phase 3 ──→ Phase 4
                              │
                           P2 可部分并行（不依赖P1）
```

### 12.3 风险与应对

| 风险 | 应对 |
|------|------|
| Supabase 国内访问慢 | 套 Cloudflare CDN，或选 supabase.cn 区域 |
| Claude API 费用高 | 按需调用，P0/1 不依赖AI，AI功能失败降级到规则引擎 |
| 短信服务商接入复杂 | 先用邮箱+Google登录，短信P2再做 |
| GLB 模型缺失 | 程序化回退始终保留，GLB加载失败自动降级 |

---

> 本文档为 PC Builder 项目从 Demo → 产品的完整架构设计。
> 实现时请遵循 Phase 1→2→3→4 的顺序，每个 Phase 完成后上线验证再进入下一阶段。
