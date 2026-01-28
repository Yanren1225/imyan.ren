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
  denied={props.isAccessDenied === true}
  class="friend-item"
>
  <FriendAvatar name={props.name} avatar={props.avatar} />
  <div class="flex flex-col flex-1 min-w-0 justify-center">
    <p class="name" title={props.name}>{props.name}</p>
    <p class="desc" title={props.desc}>{props.desc}</p>
  </div>
</HoverCard>

<style>
  @media (hover: hover) {
    :global(.friend-item.is-denied:hover .name) {
      color: #ff3c3c !important;
      text-shadow: 0 0 5px #ff3c3c !important;
      text-decoration: line-through;
    }
  }

  :global(.friend-item) {
    padding: 12px 20px;
    align-items: center;
    gap: 16px;

    @media (hover: hover) {
      &:hover {
        :global(.img-placeholder-container) {
          transform: scale(1.1);
        }

        .name {
          color: var(--c-neon);
          text-shadow: 0 0 5px var(--c-neon);
        }
      }
    }

    .name {
      font-weight: bold;
      font-size: 16px;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: all 0.3s ease;
    }

    .desc {
      font-size: 12px;
      opacity: 0.6;
      white-space: nowrap;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
