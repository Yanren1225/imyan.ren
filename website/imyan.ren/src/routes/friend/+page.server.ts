import type { IFriendData } from '$lib/types'
import { readFileSync } from 'fs'
import { resolve } from 'path'

export const prerender = true

export function load() {
  const linkPath = resolve('static/link.json')
  const data = JSON.parse(readFileSync(linkPath, 'utf-8')) as IFriendData[]

  return {
    friendData: data,
  }
}
