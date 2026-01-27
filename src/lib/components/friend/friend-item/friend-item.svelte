<script lang="ts">
  import HoverCard from '$lib/components/hover-card/hover-card.svelte'
  import FriendAvatar from '../friend-avatar/friend-avatar.svelte'
  import type { IFriendItem } from '$lib/types'

  let props: IFriendItem = $props()
</script>

<HoverCard
  as="a"
  href={props.link}
  target="_blank"
  rel="noopener noreferrer"
  class={'friend-item ' + (props.isAccessDenied ? 'is-access-denied' : '')}
>
  <FriendAvatar class="avatar" name={props.name} avatar={props.avatar} />
  <div class="flex flex-col flex-1 min-w-0 justify-center">
    <p class="name" title={props.name}>{props.name}</p>
    <p class="desc" title={props.desc}>{props.desc}</p>
  </div>
</HoverCard>
