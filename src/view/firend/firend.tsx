import Layout from '@/layout/layout'
import { Component, createEffect, createSignal, For, onMount } from 'solid-js'
import yaml from 'js-yaml'
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
    const friendDataSoure = await fetch('./link.yml')
    setFriendData(yaml.load(await friendDataSoure.text()) as IFirendData[])
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
              e.target.src =
                'https://avatars.githubusercontent.com/u/2106987?v=4'
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
              e.target.src =
                'https://avatars.githubusercontent.com/u/2106987?v=4'
            }
          }}
        />
      </div>
    </>
  )
}

export { Firend }
