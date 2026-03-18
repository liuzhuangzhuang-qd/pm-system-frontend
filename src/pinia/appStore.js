import { defineStore } from 'pinia'

const PRIMARY_COLOR_KEY = 'pm_primary_color'
const SIDEBAR_THEME_KEY = 'pm_sidebar_theme'

function clamp01(n) {
  return Math.min(1, Math.max(0, n))
}

function hexToRgb(hex) {
  const raw = String(hex || '').trim().replace('#', '')
  if (![3, 6].includes(raw.length)) return null
  const h = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw
  const n = Number.parseInt(h, 16)
  if (Number.isNaN(n)) return null
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function rgbToHex({ r, g, b }) {
  const to2 = (x) => x.toString(16).padStart(2, '0')
  return `#${to2(r)}${to2(g)}${to2(b)}`
}

// mix = 0 → base, mix = 1 → target
function mixRgb(base, target, mix) {
  const t = clamp01(mix)
  const m = (a, b) => Math.round(a + (b - a) * t)
  return { r: m(base.r, target.r), g: m(base.g, target.g), b: m(base.b, target.b) }
}

function applyElementPlusPrimaryColor(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return
  const root = document.documentElement
  root.style.setProperty('--el-color-primary', hex)
  // 参考 Element Plus 变量命名：light-3/5/7/8/9 & dark-2
  root.style.setProperty('--el-color-primary-light-3', rgbToHex(mixRgb(rgb, { r: 255, g: 255, b: 255 }, 0.3)))
  root.style.setProperty('--el-color-primary-light-5', rgbToHex(mixRgb(rgb, { r: 255, g: 255, b: 255 }, 0.5)))
  root.style.setProperty('--el-color-primary-light-7', rgbToHex(mixRgb(rgb, { r: 255, g: 255, b: 255 }, 0.7)))
  root.style.setProperty('--el-color-primary-light-8', rgbToHex(mixRgb(rgb, { r: 255, g: 255, b: 255 }, 0.8)))
  root.style.setProperty('--el-color-primary-light-9', rgbToHex(mixRgb(rgb, { r: 255, g: 255, b: 255 }, 0.9)))
  root.style.setProperty('--el-color-primary-dark-2', rgbToHex(mixRgb(rgb, { r: 0, g: 0, b: 0 }, 0.2)))
}

function applySidebarTheme(theme) {
  const root = document.documentElement
  const t = theme === 'light' ? 'light' : 'dark'
  root.setAttribute('data-sidebar-theme', t)
}

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebarCollapsed: false,
    primaryColor: localStorage.getItem(PRIMARY_COLOR_KEY) || '#409eff',
    sidebarTheme: localStorage.getItem(SIDEBAR_THEME_KEY) || 'dark'
  }),
  actions: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    }
    ,
    setPrimaryColor(color) {
      this.primaryColor = color
      localStorage.setItem(PRIMARY_COLOR_KEY, color)
      // 立即生效
      applyElementPlusPrimaryColor(color)
    },
    applyTheme() {
      applyElementPlusPrimaryColor(this.primaryColor)
      applySidebarTheme(this.sidebarTheme)
    },
    setSidebarTheme(theme) {
      const t = theme === 'light' ? 'light' : 'dark'
      this.sidebarTheme = t
      localStorage.setItem(SIDEBAR_THEME_KEY, t)
      applySidebarTheme(t)
    }
  }
})

