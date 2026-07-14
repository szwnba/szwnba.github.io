export const translations = {
  // ===== 导航 =====
  nav: {
    home: '首页',
    about: '系统',
    projects: '技能',
    blog: '知识库',
    report: '分析报告',
    todoist: '任务',
  },

  // ===== 底部 =====
  footer: {
    madeWith: 'szwnba 的采集系统 · Hermes Agent v0.17.0',
    rightsReserved: '版权所有',
  },

  // ===== 语言切换 =====
  lang: {
    switchTo: '切换为英文',
    chinese: '中文',
    english: 'English',
  },

  // ===== 主题切换 =====
  theme: {
    switchToLight: '切换到浅色模式',
    switchToDark: '切换到深色模式',
  },

  // ===== 首页 =====
  home: {
    greeting: '👋 你好，我是',
    name: 'szwnba 的采集系统',
    subtitle: '一个运行在 Ubuntu 20.04 上的 AI 驱动信息采集与知识管理平台。自动采集、智能分类、持续进化。',
    aboutMe: '系统简介 🔧',
    aboutMeText:
      '运行在 Hermes Agent (v0.17.0) 框架之上，连接 GitHub / Feishu / Obsidian，每日自动从 4+ 数据源采集情报，构建结构化的三层知识库（采集 → 整理 → 输出）。',

    // 三大特点
    assistantTitle: '智能采集',
    assistantDesc:
      '73 个技能覆盖采集、分析、编码、创作 — 从网页、GitHub、arXiv、RSS 等多源自动采集。',

    hostedTitle: '自托管运行',
    hostedDesc:
      '运行在 3.8GB / 157GB 的 Linux 服务器上，Python 3.12 + Node v24，稳定服役。',

    growingTitle: '持续进化',
    growingDesc:
      '4 个 Cron 任务每日运转：情报官、AI测试采集、GitHub项目发现、Todoist×KB 匹配。',

    // 趣味数据
    funFacts: {
      title: '📊 系统快照',
      first: '知识库：332 篇文章，12 个分类，共 2.6 MB',
      second: 'GitHub：89 个仓库（24 私有 / 65 公开）',
      third: 'Cron 任务：4 个自动化作业每日执行',
      fourth: '技能：45 个可用技能（6 个自主开发），覆盖 9 个类别',
      fifth: '对接平台：Feishu + GitHub + Obsidian',
      sixth: '最后更新：2026-07-15 · 持续运营中 ⚡',
    },

    // 底部
    sayHello: '想了解更多？ 👋',
    findMeOn: '访问我的 GitHub',
    orCheckOut: '或者看看我的',
    blog: '知识库',
    projects: '技能列表',
  },

  // ===== 系统详情页 =====
  about: {
    title: '系统详情 🔧',
    intro: '一个运行中的 AI 采集与知识管理系统。以下是完整的系统配置和运行状态。',

    // 系统信息
    systemInfo: {
      title: '🖥️ 基础系统',
      os: 'Ubuntu 20.04.6 LTS (Focal Fossa)',
      kernel: 'Linux 5.4.0-208-generic x86_64',
      memory: '3.8 GB RAM · 3.8 GB Swap',
      disk: '157 GB (已用 70G / 可用 80G · 47%)',
      python: 'Python 3.12.0 (pyenv)',
      node: 'Node.js v24.14.0',
      shell: '/bin/sh',
    },

    hermesInfo: {
      title: '🤖 Hermes Agent',
      version: 'v0.17.0 (2026.6.19)',
      profile: 'collector（活跃）',
      project: '/usr/local/lib/hermes-agent',
      model: '自定义 Provider',
      pythonRuntime: 'Python 3.11.11 / OpenAI SDK 2.24.0',
    },

    // 采集内容
    collectedContent: {
      title: '📚 知识库（采集内容）',
      inbox: '332 篇文章 in 00_Inbox',
      wiki: '10 个主题页面 in 20_Wiki',
      output: '1 份分析报告 in 30_Outputs',
      categories: [
        { name: 'OpenClaw', count: 80, emoji: '🦞' },
        { name: 'Playwright AI', count: 40, emoji: '🎭' },
        { name: '测试工程', count: 37, emoji: '🧪' },
        { name: '投资与变现', count: 36, emoji: '📈' },
        { name: '浏览器自动化', count: 88, emoji: '🌐' },
        { name: 'AI Skill', count: 23, emoji: '🤖' },
        { name: 'AI 理念与范式', count: 23, emoji: '💡' },
        { name: 'Claude Code & OpenCode', count: 23, emoji: '⌨️' },
        { name: 'Onboarding', count: 21, emoji: '🚀' },
        { name: 'AI Agent', count: 15, emoji: '🧠' },
        { name: '开源工具', count: 10, emoji: '🔧' },
        { name: 'Hermes', count: 10, emoji: '⚡' },
      ],
    },

    // Cron 任务
    cronJobs: {
      title: '⏰ Cron 自动化任务',
      jobs: [
        { name: '情报官每日简报', time: '每日 8:00', desc: '采集 GitHub / arXiv / RSS 的 AI/Agent 情报' },
        { name: 'AI 测试情报采集', time: '每日 20:00', desc: 'AI 驱动的自动化测试领域动态追踪' },
        { name: 'GitHub 项目发现', time: '每日 9:00', desc: 'GitHub Trending 上的 AI 项目推荐' },
        { name: 'Todoist×KB 匹配', time: '12:00 / 20:00 / 23:00', desc: '每日 3 次，关联 Todoist 任务与知识库' },
      ],
    },
  },

  // ===== 技能列表页 =====
  projects: {
    title: '技能与工具 🛠️',
    subtitle: '已安装的 73 个技能，覆盖 13 个类别。点击查看详情。',

    categories: [
      {
        name: 'autonomous-ai-agents',
        emoji: '🤖',
        label: '自主 AI Agent',
        skills: 'Claude Code, Codex, Hermes Agent, OpenCode',
        desc: '编码代理编排与任务委派',
      },
      {
        name: 'creative',
        emoji: '🎨',
        label: '创意生成',
        skills: 'ASCII Art, Excalidraw, p5.js, Manim, ComfyUI, Sketch, Baoyu 等 13 个',
        desc: 'ASCII 艺术、架构图、手绘风格、3D 动画、图像生成',
      },
      {
        name: 'data-science',
        emoji: '📊',
        label: '数据科学',
        skills: 'Hybrid Web Scraper, Jupyter',
        desc: '网页采集 + 交互式数据分析',
      },
      {
        name: 'github',
        emoji: '🐙',
        label: 'GitHub 工作流',
        skills: 'Code Review, PR Workflow, Issues, Auth, Repo Management 等 6 个',
        desc: '完整的 GitHub 操作链：审查、合并、管理',
      },
      {
        name: 'media',
        emoji: '🎵',
        label: '媒体处理',
        skills: 'YouTube Transcript, GIF Search, HeartMuLa, Songsee',
        desc: '音视频内容提取与生成',
      },
      {
        name: 'mlops',
        emoji: '🧬',
        label: 'MLOps',
        skills: 'llama.cpp, vLLM, HuggingFace Hub, lm-eval, W&B, SAM, AudioCraft 等 7 个',
        desc: '模型推理、评估、部署全套工具链',
      },
      {
        name: 'note-taking',
        emoji: '📝',
        label: '笔记管理',
        skills: 'Obsidian',
        desc: '知识库读写查询',
      },
      {
        name: 'productivity',
        emoji: '⚡',
        label: '生产力工具',
        skills: 'Airtable, Google Workspace, Intelligence Agent, KB Utilization, Maps, PDF, Notion, PPT 等 10 个',
        desc: '办公自动化、文档处理、智能体构建',
      },
      {
        name: 'research',
        emoji: '🔬',
        label: '研究与情报',
        skills: 'arXiv, Blogwatcher, last30days, LLM Wiki, Polymarket, 论文写作 等 7 个',
        desc: '学术搜索、博客监控、多平台调研',
      },
      {
        name: 'software-development',
        emoji: '💻',
        label: '软件开发',
        skills: 'Debugger, TDD, Code Review, Plan, Spike, Simplifier, 技能创作 等 8 个',
        desc: '开发全流程：调试、测试、计划、简化',
      },
      {
        name: 'email',
        emoji: '📧',
        label: '邮件',
        skills: 'Himalaya CLI',
        desc: 'IMAP/SMTP 终端邮件',
      },
      {
        name: 'social-media',
        emoji: '🐦',
        label: '社交媒体',
        skills: 'xurl (X/Twitter)',
        desc: 'Twitter v2 API 发布与搜索',
      },
      {
        name: 'smart-home',
        emoji: '💡',
        label: '智能家居',
        skills: 'OpenHue',
        desc: 'Philips Hue 灯光控制',
      },
    ],
  },

  // ===== 分析报告 =====
  report: {
    title: '📊 知识库全景分析报告',
    subtitle: '308 篇素材 · 13 个分类 · 全量数据分析',
    generated: '生成时间',
    dataSource: '00_Inbox/ 全量 308 篇素材',
    scope: '13 个主题分类',
    overview: '概览',
    metrics: '指标',
    value: '数值',
  },

  // ===== 知识库 =====
  blog: {
    title: '知识库 📚',
    subtitle: '332 篇采集文章 · 12 个分类 · 持续更新中',
    readMore: '查看详情 →',
    backToBlog: '← 返回知识库',
    backToAll: '← 返回全部',
    share: '分享：',
  },

  // ===== 任务分析 =====
  todoist: {
    title: '📋 Todoist 任务分析',
    subtitle: '当前待办 · 分类统计 · 执行建议',
    overview: '任务概览',
    total: '总任务',
    inbox: '收集箱',
    reserve: '储备任务',
    scheduled: '定时任务',
    priority: '优先级分布',
    high: '高',
    normal: '普通',
    labels: '标签',
    noDue: '无截止日',
    overdue: '已逾期',
    today: '今天到期',
    tasks: '个任务',
    analysis: '分析建议',
    suggestion1: '当前所有任务都在「收集箱」中，建议分类整理：',
    suggestion2: '将「AI 测试」等有明确时间节点的移到「定时任务」',
    suggestion3: '将「照片处理」「文案工具」等长期课题移到「储备任务」',
    suggestion4: '给关键任务设置优先级（红色=高、橙色=中）',
    projectBreakdown: '项目分布',
    noProjectTasks: '储备/定时项目暂无任务',
    taskList: '任务清单',
    taskAnalysis: '任务分析',
  },

  // ===== 404 =====
  notFound: {
    title: '404 —— 页面未找到 🔍',
    subtitle: '嗯... 这里的文章还没被采集到。',
    back: '回到首页 →',
  },
}