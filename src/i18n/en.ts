export const translations = {
  // ===== Nav =====
  nav: {
    home: 'Home',
    about: 'System',
    projects: 'Skills',
    blog: 'Knowledge Base',
    report: 'Report',
  },

  // ===== Footer =====
  footer: {
    madeWith: "szwnba's Collector System · Hermes Agent v0.17.0",
    rightsReserved: 'All rights reserved',
  },

  // ===== Language Switcher =====
  lang: {
    switchTo: 'Switch to Chinese',
    chinese: '中文',
    english: 'English',
  },

  // ===== Theme Toggle =====
  theme: {
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
  },

  // ===== Home Page =====
  home: {
    greeting: "👋 Hello, I'm",
    name: "szwnba's Collector System",
    subtitle:
      'An AI-driven info collection & knowledge management platform running on Ubuntu 20.04. Auto-collects, intelligently categorizes, continuously evolves.',
    aboutMe: 'System Overview 🔧',
    aboutMeText:
      'Built on Hermes Agent (v0.17.0), integrated with GitHub / Feishu / Obsidian. Collects intelligence daily from 4+ data sources and builds a structured 3-layer knowledge base (Collect → Organize → Output).',

    assistantTitle: 'Smart Collection',
    assistantDesc:
      '73 skills covering collection, analysis, coding, creation — auto-collecting from web, GitHub, arXiv, RSS and more.',

    hostedTitle: 'Self-hosted',
    hostedDesc:
      'Runs on a 3.8GB / 157GB Linux server with Python 3.12 + Node v24. Stable and reliable.',

    growingTitle: 'Always Growing',
    growingDesc:
      '4 Cron jobs running daily: Intelligence Officer, AI Test Collection, GitHub Discovery, Todoist×KB Matching.',

    funFacts: {
      title: '📊 System Snapshot',
      first: 'Knowledge Base: 332 articles, 12 categories, 2.6 MB',
      second: 'GitHub: 89 repos (24 private / 65 public)',
      third: 'Cron: 4 automation jobs executing daily',
      fourth: 'Skills: 73 available across 13 categories',
      fifth: 'Platforms: Feishu + GitHub + Obsidian',
      sixth: 'Last updated: 2026-07-12 · Live ⚡',
    },

    sayHello: 'Want to know more? 👋',
    findMeOn: 'Visit my GitHub',
    orCheckOut: 'Or check out my',
    blog: 'Knowledge Base',
    projects: 'Skills',
  },

  // ===== System Details =====
  about: {
    title: 'System Details 🔧',
    intro: 'An AI-powered collection and knowledge management system in active operation. Full system configuration and runtime status below.',

    systemInfo: {
      title: '🖥️ Base System',
      os: 'Ubuntu 20.04.6 LTS (Focal Fossa)',
      kernel: 'Linux 5.4.0-208-generic x86_64',
      memory: '3.8 GB RAM · 3.8 GB Swap',
      disk: '157 GB (70G used / 80G free · 47%)',
      python: 'Python 3.12.0 (pyenv)',
      node: 'Node.js v24.14.0',
      shell: '/bin/sh',
    },

    hermesInfo: {
      title: '🤖 Hermes Agent',
      version: 'v0.17.0 (2026.6.19)',
      profile: 'collector (active)',
      project: '/usr/local/lib/hermes-agent',
      model: 'Custom Provider',
      pythonRuntime: 'Python 3.11.11 / OpenAI SDK 2.24.0',
    },

    collectedContent: {
      title: '📚 Knowledge Base (Collected Content)',
      inbox: '332 articles in 00_Inbox',
      wiki: '10 topic pages in 20_Wiki',
      output: '1 analysis report in 30_Outputs',
      categories: [
        { name: 'OpenClaw', count: 80, emoji: '🦞' },
        { name: 'Playwright AI', count: 40, emoji: '🎭' },
        { name: 'Test Engineering (测试工程)', count: 37, emoji: '🧪' },
        { name: 'Investment (投资与变现)', count: 36, emoji: '📈' },
        { name: 'Browser Automation (浏览器自动化)', count: 88, emoji: '🌐' },
        { name: 'AI Skill', count: 23, emoji: '🤖' },
        { name: 'AI Philosophy (AI 理念与范式)', count: 23, emoji: '💡' },
        { name: 'Claude Code & OpenCode', count: 23, emoji: '⌨️' },
        { name: 'Onboarding', count: 21, emoji: '🚀' },
        { name: 'AI Agent', count: 15, emoji: '🧠' },
        { name: 'Open Source Tools (开源工具)', count: 10, emoji: '🔧' },
        { name: 'Hermes', count: 10, emoji: '⚡' },
      ],
    },

    cronJobs: {
      title: '⏰ Cron Automation Jobs',
      jobs: [
        { name: 'Intelligence Daily Brief', time: 'Daily 8:00', desc: 'Collects AI/Agent intel from GitHub / arXiv / RSS' },
        { name: 'AI Test Collection', time: 'Daily 20:00', desc: 'Tracks AI-driven automated testing trends' },
        { name: 'GitHub Project Discovery', time: 'Daily 9:00', desc: 'Recommends AI projects from GitHub Trending' },
        { name: 'Todoist×KB Matching', time: '12:00 / 20:00 / 23:00', desc: '3× daily, links Todoist tasks with Knowledge Base' },
      ],
    },
  },

  // ===== Skills Page =====
  projects: {
    title: 'Skills & Tools 🛠️',
    subtitle: '73 installed skills across 13 categories. Click for details.',

    categories: [
      { name: 'autonomous-ai-agents', emoji: '🤖', label: 'Autonomous AI Agents',
        skills: 'Claude Code, Codex, Hermes Agent, OpenCode',
        desc: 'Coding agent orchestration & task delegation' },
      { name: 'creative', emoji: '🎨', label: 'Creative Generation',
        skills: 'ASCII Art, Excalidraw, p5.js, Manim, ComfyUI, Baoyu + 13 more',
        desc: 'ASCII art, arch diagrams, hand-drawn style, 3D animation, image gen' },
      { name: 'data-science', emoji: '📊', label: 'Data Science',
        skills: 'Hybrid Web Scraper, Jupyter',
        desc: 'Web scraping + interactive data analysis' },
      { name: 'github', emoji: '🐙', label: 'GitHub Workflows',
        skills: 'Code Review, PR Workflow, Issues, Auth, Repo Mgmt + 6 more',
        desc: 'Full GitHub ops chain: review, merge, manage' },
      { name: 'media', emoji: '🎵', label: 'Media Processing',
        skills: 'YouTube Transcript, GIF Search, HeartMuLa, Songsee',
        desc: 'Audio/video extraction and generation' },
      { name: 'mlops', emoji: '🧬', label: 'MLOps',
        skills: 'llama.cpp, vLLM, HuggingFace Hub, lm-eval, W&B, SAM + 7 more',
        desc: 'Full model inference, evaluation, deployment toolkit' },
      { name: 'note-taking', emoji: '📝', label: 'Note Taking',
        skills: 'Obsidian',
        desc: 'Knowledge base read/write/query' },
      { name: 'productivity', emoji: '⚡', label: 'Productivity',
        skills: 'Airtable, Google Workspace, Intelligence Agent, Maps, PDF, Notion, PPT + 10 more',
        desc: 'Office automation, document processing, agent building' },
      { name: 'research', emoji: '🔬', label: 'Research & Intel',
        skills: 'arXiv, Blogwatcher, last30days, LLM Wiki, Polymarket + 7 more',
        desc: 'Academic search, blog monitoring, multi-platform research' },
      { name: 'software-development', emoji: '💻', label: 'Software Dev',
        skills: 'Debugger, TDD, Code Review, Plan, Spike, Simplifier + 8 more',
        desc: 'Full dev cycle: debug, test, plan, simplify' },
      { name: 'email', emoji: '📧', label: 'Email',
        skills: 'Himalaya CLI',
        desc: 'IMAP/SMTP terminal email' },
      { name: 'social-media', emoji: '🐦', label: 'Social Media',
        skills: 'xurl (X/Twitter)',
        desc: 'Twitter v2 API posting & search' },
      { name: 'smart-home', emoji: '💡', label: 'Smart Home',
        skills: 'OpenHue',
        desc: 'Philips Hue light control' },
    ],
  },

  // ===== 分析报告 =====
  report: {
    title: '📊 Knowledge Base Analysis Report',
    subtitle: '332 articles · 13 categories · Full data analysis',
    generated: 'Generated',
    dataSource: '00_Inbox/ 308 articles',
    scope: '13 topic categories',
    overview: 'Overview',
    metrics: 'Metric',
    value: 'Value',
  },

  // ===== Knowledge Base =====
  blog: {
    title: 'Knowledge Base 📚',
    subtitle: '332 articles · 12 categories · Continuously updated',
    readMore: 'View details →',
    backToBlog: '← Back to Knowledge Base',
    backToAll: '← Back to all',
    share: 'Share:',
  },

  // ===== 404 =====
  notFound: {
    title: '404 — Page not found 🔍',
    subtitle: "Hmm... this article hasn't been collected yet.",
    back: 'Back to home →',
  },
}