<script lang="ts">
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte'
  import Payments from '$lib/components/Payments.svelte'
  import { i18n } from '$lib/i18n'
</script>

<LanguageSwitcher />

<div class="title-box">
  <p>{i18n.t.payTitle}</p>
</div>

<p class="select-payment">{i18n.t.payment}</p>

<Payments />

<style>
  .select-payment {
    font-size: 18px;
    margin-top: 32px;
  }
</style>
