/**
 * themed-diagram SVG 组件库 — 浅色汇报级图表
 * 无依赖 Node ESM。用法：复制本文件到产出目录，见 example-fig.mjs。
 */
import { writeFileSync } from 'node:fs'

export const FONT = 'PingFang SC, Hiragino Sans GB, Noto Sans CJK SC, Microsoft YaHei, sans-serif'
export const MONO = 'SF Mono, Menlo, Consolas, monospace'

export const C = {
  ink: '#0B1220', ink2: '#1E293B', muted: '#5B6B84', faint: '#8A99B0',
  line: '#D9E1EE', bg: '#F4F7FC', card: '#FFFFFF',
  blue: '#3D5AFE', blueDeep: '#2436B8', blueT: '#EEF2FF',
  cyan: '#0891B2', cyanT: '#ECFEFF',
  teal: '#0E9F8E', tealT: '#ECFDF7',
  green: '#0F9F6E', greenT: '#ECFDF5',
  amber: '#D97706', amberT: '#FFF7ED',
  rose: '#E11D48', roseT: '#FFF1F3',
  violet: '#7C3AED', violetT: '#F5F3FF',
  slate: '#64748B', slateT: '#F1F5F9',
  deep: '#0B1220',
}

/** 浅色主题快照（setTheme 复位用） */
const LIGHT = { ...C }

/**
 * 深色主题覆盖：表面/文字换深色，tint 换 rgba 叠加色，主色提亮。
 * 语义色（blue/teal/...）跨主题保持同一语义，只调明度。
 */
export const DARK = {
  bg: '#0B1220', card: '#151D2E', line: '#2A3648',
  ink: '#F1F5F9', ink2: '#E2E8F0', muted: '#94A3B8', faint: '#64748B',
  blue: '#5B74FF', blueDeep: '#3D5AFE', cyan: '#22D3EE',
  teal: '#34D399', green: '#34D399', amber: '#FBBF24',
  rose: '#FB7185', violet: '#A78BFA', slate: '#94A3B8',
  blueT: 'rgba(91,116,255,0.16)', cyanT: 'rgba(34,211,238,0.14)',
  tealT: 'rgba(52,211,153,0.14)', greenT: 'rgba(52,211,153,0.14)',
  amberT: 'rgba(251,191,36,0.15)', roseT: 'rgba(251,113,133,0.15)',
  violetT: 'rgba(167,139,250,0.17)', slateT: 'rgba(148,163,184,0.12)',
}

let theme = 'light'

/** 切换主题。必须在构建任何 SVG 之前调用；C 被原地改写，组件自动生效。 */
export const setTheme = (name) => {
  Object.assign(C, LIGHT)
  if (name === 'dark') Object.assign(C, DARK)
  theme = name
}
export const getTheme = () => theme

export const esc = (s) => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

export const text = (x, y, s, o = {}) => {
  const { size = 16, weight = 400, fill = C.ink, anchor = 'start', family = FONT, opacity = 1, letter = 0 } = o
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" opacity="${opacity}" letter-spacing="${letter}">${esc(s)}</text>`
}

export const lines = (x, y, arr, o = {}) => {
  const { gap = 19, size = 14, weight = 400, fill = C.muted, anchor = 'start', family = FONT } = o
  return arr.map((s, i) => text(x, y + i * gap, s, { size, weight, fill, anchor, family })).join('')
}

