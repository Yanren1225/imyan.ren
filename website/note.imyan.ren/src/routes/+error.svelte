<script lang="ts">
  import { page } from '$app/state'
  import { ErrorPage } from '@yanren/common'
</script>

<ErrorPage
  status={page.status}
  message={page.error?.message}
  hostname="root@note.imyan.ren:~$"
/>
