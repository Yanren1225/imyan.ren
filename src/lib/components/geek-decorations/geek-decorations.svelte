<script lang="ts">
  import { onMount } from 'svelte'

  let time = $state(new Date().toLocaleTimeString())
  let coords = $state({ x: 0, y: 0 })
  let location = $state('LOC: LOCATING...')
  let uptime = $state('T+ 00:00:00')
  let battery = $state('PWR: N/A')
  const yanrenHex = '0x59616E72656E' // "Yanren" in Hex

  let spacing = $state(40)
  let hudOpacity = $state(0.6)
  let isMobile = $state(false)

  onMount(() => {
    // Fetch location
    fetch('https://get.geojs.io/v1/ip/geo.json')
      .then((res) => res.json())
      .then((data) => {
        const loc = `LOC: ${data.city.toUpperCase()}, ${data.country_code}`
        location = loc
      })
      .catch(() => {
        location = 'LOC: UNKNOWN'
      })

    // Handle Responsive Spacing/Subtlety
    const mediaQuery = window.matchMedia('(max-width: 1400px)')
    const mobileQuery = window.matchMedia('(max-width: 600px)')

    const updateResponsive = () => {
      const isTablet = mediaQuery.matches
      const isMob = mobileQuery.matches

      isMobile = isMob

      if (isMob || isTablet) {
        spacing = 10
        hudOpacity = 0.3
      } else {
        spacing = 40
        hudOpacity = 0.6
      }
    }

    updateResponsive()
    mediaQuery.addEventListener('change', updateResponsive)
    mobileQuery.addEventListener('change', updateResponsive)

    // Uptime Timer
    const startTime = Date.now()
    const timerInterval = setInterval(() => {
      const diff = Math.floor((Date.now() - startTime) / 1000)
      const h = Math.floor(diff / 3600)
        .toString()
        .padStart(2, '0')
      const m = Math.floor((diff % 3600) / 60)
        .toString()
        .padStart(2, '0')
      const s = (diff % 60).toString().padStart(2, '0')
      uptime = `T+ ${h}:${m}:${s}`
    }, 1000)

    // Battery Status
    if ('getBattery' in navigator) {
      // @ts-ignore
      navigator.getBattery().then((batt) => {
        const updateBattery = () => {
          const level = Math.floor(batt.level * 100)
          const status = batt.charging ? 'CHG' : 'BAT'
          battery = `PWR: ${level}% [${status}]`
        }
        updateBattery()
        batt.addEventListener('levelchange', updateBattery)
        batt.addEventListener('chargingchange', updateBattery)
      })
    }

    const timeInterval = setInterval(() => {
      time = new Date().toLocaleTimeString()
    }, 1000)

    const updateCoords = (e: MouseEvent) => {
      coords = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', updateCoords)

    return () => {
      clearInterval(timerInterval)
      clearInterval(timeInterval)
      mediaQuery.removeEventListener('change', updateResponsive)
      mobileQuery.removeEventListener('change', updateResponsive)
      window.removeEventListener('mousemove', updateCoords)
    }
  })
</script>

<div
  class="font-mono fixed w-full h-full pointer-events-none"
  style:z-index="9998"
  style:color="var(--c-text-hover)"
  style:top="0"
  style:left="0"
  style:opacity={hudOpacity}
  style:box-sizing="border-box"
  style:font-size={spacing === 10 ? '9px' : '12px'}
>
  {#if !isMobile}
    <!-- Desktop 4-corner Layout -->
    <div
      style:position="absolute"
      style:top="{spacing}px"
      style:left="{spacing}px"
    >
      SYSTEM: <span style:color="#00ff41">ONLINE</span>
      <br />
      {uptime}
    </div>

    <div
      style:position="absolute"
      style:top="{spacing}px"
      style:right="{spacing}px"
      style:text-align="right"
    >
      {time}
      <br />
      {location}
    </div>

    <div
      style:position="absolute"
      style:bottom="{spacing}px"
      style:left="{spacing}px"
    >
      X: {coords.x} <span style:opacity="0.5">/</span> Y: {coords.y}
      <br />
      DATA: {yanrenHex}
    </div>

    <div
      style:position="absolute"
      style:bottom="{spacing}px"
      style:right="{spacing}px"
      style:text-align="right"
    >
      {battery}
      <br />
      MEM: 128 MB
    </div>
  {:else}
    <div
      style:position="absolute"
      style:top="{spacing}px"
      style:right="{spacing}px"
      style:text-align="right"
      style:line-height="1.4"
    >
      SYS: ONLINE | {uptime}
      <br />
      CLK: {time}
      <br />
      {location}
      <br />
      {battery} | MEM: 128MB
    </div>
  {/if}
</div>
