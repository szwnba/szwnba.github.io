# 开源项目扫描站 · GitHub Showcase

个人 GitHub 项目展示站：自动同步公开、非 fork 的原创仓库，以"扫描站"的形式呈现——
雷达图把每个项目画成信号点（距圆心越近 = 推送越新，光点越大 = Star 越多，颜色 = 主语言），
下方是可搜索、可按语言筛选、可排序的项目卡片。

**数据由 GitHub Actions 每天北京时间 08:00 自动扫描 GitHub API 生成，无需手动维护。**

线上地址：<https://szwnba.github.io/github-showcase/>

## 工作原理

```
GitHub Actions (每日 08:00 / 手动 / push)
  ├─ scripts/update-data.mjs  拉取公开非 fork 仓库 → data.json
  ├─ data.json 有变化则自动提交回仓库
  └─ 部署整站到 GitHub Pages
```

前端为纯静态页面（无构建、无依赖），运行时读取 `data.json` 渲染。

## 文件结构

| 文件 | 作用 |
| --- | --- |
| `index.html` / `style.css` / `app.js` | 展示站前端 |
| `data.json` | 扫描生成的数据（自动提交，可手动改） |
| `scripts/update-data.mjs` | 数据同步脚本 |
| `.github/workflows/scan-and-deploy.yml` | 扫描 + 部署工作流 |

## 自定义

- **换展示的账号**：修改工作流里 `node scripts/update-data.mjs szwnba` 的用户名（以及 `index.html`、`app.js` 中出现 `szwnba` 的地方）。
- **排除某些仓库**：给 Action 或本地运行加环境变量 `EXCLUDE="repo-a,repo-b"`（默认已排除本展示站自身）。
- **本地生成数据**：`GH_TOKEN=你的token node scripts/update-data.mjs szwnba`（不带 token 也能跑，只是限流更低）。
- **本地预览**：`python3 -m http.server` 后访问 http://localhost:8000 。

## 手动触发更新

仓库 → Actions → **扫描并部署** → Run workflow，随时重新扫描部署。

## 首次启用 Pages（参考）

Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。
（使用 API 开站时即此配置。）
