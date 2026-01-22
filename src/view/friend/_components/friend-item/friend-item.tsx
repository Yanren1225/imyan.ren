import { Component } from 'solid-js'

import { MouseFollow } from '@/components/mouse-follow'
import { MouseLight } from '@/components/mouse-light'

import { FriendAvatar } from '../friend-avatar/friend-avatar'

const FriendItem: Component<IFriendItem> = (props) => {
  return (
    <MouseFollow>
      <MouseLight
        as="a"
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
        class="friend-item"
        classList={{ 'is-access-denied': props.isAccessDenied }}
      >
        <FriendAvatar class="avatar" {...props} />
        <p class="name">{props.name}</p>
      </MouseLight>
    </MouseFollow>
  )
}

export { FriendItem }