export const rect = (x, y, w, h, o = {}) => {
  const { fill = C.card, stroke = C.line, sw = 1.2, rx = 16, shadow = false, opacity = 1, dash } = o
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" opacity="${opacity}"${shadow ? ' filter="url(#shadow)"' : ''}${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

export const circle = (cx, cy, r, fill, o = {}) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw ?? 1.2}"` : ''}${o.opacity ? ` opacity="${o.opacity}"` : ''}/>`

export const dot = (x, y, color, r = 4) => circle(x, y, r, color)

export const pill = (x, y, w, h, label, o = {}) => {
  const { fill = C.blueT, stroke = 'none', color = C.blue, size = 13, weight = 600, rx = 999, family = FONT } = o
  return `${rect(x, y, w, h, { fill, stroke, rx })}${text(x + w / 2, y + h / 2 + size * 0.36, label, { size, weight, fill: color, anchor: 'middle', family })}`
}

const MARKER_COLORS = ['ink', 'muted', 'blue', 'teal', 'green', 'amber', 'rose', 'violet', 'slate', 'cyan']

const defs = () => `<defs>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="7" stdDeviation="11" flood-color="#0B1220" flood-opacity="${theme === 'dark' ? 0.35 : 0.09}"/></filter>
  <filter id="shadowSm" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#0B1220" flood-opacity="0.08"/></filter>
  <linearGradient id="g-blue" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#5B74FF"/><stop offset="1" stop-color="#2C43C7"/></linearGradient>
  <linearGradient id="g-navy" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#172554"/><stop offset="1" stop-color="#0B1220"/></linearGradient>
  <linearGradient id="g-teal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#14B8A6"/><stop offset="1" stop-color="#0E7C74"/></linearGradient>
  <linearGradient id="g-violet" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#A78BFA"/><stop offset="1" stop-color="#6D28D9"/></linearGradient>
  <linearGradient id="g-amber" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FBBF24"/><stop offset="1" stop-color="#B45309"/></linearGradient>
  ${MARKER_COLORS.map((k) => `<marker id="a-${k}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C[k]}"/></marker>`).join('')}
</defs>`

const markerKey = (color) => {
  const hit = Object.entries(C).find(([, v]) => v.toLowerCase() === String(color).toLowerCase())
  return hit ? hit[0] : 'muted'
}

export const arrow = (x1, y1, x2, y2, o = {}) => {
  const { color = C.muted, sw = 2, dash, label, labelFill = C.card, curve = 0 } = o
  const mx = (x1 + x2) / 2 + curve
  const my = (y1 + y2) / 2
  const d = curve ? `M${x1},${y1} Q${mx},${my} ${x2},${y2}` : `M${x1},${y1} L${x2},${y2}`
  const labelSvg = label
    ? (() => {
        const size = 12
        const w = [...label].reduce((a, ch) => a + (ch.charCodeAt(0) > 255 ? 1 : 0.55), 0) * size + 16
        return `${rect(mx - w / 2, my - 11, w, 22, { fill: labelFill, stroke: 'none', rx: 6 })}${text(mx, my + 4, label, { size, fill: color, anchor: 'middle', weight: 600 })}`
      })()
    : ''
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''} marker-end="url(#a-${markerKey(color)})"/>${labelSvg}`
}

export const pathArrow = (d, o = {}) => {
  const { color = C.muted, sw = 2, dash } = o
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''} marker-end="url(#a-${markerKey(color)})"/>`
}

export const lineSeg = (x1, y, x2, color) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${color}" stroke-width="1"/>`

