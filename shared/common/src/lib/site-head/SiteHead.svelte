<script lang="ts">
  interface Props {
    title?: string
    description?: string
    favicon?: string
    canonical?: string
    ogImage?: string
    ogType?: string
    ogSiteName?: string
    ogLocale?: string
    themeColor?: string
    themeColorDark?: string
  }

  let {
    title,
    description,
    favicon,
    canonical,
    ogImage,
    ogType = 'website',
    ogSiteName,
    ogLocale,
    themeColor,
    themeColorDark,
  }: Props = $props()

  const fontHref =
    'https://fonts.bunny.net/css?family=outfit:400,700|rubik:400,500,600,700|fira-code:400&display=swap'
</script>

<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}

  {#if description}
    <meta name="description" content={description} />
  {/if}

  {#if canonical}
    <link rel="canonical" href={canonical} />
  {/if}

  {#if favicon}
    <link rel="icon" href={favicon} />
  {/if}

  {#if themeColor}
    <meta name="theme-color" content={themeColor} />
  {/if}

  {#if themeColorDark}
    <meta name="theme-color" content={themeColorDark} media="(prefers-color-scheme: dark)" />
  {/if}

  {#if title}
    <meta property="og:title" content={title} />
    <meta property="og:type" content={ogType} />

    {#if description}
      <meta property="og:description" content={description} />
    {/if}

    {#if canonical}
      <meta property="og:url" content={canonical} />
    {/if}

    {#if ogImage}
      <meta property="og:image" content={ogImage} />
    {/if}

    {#if ogSiteName}
      <meta property="og:site_name" content={ogSiteName} />
    {/if}

    {#if ogLocale}
      <meta property="og:locale" content={ogLocale} />
    {/if}

    <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
    <meta name="twitter:title" content={title} />

    {#if description}
      <meta name="twitter:description" content={description} />
    {/if}

    {#if ogImage}
      <meta name="twitter:image" content={ogImage} />
    {/if}
  {/if}

  <link rel="preconnect" href="https://fonts.bunny.net" />
  <link rel="stylesheet" href={fontHref} />
</svelte:head>
