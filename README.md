# Johnson Zhang · 个人项目集（GitHub Showcase）

个人项目介绍站：自动同步 GitHub 上公开、非 fork 的原创仓库，以简洁的个人主页形式呈现——
顶部是头像、名字、简介与统计，下方是可搜索、可按语言筛选、可排序的项目卡片。

**默认浅色主题，可一键切换深色（选择会被记住）。数据由 GitHub Actions 每天北京时间 08:00 自动同步，无需手动维护。**

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
| `index.html` / `style.css` / `app.js` | 展示站前端（双主题） |
| `data.json` | 同步生成的数据（自动提交，可手动改） |
| `scripts/update-data.mjs` | 数据同步脚本 |
| `.github/workflows/scan-and-deploy.yml` | 同步 + 部署工作流 |

## 个性化

- **头像 / 名字 / 一句话介绍**：直接改 GitHub 个人资料（Settings → Profile），次日自动更新；
  个人资料里的 Bio 会替换首页默认介绍语（默认语在 `index.html` 的 `#owner-bio`）。
- **换展示的账号**：修改工作流里 `node scripts/update-data.mjs szwnba` 的用户名（以及 `index.html`、`app.js` 中出现 `szwnba` 的地方）。
- **排除某些仓库**：给 Action 或本地运行加环境变量 `EXCLUDE="repo-a,repo-b"`（默认已排除本站自身）。
- **主题**：默认浅色；右上角按钮切换深浅色，选择保存在浏览器 localStorage。

## 本地开发

```bash
# 生成数据（GH_TOKEN 可选，不配也能跑，只是 API 限流更低）
GH_TOKEN=你的token node scripts/update-data.mjs szwnba

# 本地预览
python3 -m http.server   # 访问 http://localhost:8000
```

## 手动触发更新

仓库 → Actions → **扫描并部署** → Run workflow，随时重新同步部署。
