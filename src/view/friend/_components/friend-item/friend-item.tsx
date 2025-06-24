import { Component } from 'solid-js'

import { FriendAvatar } from '../friend-avatar/friend-avatar'

const FriendItem: Component<IFriendItem> = (props) => {
  return (
    <>
      <div
        class="friend-item"
        classList={{ 'is-access-denied': props.isAccessDenied }}
      >
        <FriendAvatar class="avatar" {...props} />
        <a href={props.link} target="_blank">
          <p class="name">{props.name}</p>
          <FriendAvatar class="back-avatar" {...props} />
        </a>
      </div>
    </>
  )
}

export { FriendItem }
