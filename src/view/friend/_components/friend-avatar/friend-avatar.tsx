import { createAvatar } from '@dicebear/core'
import { pixelArt } from '@dicebear/collection'
import { Component } from 'solid-js'

import { ImageWithPlaceholder } from '@/components/image-with-placeholder/image-with-placeholder'

export const FriendAvatar: Component<FriendAvatarProps> = (props) => {
  return (
    <ImageWithPlaceholder
      src={props.avatar ?? ''}
      alt={props.name}
      class={props.class}
      imgClass="friend-avatar-img"
      handleError={(e) => {
        if (e.target instanceof HTMLImageElement) {
          const avatar = createAvatar(pixelArt, {
            seed: props.name,
            scale: 85,
          })
          e.target.src = avatar.toDataUri()
        }
      }}
    />
  )
}
