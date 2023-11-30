import { Component } from 'solid-js'

import { FirendAvatar } from '../firend-avatar/firend-avatar'

const FirendItem: Component<IFirendItem> = (props) => {
  return (
    <>
      <div class="friend-item">
        <FirendAvatar class="avatar" {...props} />
        <a href={props.link} target="_blank">
          <p class="name">{props.name}</p>
          <p class="desc">{props.descr}</p>
          <FirendAvatar class="back-avatar" {...props} />
        </a>
      </div>
    </>
  )
}

export { FirendItem }
