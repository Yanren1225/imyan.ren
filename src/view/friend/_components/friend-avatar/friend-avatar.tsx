import multiavatar from '@multiavatar/multiavatar'
import { Component, createSignal, Show } from 'solid-js'
import './friend-avatar.css'

export const FriendAvatar: Component<FriendAvatarProps> = (props) => {
  const [loading, setLoading] = createSignal(true)

  return (
    <div class={`friend-avatar-container ${props.class || ''}`}>
      <Show when={loading()}>
        <div class="friend-avatar-placeholder" />
      </Show>
      <img
        class={`friend-avatar-img ${loading() ? 'is-loading' : ''}`}
        src={props.avatar ?? ''}
        alt={props.name}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoading(false)}
        onError={(e) => {
          setLoading(false)
          if (e.target instanceof HTMLImageElement) {
            e.target.src = `data:image/svg+xml;base64,${window.btoa(
              multiavatar(props.name),
            )}`
          }
        }}
      />
    </div>
  )
}
