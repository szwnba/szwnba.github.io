import { translations as zh } from './zh'
import { translations as en } from './en'

export type Lang = 'zh' | 'en'
export const DEFAULT_LANG: Lang = 'zh'

const dict = { zh, en }

/**
 * Get nested value by path: t('home.greeting', lang)
 */
export function t(key: string, lang: Lang = DEFAULT_LANG): string {
  const parts = key.split('.')
  let obj: any = dict[lang] || dict[DEFAULT_LANG]

  for (const p of parts) {
    if (obj && typeof obj === 'object' && p in obj) {
      obj = obj[p]
    } else {
      // fallback to default language
      let fallback: any = dict[DEFAULT_LANG]
      for (const fp of parts) {
        if (fallback && typeof fallback === 'object' && fp in fallback) {
          fallback = fallback[fp]
        } else {
          return key
        }
      }
      return typeof fallback === 'string' ? fallback : key
    }
  }

  return typeof obj === 'string' ? obj : key
}

/**
 * Get nested object (e.g. array of tech stack items)
 */
export function tObj<T = any>(key: string, lang: Lang = DEFAULT_LANG): T {
  const parts = key.split('.')
  let obj: any = dict[lang] || dict[DEFAULT_LANG]

  for (const p of parts) {
    if (obj && typeof obj === 'object' && p in obj) {
      obj = obj[p]
    } else {
      let fallback: any = dict[DEFAULT_LANG]
      for (const fp of parts) {
        if (fallback && typeof fallback === 'object' && fp in fallback) {
          fallback = fallback[fp]
        } else {
          return null as T
        }
      }
      return fallback as T
    }
  }
  return obj as T
}

/**
 * On the client side, detect language from localStorage or browser
 */
export function detectLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG
  const stored = window.localStorage.getItem('lang') as Lang | null
  if (stored === 'zh' || stored === 'en') return stored

  // Detect from browser (Chinese → zh, other → en)
  const browser = window.navigator.language.toLowerCase()
  if (browser.startsWith('zh')) return 'zh'
  return 'en'
}

/**
 * Apply language to DOM — updates data-lang attribute
 */
export function applyLang(lang: Lang) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-lang', lang)
  window.localStorage.setItem('lang', lang)
}
