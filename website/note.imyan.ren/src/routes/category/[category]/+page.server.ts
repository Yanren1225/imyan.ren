import { getPosts } from '$lib/server/posts'
import type { PageServerLoad, EntryGenerator } from './$types'

// 分类页 Load 函数
export const load: PageServerLoad = async ({ params }) => {
  // 获取所有可见文章
  const posts = await getPosts()
  // 过滤出当前分类的文章
  const filteredPosts = posts.filter(
    (post) => post.category === params.category,
  )

  return {
    category: params.category,
    posts: filteredPosts,
  }
}

// 生成所有分类页面的路径
export const entries: EntryGenerator = async () => {
  const posts = await getPosts()
  // 提取所有存在的分类
  const categories = [...new Set(posts.map((post) => post.category))]
  return categories.map((category) => ({ category }))
}
