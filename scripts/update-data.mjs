#!/usr/bin/env node
/**
 * 开源项目扫描站 · 数据同步脚本
 * 从 GitHub API 拉取指定用户的公开、非 fork 仓库，生成前端使用的 data.json。
 *
 * 用法:
 *   GH_TOKEN=xxx node scripts/update-data.mjs <username>
 *
 * 筛选规则:
 *   - 仅 public 仓库
 *   - 排除 fork
 *   - 排除空仓库 (size === 0)
 *   - 排除 EXCLUDE 环境变量中逗号分隔的仓库名 (默认排除本展示站自身)
 */
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const OWNER = process.argv[2] || 'szwnba'
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN
const EXCLUDE = (process.env.EXCLUDE || 'github-showcase')
  .split(',').map(s => s.trim()).filter(Boolean)
const API = 'https://api.github.com'
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'github-showcase-updater',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
}

async function api(url) {
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${url}`)
  return res.json()
}

// ---- 用户信息 ----
const user = await api(`${API}/users/${OWNER}`)

// ---- 分页拉取仓库 ----
let page = 1
const all = []
for (;;) {
  const batch = await api(
    `${API}/users/${OWNER}/repos?per_page=100&page=${page++}&type=owner&sort=pushed`
  )
  all.push(...batch)
  if (batch.length < 100) break
}

const repos = all.filter(
  r => !r.fork && !r.private && r.size > 0 && !EXCLUDE.includes(r.name)
)

// ---- 每个仓库的语言构成 (字节数 -> 百分比) ----
const reposWithLangs = await Promise.all(
  repos.map(async r => {
    let languages = []
    try {
      const langs = await api(`${r.url}/languages`)
      const total = Object.values(langs).reduce((a, b) => a + b, 0)
      if (total > 0) {
        languages = Object.entries(langs)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, bytes]) => ({
            name,
            pct: Math.round((bytes / total) * 1000) / 10,
          }))
      }
    } catch { /* 语言接口失败不阻塞整体 */ }
    return {
      name: r.name,
      description: r.description || '',
      url: r.html_url,
      homepage: r.homepage || '',
      topics: r.topics || [],
      language: r.language || null,
      languages,
      stars: r.stargazers_count,
      forks: r.forks_count,
      pushed_at: r.pushed_at,
      created_at: r.created_at,
      archived: r.archived,
    }
  })
)

// ---- 汇总统计 ----
const languageCount = {}
let totalStars = 0
let totalForks = 0
for (const r of reposWithLangs) {
  if (r.language) languageCount[r.language] = (languageCount[r.language] || 0) + 1
  totalStars += r.stars
  totalForks += r.forks
}

const data = {
  owner: {
    login: user.login,
    name: user.name || user.login,
    bio: user.bio || '',
    avatar_url: user.avatar_url,
    html_url: user.html_url,
    followers: user.followers,
  },
  stats: {
    repos: reposWithLangs.length,
    stars: totalStars,
    forks: totalForks,
    languages: Object.entries(languageCount)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count })),
  },
  repos: reposWithLangs.sort((a, b) => b.pushed_at.localeCompare(a.pushed_at)),
  generated_at: new Date().toISOString(),
}

const file = join(ROOT, 'data.json')
const prev = existsSync(file) ? readFileSync(file, 'utf8') : ''
const next = JSON.stringify(data, null, 2) + '\n'
writeFileSync(file, next)

console.log(
  `已扫描 ${data.stats.repos} 个项目 · ${totalStars} Stars · ${data.stats.languages.length} 种语言`
)
console.log(prev === next ? 'data.json 未变化' : 'data.json 已更新')
