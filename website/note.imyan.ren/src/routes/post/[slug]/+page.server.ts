import { getPost, getPosts } from '$lib/server/posts'
import { error } from '@sveltejs/kit'
import type { PageServerLoad, EntryGenerator } from './$types'

// 文章详情页 Load 函数
export const load: PageServerLoad = async ({ params }) => {
  // 根据 URL 中的 slug 参数获取文章详情
  const post = await getPost(params.slug)

  if (!post) {
    throw error(404, 'Post not found')
  }

  return {
    post,
  }
}

// SSG 关键点：entries 函数
// 告诉 SvelteKit 在构建时需要预渲染哪些路径
export const entries: EntryGenerator = async () => {
  // 获取所有文章，包括隐藏的！
  // 这样 hidden: true 的文章也会被构建生成静态页面
  const posts = await getPosts({ includeHidden: true })

  // 返回 slug 列表 [{ slug: 'post-1' }, { slug: 'secret-post' }]
  return posts.map((post) => ({ slug: post.slug }))
}
