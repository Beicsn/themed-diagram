# themed-diagram

双主题（浅色汇报 / 深色仪表盘）SVG 图表生成 Skill —— 白色投影卡片、彩色图标徽章、品牌蓝设计系统。
适用于架构分层图、组合/部署矩阵、泳道流水线、枢纽接缝图、同心防御模型、能力地图。

Dual-theme (light presentation / dark dashboard) SVG diagram skill — elevated cards,
icon badges, brand-blue design system. For layered architecture, deployment matrices,
swimlane pipelines, hub-spoke seams, concentric defense models and capability maps.

## Install / 安装

```bash
npx skills add <owner>/themed-diagram
```

## Usage / 使用

对 agent 说出需求即可，例如：

> 用 themed-diagram 画一张 XX 系统总体架构图，分接入层、网关层、服务层、数据层

- 浅色为默认主题；说"深色版"自动切换 `setTheme('dark')`
- 时序图请用 Mermaid；霓虹工程风请用 baoyu-diagram

## Layout / 目录

```
SKILL.md                  # 触发描述、工作流、硬性规则、主题切换
references/
  design-system.md        # 双主题色板、字体阶梯、组件规范、24 个图标
  patterns.md             # 7 种版式的布局配方
scripts/
  svg-kit.mjs             # 无依赖 Node ESM 组件库（20 个导出）
  example-fig.mjs         # 最小可运行示例（node example-fig.mjs）
```

## Render / 渲染

```bash
rsvg-convert -w 2400 -o out.png out.svg    # brew install librsvg
```

无 rsvg-convert 时可用 puppeteer 截图或 sharp 降级。

## License

MIT
