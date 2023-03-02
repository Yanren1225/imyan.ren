import Layout from '@/layout/layout'
import { get } from '@/net'
import { Component, createEffect, createSignal, For, onMount } from 'solid-js'
import './firend.less'

interface IFirendData {
  classname?: string
  class_desc?: string
  link_list: IFirendItem[]
}

interface IFirendItem {
  name: string
  link: string
  avatar?: string
  descr?: string
}

const Firend: Component = () => {
  const [friendData, setFriendData] = createSignal<IFirendData[]>([])

  onMount(async () => {
    const friendData = await get<Array<IFirendData>>('./link.json')
    setFriendData(friendData)
  })

  createEffect(() => {
    console.log(friendData())
  })

  return (
    <>
      <Layout>
        <div id="firend">
          <For each={friendData()}>
            {(item) => (
              <div class="firend-part">
                <p class="firend-desc">{item.class_desc}</p>
                <div class="firends-box">
                  <For each={item.link_list}>
                    {(friend) => <FirendItem {...friend} />}
                  </For>
                </div>
              </div>
            )}
          </For>
        </div>
      </Layout>
    </>
  )
}

const FirendItem = (props: IFirendItem) => {
  return (
    <>
      <div class="friend-item">
        <img
          class="avatar"
          src={props.avatar ?? ''}
          alt={props.name}
          onError={(e) => {
            if (e.target instanceof HTMLImageElement) {
              e.target.src = `https://api.multiavatar.com/${props.name}.png`
            }
          }}
        />
        <a href={props.link} target="_blank">
          <p class="name">{props.name}</p>
          <p class="desc">{props.descr}</p>
        </a>
        <img
          class="back-avatar"
          src={props.avatar ?? ''}
          alt={props.name}
          onError={(e) => {
            if (e.target instanceof HTMLImageElement) {
              e.target.src = `https://api.multiavatar.com/${props.name}.png`
            }
          }}
        />
      </div>
    </>
  )
}

export { Firend }
