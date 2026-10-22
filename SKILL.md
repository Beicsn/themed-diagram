---
name: themed-diagram
description: 双主题（浅色汇报 / 深色仪表盘）SVG 图表 —— 白色投影卡片、彩色图标徽章、品牌蓝设计系统。用于架构分层图、组合/部署矩阵、泳道流水线、枢纽接缝图、同心防御模型、能力地图。当用户要求"架构图/汇报图/PPT 图/给领导看的图/深色版/deck-ready diagram/presentation architecture diagram/dark dashboard diagram"时触发。需要霓虹工程风时用 baoyu-diagram；时序图优先用 Mermaid。
version: 1.1.0
---

# Themed Diagram — 双主题汇报级图表生成

产出物：**单文件自包含 SVG + 2400px PNG**，风格为浅灰蓝底（#F4F7FC）、白色投影卡片、彩色图标徽章、品牌蓝（#3D5AFE）。适合 PPT、领导汇报、打印文档。

## 什么时候用 / 不用

- ✅ 汇报/PPT/打印场景的任何结构图：架构分层、部署矩阵、组合关系、流水线、防御模型、能力地图
- ✅ 需要图标、卡片、阴影、图例的"好看"的图
- ✅ 深色版本：同套组件已支持 `setTheme('dark')`（深色仪表盘风，Linear/Vercel 质感），构建 SVG 前调用即可，图形代码零改动
- ❌ 深色霓虹工程风 → 用 `baoyu-diagram`
- ❌ 时序图 → 用 Mermaid（mmdc 渲染）
- ❌ 数据图表（柱状/折线）→ 本 skill 不含

## 工作流（5 步）

1. **定版式**：读 `references/patterns.md`，从 7 种版式里选最接近的一种，确定画布与分区。
2. **定内容**：列出全部节点/分组/连线；每个元素只放 1 个标题 + ≤3 行 12-13px 说明。
3. **写脚本**：复制 `scripts/svg-kit.mjs` 到产出目录，参照 `scripts/example-fig.mjs` 写一个 `gen-*.mjs`，数据驱动地拼装 SVG。多张图共用一个脚本，一处改全量重出。
4. **渲染**：`rsvg-convert -w 2400 -o out.png out.svg`。无 rsvg-convert 时降级：`brew install librsvg`，或用 puppeteer 截图。
5. **目检**：**必须 Read 渲染出的 PNG**，检查文字重叠/溢出/箭头错位，修完再看一遍。不目检不允许交付。

## 硬性规则

- 每张图必须有：标题 + 副标题 + 右上角 FIG 编号 + 底部页脚（含日期）。
- 卡片内：`subLines`（多行说明）与 `sub`（单行副题）**互斥**，传给 card 时二选一，同时渲染会重叠。
- 中文宽度按 1em/字估算，拉丁按 0.55em/字；卡片文字宽度超 85% 就必须加宽卡片或换行。
- 分层图左侧放区域编号标签（01/02/03…），层间用带文字底衬的纵向箭头过渡。
- 图例只放底部，不压任何元素；箭头标签必须带背景底衬且离卡片边缘 ≥10px。
- viewBox 四边留 ≥30px 余量；组件最小间距：纵向 40px、横向 30px。

## 主题切换

```js
import { setTheme } from './svg-kit.mjs'
setTheme('dark')   // 必须在构建任何 SVG 之前调用；C 被原地改写，组件自动生效
```

- 浅色为默认；`setTheme('dark')` 后全部组件（卡片/图标徽章/pill/箭头/图框/阴影/FIG 徽章）自动适配
- 深色下 tint 自动换为 rgba 叠加色，主色自动提亮；语义色跨主题不漂移
- 需要跨主题恒为深色的强调面（如事实源大卡），用 `C.deep`（两主题同为 #0B1220）
- 图形脚本支持双主题出图的写法：读 CLI flag 调 setTheme，输出文件名加 `-dark` 后缀（完整示例见仓库 examples/ 目录）

## 文件

- `references/design-system.md` — 色板、字体阶梯、组件规范、24 个图标清单
- `references/patterns.md` — 7 种版式的布局配方（含尺寸数学）
- `scripts/svg-kit.mjs` — SVG 组件库（frame/card/pill/icon/arrow/region），无依赖 Node ESM
- `scripts/example-fig.mjs` — 最小可运行示例，`node example-fig.mjs` 即出图
