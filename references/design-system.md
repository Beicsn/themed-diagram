# 设计系统

## 色板（唯一来源）

| 角色 | 主色 | 浅底（tint） | 用途 |
|---|---|---|---|
| ink | `#0B1220` | — | 标题文字 |
| ink2 | `#1E293B` | — | 次级标题 |
| muted | `#5B6B84` | — | 说明文字 |
| faint | `#8A99B0` | — | 页脚/辅助 |
| line | `#D9E1EE` | — | 卡片描边/分隔线 |
| bg | `#F4F7FC` | — | 画布底色 |
| blue | `#3D5AFE` | `#EEF2FF` | 主品牌色/核心引擎/主链路 |
| cyan | `#0891B2` | `#ECFEFF` | 网关/协议/数据流 |
| teal | `#0E9F8E` | `#ECFDF7` | 工具/执行/成功 |
| green | `#0F9F6E` | `#ECFDF5` | 交付/完成态 |
| amber | `#D97706` | `#FFF7ED` | 模型/SDK/警告 |
| rose | `#E11D48` | `#FFF1F3` | 安全/拒绝/ACP |
| violet | `#7C3AED` | `#F5F3FF` | UI/结果/消费者 |
| slate | `#64748B` | `#F1F5F9` | 中性/基础设施 |

配套渐变（defs 已内置）：`g-blue`、`g-navy`、`g-teal`、`g-violet`、`g-amber`。

## 字体阶梯

字体族：`PingFang SC, Hiragino Sans GB, Noto Sans CJK SC, Microsoft YaHei, sans-serif`；等宽用 `SF Mono, Menlo, Consolas, monospace`（仅 `ctx.*`、事件名、代码标识符）。

| 角色 | 字号 | 字重 |
|---|---|---|
| 图标题 | 31 | 700 |
| 副标题 | 15 | 400 |
| 区域标签 | 17 | 700（编号 13px mono） |
| 卡片标题 | 16-20 | 700 |
| 卡片说明 | 12-13 | 400 |
| 箭头标签 | 12 | 600（带白底衬） |
| 图例/页脚 | 11-12 | 400-600 |

## 组件规范

### frame（图框）
- 左侧 7×56 品牌蓝渐变竖条 + 31px 标题 + 15px 副标题
- 右上角 `FIG NN` 黑底圆角徽章（白字 12px/700）
- 底部 y=height-54 分隔线 + 页脚（左：文档名，右：日期）
- 背景右上装饰：2 个大圆（blue 3.5%、teal 4% 透明度）

### card（卡片）★核心组件
- 白底 + `line` 描边 + 16px 圆角 + `shadow`（feDropShadow dy=7 blur=11 opacity=9%）
- 左侧图标徽章：40px 圆（tint 底）+ 52% 尺寸图标（主色线条）
- 标题 17px/700，说明 13px
- **`sub` 与 `subLines` 互斥**：多行说明只传 `subLines`（行距 19px）
- `compact: true` 用于高 ≤96px 的窄卡（图标 34px、单行 sub）

### pill（胶囊标签）
- 999px 圆角，tint 底 + 主色文字 12-13px/600，用于标签、图例项、预设项

### arrow（箭头）
- 直线 `arrow(x1,y1,x2,y2)` 或曲线 `pathArrow(d)`，marker 按颜色名自动匹配
- 带标签时自动生成白底圆角底衬（宽度按 CJK 1em/拉丁 0.55em 估算）
- 层间主箭头：sw=2.4 主色；次级连接：sw=1.8-2

### bandLabel（分层编号标签）
- `01`（13px mono/700 彩色）+ 中文层名（17px/700），放层左侧 x≈58

### region（区域边界，可选）
- 16px 圆角，tint 55% 透明底，或彩色 1px dasharray 描边；泳道用前者，分组用后者

## 图标清单（iconBadge 的 kind 参数）

| kind | 语义 | kind | 语义 |
|---|---|---|---|
| browser | Web/浏览器 | spark | 模型/LLM |
| monitor | 桌面端 | tool | 工具 |
| terminal | CLI/终端 | db | 持久化/数据库 |
| code | SDK/代码 | shield | 安全/沙箱/审批 |
| plug | 协议/ACP/接入 | puzzle | 插件/扩展 |
| server | 服务端/宿主 | layers | 层叠/Bundle/投影 |
| gateway | 网关/API | cloud | 云端/远程 |
| agent | Agent/循环 | lock | 凭据/守卫 |
| log | 日志/事件 | user | 审批/人 |
| prompt | 提示词/文档 | gear | 执行/配置 |
| flow | 编排/调度 | search | 检索/遥测 |
| check | 校验/完成 | — | — |

## 阴影

`shadow`（大卡片）：dy=7 blur=11 opacity=9%；`shadowSm`（小元素）：dy=3 blur=5 opacity=8%。

## 深色主题（v1.1+）

`setTheme('dark')` 后的覆盖值：

| 角色 | 深色值 | 角色 | 深色值 |
|---|---|---|---|
| bg | `#0B1220` | blue | `#5B74FF`（提亮） |
| card | `#151D2E` | cyan | `#22D3EE` |
| line | `#2A3648` | teal/green | `#34D399` |
| ink | `#F1F5F9` | amber | `#FBBF24` |
| ink2 | `#E2E8F0` | rose | `#FB7185` |
| muted | `#94A3B8` | violet | `#A78BFA` |
| faint | `#64748B` | slate | `#94A3B8` |
| 各 tint | `rgba(主色, 0.12~0.17)` 叠加色 | deep | `#0B1220`（不变） |

深色下阴影 flood-opacity 升至 0.35；FIG 徽章自动反色（浅底深字）。

## 渲染

```bash
rsvg-convert -w 2400 -o out.png out.svg   # 安装：brew install librsvg
```

降级方案：puppeteer 打开 SVG 截图（设 deviceScaleFactor=2）；或 sharp（`sharp(svg,{density:144}).png()`）。
