import { getPosts } from '$lib/server/posts'
import type { PageServerLoad } from './$types'

// 分类列表页 Load 函数
export const load: PageServerLoad = async () => {
  const posts = await getPosts()

  // 计算每个分类的文章数量
  const categoryCounts: Record<string, number> = {}
  posts.forEach((post) => {
    categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1
  })

  // 转换为数组格式并按字母排序
  // 格式: [{ name: 'Tech', count: 5 }, { name: 'Life', count: 3 }]
  const categories = Object.entries(categoryCounts)
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  return {
    categories,
  }
}
