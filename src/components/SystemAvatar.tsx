import { useState, useRef } from 'react'

const messages = [
  '⚡ System online!',
  '采集系统中... 📡',
  '知识库已更新 📚',
  'Cron 任务运行中 ⏰',
  '73 个技能已就绪 🛠️',
  'Hermes v0.17.0 运行中 🤖',
  '情报采集进行中 🔍',
  '正在分析 AI 趋势 📊',
  'GitHub 项目发现中 🌟',
  'Todoist 与 KB 匹配中 🔄',
  'All systems go! 🚀',
  'System health: OK ✅',
  '332 篇文章已归档 📑',
  '12 个分类已整理 🗂️',
  '3.8GB RAM · 稳定运行',
  'Ubuntu 20.04 · 已开机',
  'Python 3.12 · 就绪',
  'Node v24 · 就绪',
  'Feishu 连接正常 💬',
  '采集 → 整理 → 输出 📊',
  '平静地走，走得远 🐾',
  '持续进化中 ⚡',
  '数据驱动决策 📈',
  '又一篇好文章已入库 ✨',
]

export default function SystemAvatar() {
  const [showMsg, setShowMsg] = useState(false)
  const [currentMsg, setCurrentMsg] = useState('')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    const randomMsg = messages[Math.floor(Math.random() * messages.length)]
    setCurrentMsg(randomMsg)
    setShowMsg(true)
    timeoutRef.current = setTimeout(() => setShowMsg(false), 4000)
  }

  return (
    <div className="logo-glow mb-8 relative">
      <button
        onClick={handleClick}
        className="relative cursor-pointer transition-transform hover:scale-105 active:scale-95 focus:outline-none"
        aria-label="点击查看系统状态"
      >
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-[var(--accent)]/30 shadow-2xl bg-[var(--bg-card)] flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl md:text-7xl mb-2">⚡</div>
            <div className="text-xs text-[var(--text-muted)] font-mono">v0.17.0</div>
          </div>
        </div>
        {showMsg && (
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 md:-top-4 md:-translate-y-full bg-white text-[var(--bg)] px-4 py-2 rounded-2xl shadow-lg whitespace-nowrap animate-fade-in font-medium z-10">
            {currentMsg}
            <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white -top-1 -rotate-45 md:top-auto md:-bottom-1 md:rotate-[135deg]"></div>
          </div>
        )}
      </button>
      <p className="text-xs text-[var(--text-muted)] mt-3">点击查看系统状态 ⚡</p>
    </div>
  )
}