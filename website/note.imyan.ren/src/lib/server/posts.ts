import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

const POSTS_DIR = 'posts'

// 定义文章的数据结构接口
export interface Post {
  slug: string // 文章的唯一标识 ID (文件名)
  title: string // 标题
  date: string // 发布日期
  category: string // 分类
  tags: string[] // 标签列表
  excerpt?: string // 摘要
  content: string // 渲染后的 HTML 内容
  hidden?: boolean // 是否隐藏 (不显示在列表中)
}

/**
 * 获取所有文章列表
 * @param options 可选配置，includeHidden 为 true 时包含隐藏文章
 */
export async function getPosts(options?: {
  includeHidden?: boolean
}): Promise<Post[]> {
  // 如果目录不存在，直接返回空数组
  if (!fs.existsSync(POSTS_DIR)) {
    return []
  }

  // 读取目录下所有 .md 结尾的文件
  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.md'))

  // 并发处理所有文件
  const posts = await Promise.all(
    files.map(async (filename) => {
      // 从文件名去除 .md 后缀作为 slug
      const slug = filename.replace(/\.md$/, '')
      const filePath = path.join(POSTS_DIR, filename)
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // 使用 gray-matter 解析 frontmatter (元数据) 和正文
      const { data, content } = matter(fileContent)

      // 使用 marked 将 Markdown 正文渲染为 HTML
      const renderedContent = await marked(content)
      const excerpt = data.excerpt || ''

      return {
        slug,
        title: data.title || slug,
        date: data.date
          ? new Date(data.date).toISOString()
          : new Date().toISOString(),
        category: data.category || 'Uncategorized',
        tags: data.tags || [],
        excerpt,
        content: renderedContent, // 完整的 HTML 内容
        hidden: data.hidden || false, // 默认为不隐藏
      }
    }),
  )

  // 如果 includeHidden 为 true，则返回所有文章
  // 否则，过滤掉 hidden 为 true 的文章
  const filteredPosts = options?.includeHidden
    ? posts
    : posts.filter((post) => !post.hidden)

  // 按日期降序排序 (最新的在前面)
  return filteredPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

/**
 * 获取单篇文章详情
 * @param slug 文章的 slug (文件名)
 */
export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`)
  // 如果文件不存在，返回 null
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  const renderedContent = await marked(content)

  return {
    slug,
    title: data.title || slug,
    date: data.date
      ? new Date(data.date).toISOString()
      : new Date().toISOString(),
    category: data.category || 'Uncategorized',
    tags: data.tags || [],
    excerpt: data.excerpt || '',
    content: renderedContent,
    hidden: data.hidden || false,
  }
}
