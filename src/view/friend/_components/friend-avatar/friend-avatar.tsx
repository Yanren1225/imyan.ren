import multiavatar from '@multiavatar/multiavatar'
import { Component } from 'solid-js'

const FriendAvatar: Component<FriendAvatarProps> = (props) => {
  return (
    <img
      class={props.class}
      src={props.avatar ?? ''}
      alt={props.name}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        if (e.target instanceof HTMLImageElement) {
          e.target.src = `data:image/svg+xml;base64,${window.btoa(
            multiavatar(props.name),
          )}`
        }
      }}
    />
  )
}

export { FriendAvatar }