export const icon = (kind, x, y, size, color) => {
  const s = size, h = s / 2
  const st = `stroke="${color}" stroke-width="${Math.max(1.6, s / 13)}" fill="none" stroke-linecap="round" stroke-linejoin="round"`
  switch (kind) {
    case 'browser': return `<g transform="translate(${x},${y})"><rect x="1" y="1" width="${s-2}" height="${s-2}" rx="${s*0.16}" ${st}/><line x1="1" y1="${s*0.3}" x2="${s-1}" y2="${s*0.3}" ${st}/>${dot(s*0.2, s*0.15, color, s*0.045)}${dot(s*0.34, s*0.15, color, s*0.045)}</g>`
    case 'monitor': return `<g transform="translate(${x},${y})"><rect x="1" y="2" width="${s-2}" height="${s*0.62}" rx="${s*0.12}" ${st}/><line x1="${h}" y1="${s*0.64}" x2="${h}" y2="${s*0.82}" ${st}/><line x1="${s*0.3}" y1="${s*0.86}" x2="${s*0.7}" y2="${s*0.86}" ${st}/></g>`
    case 'terminal': return `<g transform="translate(${x},${y})"><rect x="1" y="3" width="${s-2}" height="${s*0.7}" rx="${s*0.13}" ${st}/><path d="M${s*0.2},${s*0.26} l${s*0.14},${s*0.11} l-${s*0.14},${s*0.11}" ${st}/><line x1="${s*0.44}" y1="${s*0.48}" x2="${s*0.68}" y2="${s*0.48}" ${st}/></g>`
    case 'code': return `<g transform="translate(${x},${y})"><path d="M${s*0.32},${s*0.18} L${s*0.12},${s*0.5} L${s*0.32},${s*0.82}" ${st}/><path d="M${s*0.68},${s*0.18} L${s*0.88},${s*0.5} L${s*0.68},${s*0.82}" ${st}/><line x1="${s*0.56}" y1="${s*0.16}" x2="${s*0.44}" y2="${s*0.84}" ${st}/></g>`
    case 'plug': return `<g transform="translate(${x},${y})"><path d="M${s*0.34},${s*0.12} v${s*0.22} M${s*0.66},${s*0.12} v${s*0.22}" ${st}/><rect x="${s*0.2}" y="${s*0.34}" width="${s*0.6}" height="${s*0.28}" rx="${s*0.1}" ${st}/><path d="M${s*0.5},${s*0.62} v${s*0.14} a${s*0.16},${s*0.16} 0 0 1 -${s*0.32},0" ${st}/></g>`
    case 'server': return `<g transform="translate(${x},${y})"><rect x="1" y="2" width="${s-2}" height="${s*0.26}" rx="${s*0.07}" ${st}/><rect x="1" y="${s*0.37}" width="${s-2}" height="${s*0.26}" rx="${s*0.07}" ${st}/><rect x="1" y="${s*0.72}" width="${s-2}" height="${s*0.26}" rx="${s*0.07}" ${st}/>${dot(s*0.18, s*0.15, color, s*0.035)}${dot(s*0.18, s*0.5, color, s*0.035)}${dot(s*0.18, s*0.85, color, s*0.035)}</g>`
    case 'gateway': return `<g transform="translate(${x},${y})"><rect x="${s*0.36}" y="${s*0.3}" width="${s*0.28}" height="${s*0.4}" rx="${s*0.08}" ${st}/><path d="M${s*0.1},${s*0.22} H${s*0.32} M${s*0.1},${s*0.78} H${s*0.32} M${s*0.68},${s*0.22} H${s*0.9} M${s*0.68},${s*0.78} H${s*0.9}" ${st}/></g>`
    case 'agent': return `<g transform="translate(${x},${y})"><circle cx="${h}" cy="${h}" r="${s*0.16}" ${st}/><ellipse cx="${h}" cy="${h}" rx="${s*0.4}" ry="${s*0.2}" ${st} transform="rotate(-25 ${h} ${h})"/><ellipse cx="${h}" cy="${h}" rx="${s*0.4}" ry="${s*0.2}" ${st} transform="rotate(55 ${h} ${h})"/></g>`
    case 'log': return `<g transform="translate(${x},${y})"><ellipse cx="${h}" cy="${s*0.2}" rx="${s*0.38}" ry="${s*0.14}" ${st}/><path d="M${s*0.12},${s*0.2} v${s*0.58} a${s*0.38},${s*0.14} 0 0 0 ${s*0.76},0 V${s*0.2}" ${st}/><path d="M${s*0.12},${s*0.44} a${s*0.38},${s*0.14} 0 0 0 ${s*0.76},0" ${st}/></g>`
    case 'prompt': return `<g transform="translate(${x},${y})"><rect x="1" y="3" width="${s-2}" height="${s*0.7}" rx="${s*0.1}" ${st}/><line x1="${s*0.2}" y1="${s*0.28}" x2="${s*0.8}" y2="${s*0.28}" ${st}/><line x1="${s*0.2}" y1="${s*0.46}" x2="${s*0.66}" y2="${s*0.46}" ${st}/><line x1="${s*0.2}" y1="${s*0.64}" x2="${s*0.52}" y2="${s*0.64}" ${st}/></g>`
    case 'spark': return `<g transform="translate(${x},${y})"><path d="M${h},${s*0.08} L${s*0.6},${s*0.4} L${s*0.92},${h} L${s*0.6},${s*0.6} L${h},${s*0.92} L${s*0.4},${s*0.6} L${s*0.08},${h} L${s*0.4},${s*0.4} Z" ${st}/></g>`
    case 'tool': return `<g transform="translate(${x},${y})"><path d="M${s*0.22},${s*0.78} L${s*0.62},${s*0.38}" ${st}/><path d="M${s*0.58},${s*0.14} a${s*0.2},${s*0.2} 0 1 0 ${s*0.26},${s*0.26} l-${s*0.1},-${s*0.1} l-${s*0.16},${s*0.16} l-${s*0.1},-${s*0.1} Z" ${st}/></g>`
    case 'db': return `<g transform="translate(${x},${y})"><ellipse cx="${h}" cy="${s*0.22}" rx="${s*0.34}" ry="${s*0.13}" ${st}/><path d="M${s*0.16},${s*0.22} v${s*0.5} a${s*0.34},${s*0.13} 0 0 0 ${s*0.68},0 V${s*0.22}" ${st}/></g>`
    case 'shield': return `<g transform="translate(${x},${y})"><path d="M${h},${s*0.08} L${s*0.86},${s*0.24} v${s*0.3} c0,${s*0.24} -${s*0.18},${s*0.32} -${s*0.36},${s*0.38} c-${s*0.18},-${s*0.06} -${s*0.36},-${s*0.14} -${s*0.36},-${s*0.38} v-${s*0.3} Z" ${st}/><path d="M${s*0.36},${s*0.48} l${s*0.1},${s*0.1} l${s*0.2},-${s*0.2}" ${st}/></g>`
    case 'puzzle': return `<g transform="translate(${x},${y})"><path d="M${s*0.14},${s*0.2} h${s*0.22} a${s*0.1},${s*0.1} 0 1 1 ${s*0.16},0 h${s*0.2} v${s*0.22} a${s*0.1},${s*0.1} 0 1 1 0,${s*0.16} v${s*0.22} h-${s*0.2} a${s*0.1},${s*0.1} 0 1 0 -${s*0.16},0 h-${s*0.22} v-${s*0.22} a${s*0.1},${s*0.1} 0 1 0 0,-${s*0.16} Z" ${st}/></g>`
    case 'layers': return `<g transform="translate(${x},${y})"><path d="M${h},${s*0.1} L${s*0.9},${s*0.34} L${h},${s*0.58} L${s*0.1},${s*0.34} Z" ${st}/><path d="M${s*0.1},${s*0.5} L${h},${s*0.74} L${s*0.9},${s*0.5}" ${st}/><path d="M${s*0.1},${s*0.66} L${h},${s*0.9} L${s*0.9},${s*0.66}" ${st}/></g>`
    case 'cloud': return `<g transform="translate(${x},${y})"><path d="M${s*0.26},${s*0.7} a${s*0.18},${s*0.18} 0 0 1 -${s*0.02},-${s*0.36} a${s*0.24},${s*0.24} 0 0 1 ${s*0.46},-${s*0.1} a${s*0.18},${s*0.18} 0 0 1 ${s*0.06},${s*0.46} Z" ${st}/></g>`
    case 'lock': return `<g transform="translate(${x},${y})"><rect x="${s*0.2}" y="${s*0.44}" width="${s*0.6}" height="${s*0.44}" rx="${s*0.08}" ${st}/><path d="M${s*0.32},${s*0.44} v-${s*0.12} a${s*0.18},${s*0.18} 0 0 1 ${s*0.36},0 v${s*0.12}" ${st}/></g>`
    case 'user': return `<g transform="translate(${x},${y})"><circle cx="${h}" cy="${s*0.3}" r="${s*0.16}" ${st}/><path d="M${s*0.18},${s*0.88} a${s*0.32},${s*0.3} 0 0 1 ${s*0.64},0" ${st}/></g>`
    case 'gear': return `<g transform="translate(${x},${y})"><circle cx="${h}" cy="${h}" r="${s*0.16}" ${st}/><circle cx="${h}" cy="${h}" r="${s*0.34}" ${st}/><path d="M${h},${s*0.04} v${s*0.12} M${h},${s*0.84} v${s*0.12} M${s*0.04},${h} h${s*0.12} M${s*0.84},${h} h${s*0.12}" ${st}/></g>`
    case 'search': return `<g transform="translate(${x},${y})"><circle cx="${s*0.42}" cy="${s*0.42}" r="${s*0.24}" ${st}/><line x1="${s*0.6}" y1="${s*0.6}" x2="${s*0.86}" y2="${s*0.86}" ${st}/></g>`
    case 'flow': return `<g transform="translate(${x},${y})"><rect x="${s*0.08}" y="${s*0.12}" width="${s*0.26}" height="${s*0.2}" rx="${s*0.05}" ${st}/><rect x="${s*0.62}" y="${s*0.38}" width="${s*0.26}" height="${s*0.2}" rx="${s*0.05}" ${st}/><rect x="${s*0.08}" y="${s*0.68}" width="${s*0.26}" height="${s*0.2}" rx="${s*0.05}" ${st}/><path d="M${s*0.34},${s*0.22} H${s*0.5} V${s*0.48} H${s*0.62} M${s*0.34},${s*0.78} H${s*0.5} V${s*0.48}" ${st}/></g>`
    case 'check': return `<g transform="translate(${x},${y})"><circle cx="${h}" cy="${h}" r="${s*0.42}" ${st}/><path d="M${s*0.28},${h} l${s*0.15},${s*0.15} l${s*0.3},-${s*0.32}" ${st}/></g>`
    default: return `<g transform="translate(${x},${y})"><circle cx="${h}" cy="${h}" r="${s*0.4}" ${st}/></g>`
  }
}

