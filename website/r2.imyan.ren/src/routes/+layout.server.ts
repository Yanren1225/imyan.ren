import { requireAuth } from '@yanren/auth'

export const load = async (event) => {
  const { session } = await requireAuth(event)
  return { session }
}
