import { Component } from 'solid-js'

import { MouseFollow } from '@/components/mouse-follow'
import { MouseLight } from '@/components/mouse-light'

import { FriendAvatar } from '../friend-avatar/friend-avatar'

const FriendItem: Component<IFriendItem> = (props) => {
  return (
    <MouseFollow>
      <MouseLight
        class="friend-item"
        classList={{ 'is-access-denied': props.isAccessDenied }}
      >
        <FriendAvatar class="avatar" {...props} />
        <a href={props.link} target="_blank" rel="noopener noreferrer">
          <p class="name">{props.name}</p>
        </a>
      </MouseLight>
    </MouseFollow>
  )
}

export { FriendItem }
