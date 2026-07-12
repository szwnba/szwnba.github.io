import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const posts = await getCollection('blog')
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  )

  return rss({
    title: "szwnba's Collector System — Knowledge Base",
    description: 'AI 驱动的信息采集与知识管理平台 · 自动采集、智能分类、持续进化',
    site: context.site ?? 'https://szwnba.github.io',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>zh-cn</language>`,
  })
}