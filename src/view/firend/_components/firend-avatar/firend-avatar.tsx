import { Component } from 'solid-js'

const FirendAvatar: Component<FirendAvatarProps> = (props) => {
  return (
    <img
      class={props.class}
      src={props.avatar ?? ''}
      alt={props.name}
      onError={(e) => {
        if (e.target instanceof HTMLImageElement) {
          e.target.src = `https://api.multiavatar.com/${props.name}.png`
        }
      }}
    />
  )
}

export { FirendAvatar }