export const iconBadge = (x, y, size, kind, color, tint) =>
  `${circle(x + size / 2, y + size / 2, size / 2, tint)}${icon(kind, x + size * 0.24, y + size * 0.24, size * 0.52, color)}`

export const card = (x, y, w, h, o = {}) => {
  const {
    title, sub, subLines, iconKind, color = C.blue, tint = C.blueT,
    fill = C.card, stroke = C.line, titleSize = 17, subSize = 13,
    shadow = true, dash, badge, compact = false,
  } = o
  const iconSize = compact ? 34 : 40
  const tx = iconKind ? x + (compact ? 56 : 66) : x + 20
  const ty = iconKind ? y + (compact ? 29 : 34) : y + 30
  // 规则：sub 与 subLines 互斥，多行说明只传 subLines，否则重叠
  return `${rect(x, y, w, h, { fill, stroke, shadow, dash })}
  ${iconKind ? iconBadge(x + 16, y + (compact ? 13 : 16), iconSize, iconKind, color, tint) : ''}
  ${title ? text(tx, ty, title, { size: titleSize, weight: 700, fill: C.ink }) : ''}
  ${subLines ? lines(tx, ty + 22, subLines, { size: subSize, fill: C.muted, gap: 19 }) : sub ? text(tx, ty + (compact ? 19 : 22), sub, { size: subSize, fill: C.muted }) : ''}
  ${badge ? pill(x + w - 58, y + 14, 44, 22, badge, { fill: tint, color, size: 11, weight: 700 }) : ''}`
}

