import { Component } from 'solid-js'
import { MouseFollow } from '@/components/mouse-follow'
import { MouseLight } from '@/components/mouse-light'

import { FriendAvatar } from '../friend-avatar/friend-avatar'

// Reverted to simple single-line truncation with tooltip
export const FriendItem: Component<IFriendItem> = (props) => {
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
        <div class="flex flex-col flex-1 min-w-0 justify-center">
          <p class="name" title={props.name}>{props.name}</p>
          <p class="desc" title={props.desc}>{props.desc}</p>
        </div>
      </MouseLight>
    </MouseFollow>
  )
}
