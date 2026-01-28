<script lang="ts">
  import { createAvatar } from '@dicebear/core'
  import { pixelArt } from '@dicebear/collection'
  import ImageWithPlaceholder from '$lib/components/image-with-placeholder/image-with-placeholder.svelte'

  interface Props {
    name: string
    avatar?: string
  }

  let { name, avatar }: Props = $props()

  function handleError(e: Event) {
    if (e.target instanceof HTMLImageElement) {
      const newAvatar = createAvatar(pixelArt, {
        seed: name,
        scale: 85,
      })
      e.target.src = newAvatar.toDataUri()
    }
  }
</script>

<ImageWithPlaceholder
  src={avatar ?? ''}
  alt={name}
  imgClass="friend-avatar-img"
  size={50}
  onerror={handleError}
/>