export const bandLabel = (x, y, no, label, color) =>
  `${text(x, y, no, { size: 13, weight: 700, fill: color, family: MONO, letter: 1 })}${text(x, y + 24, label, { size: 18, weight: 700, fill: C.ink2 })}`

export const sectionTitle = (x, y, label, sub) =>
  `${text(x, y, label, { size: 16, weight: 700, fill: C.ink2 })}${sub ? text(x, y + 22, sub, { size: 12, fill: C.faint }) : ''}`

/** 图框：标题 + 副标题 + FIG 徽章 + 页脚。body 为内层 SVG 片段。 */
export const frame = ({ title, subtitle, fig, height = 1000, width = 1600, body, note }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
${defs()}
<rect width="${width}" height="${height}" fill="${C.bg}"/>
<circle cx="${width - 90}" cy="18" r="150" fill="${C.blue}" opacity="0.035"/>
<circle cx="${width - 240}" cy="40" r="90" fill="${C.teal}" opacity="0.04"/>
<rect x="48" y="42" width="7" height="58" rx="3.5" fill="url(#g-blue)"/>
${text(74, 68, title, { size: 31, weight: 700, fill: C.ink })}
${text(75, 96, subtitle, { size: 15, fill: C.muted })}
${pill(width - 196, 44, 148, 30, fig, { fill: C.ink, color: C.bg, size: 12, weight: 700, rx: 8 })}
<line x1="48" y1="${height - 54}" x2="${width - 48}" y2="${height - 54}" stroke="${C.line}" stroke-width="1"/>
${text(48, height - 26, note ?? '架构设计说明', { size: 12, fill: C.faint })}
${text(width - 48, height - 26, new Date().toISOString().slice(0, 7), { size: 12, fill: C.faint, anchor: 'end' })}
${body}
</svg>
`

/** 渲染入口：写 SVG 文件并提示转 PNG 命令。 */
export const writeSvg = (path, svg) => {
  writeFileSync(path, svg)
  console.log(`wrote ${path}`)
  console.log(`render: rsvg-convert -w 2400 -o ${path.replace(/\.svg$/, '.png')} ${path}`)
}
