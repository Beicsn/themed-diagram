/**
 * themed-diagram 最小示例：node example-fig.mjs && rsvg-convert -w 2400 -o example.png example.svg
 * 加 --dark 输出深色版。
 */
import { C, text, card, arrow, bandLabel, frame, setTheme, writeSvg } from './svg-kit.mjs'

if (process.argv.includes('--dark')) setTheme('dark')
const suffix = process.argv.includes('--dark') ? '-dark' : ''

const svg = frame({
  title: '示例：支付系统总体架构',
  subtitle: '分层架构版式 · 三层 + 层间语义箭头',
  fig: 'FIG 01',
  height: 760,
  body: `
  ${bandLabel(58, 190, '01', '接入层', C.blue)}
  ${card(190, 150, 300, 96, { title: '收银台 Web', sub: 'React · 内嵌 SDK', iconKind: 'browser', color: C.blue, tint: C.blueT })}
  ${card(520, 150, 300, 96, { title: '移动 App', sub: 'iOS / Android', iconKind: 'monitor', color: C.violet, tint: C.violetT })}
  ${card(850, 150, 300, 96, { title: '开放平台', sub: '商户 API', iconKind: 'plug', color: C.teal, tint: C.tealT })}

  ${arrow(650, 246, 650, 320, { color: C.blue, sw: 2.4, label: 'REST / JSON · 令牌认证' })}

  ${bandLabel(58, 404, '02', '网关层', C.cyan)}
  ${card(190, 364, 630, 96, { title: 'API Gateway', subLines: ['路由 · 鉴权 · 限流', '编译期生成契约'], iconKind: 'gateway', color: C.cyan, tint: C.cyanT })}
  ${card(850, 364, 300, 96, { title: '风控前置', sub: '规则引擎 · 失败关闭', iconKind: 'shield', color: C.rose, tint: C.roseT })}

  ${arrow(650, 460, 650, 534, { color: C.cyan, sw: 2.4, label: '服务编排' })}

  ${bandLabel(58, 618, '03', '服务层', C.teal)}
  ${card(190, 578, 300, 96, { title: '支付服务', sub: '收单 · 路由', iconKind: 'server', color: C.teal, tint: C.tealT })}
  ${card(520, 578, 300, 96, { title: '清结算', sub: 'T+1 · 对账', iconKind: 'flow', color: C.teal, tint: C.tealT })}
  ${card(850, 578, 300, 96, { title: '账务库', sub: 'MySQL · 强一致', iconKind: 'db', color: C.amber, tint: C.amberT })}
  ${text(190, 716, '说明：卡片组件自动带图标徽章与投影；subLines 与 sub 互斥。', { size: 12, fill: C.faint })}
`,
})

writeSvg(new URL(`./example${suffix}.svg`, import.meta.url).pathname, svg)
