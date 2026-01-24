import { Component, createSignal, onCleanup, onMount, Show } from 'solid-js'

export const GeekDecorations: Component = () => {
    const [time, setTime] = createSignal(new Date().toLocaleTimeString())
    const [coords, setCoords] = createSignal({ x: 0, y: 0 })

    const [location, setLocation] = createSignal('LOC: LOCATING...')
    const [uptime, setUptime] = createSignal('T+ 00:00:00')
    const [battery, setBattery] = createSignal('PWR: N/A')
    const yanrenHex = '0x59616E72656E' // "Yanren" in Hex

    const [spacing, setSpacing] = createSignal(40)
    const [hudOpacity, setHudOpacity] = createSignal(0.6)
    const [isMobile, setIsMobile] = createSignal(false)

    onMount(() => {
        // Fetch location
        fetch('https://get.geojs.io/v1/ip/geo.json')
            .then((res) => res.json())
            .then((data) => {
                const loc = `LOC: ${data.city.toUpperCase()}, ${data.country_code}`
                setLocation(loc)
            })
            .catch(() => {
                setLocation('LOC: UNKNOWN')
            })

        // Handle Responsive Spacing/Subtlety
        const mediaQuery = window.matchMedia('(max-width: 1400px)')
        const mobileQuery = window.matchMedia('(max-width: 600px)')

        const updateResponsive = () => {
            const isTablet = mediaQuery.matches
            const isMob = mobileQuery.matches

            setIsMobile(isMob)

            if (isMob || isTablet) {
                setSpacing(10)
                setHudOpacity(0.3)
            } else {
                setSpacing(40)
                setHudOpacity(0.6)
            }
        }

        updateResponsive()
        mediaQuery.addEventListener('change', updateResponsive)
        mobileQuery.addEventListener('change', updateResponsive)

        // Uptime Timer
        const startTime = Date.now()
        const timerInterval = setInterval(() => {
            const diff = Math.floor((Date.now() - startTime) / 1000)
            const h = Math.floor(diff / 3600).toString().padStart(2, '0')
            const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0')
            const s = (diff % 60).toString().padStart(2, '0')
            setUptime(`T+ ${h}:${m}:${s}`)
        }, 1000)

        // Battery Status
        if ('getBattery' in navigator) {
            // @ts-ignore
            navigator.getBattery().then((batt) => {
                const updateBattery = () => {
                    const level = Math.floor(batt.level * 100)
                    const status = batt.charging ? 'CHG' : 'BAT'
                    setBattery(`PWR: ${level}% [${status}]`)
                }
                updateBattery()
                batt.addEventListener('levelchange', updateBattery)
                batt.addEventListener('chargingchange', updateBattery)
            })
        }

        const timeInterval = setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000)

        const updateCoords = (e: MouseEvent) => {
            setCoords({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener('mousemove', updateCoords)

        onCleanup(() => {
            clearInterval(timerInterval)
            clearInterval(timeInterval)
            mediaQuery.removeEventListener('change', updateResponsive)
            mobileQuery.removeEventListener('change', updateResponsive)
            window.removeEventListener('mousemove', updateCoords)
        })
    })

    return (
        <div
            class="font-mono fixed w-full h-full pointer-events-none"
            style={{
                'z-index': 9998,
                color: 'var(--c-text-hover)',
                top: 0,
                left: 0,
                opacity: hudOpacity(),
                'box-sizing': 'border-box',
                'font-size': spacing() === 10 ? '9px' : '12px'
            }}
        >
            <Show
                when={!isMobile()}
                fallback={
                    <div style={{ position: 'absolute', top: `${spacing()}px`, right: `${spacing()}px`, 'text-align': 'right', 'line-height': '1.4' }}>
                        SYS: ONLINE | {uptime()}
                        <br />
                        CLK: {time()}
                        <br />
                        {location()}
                        <br />
                        {battery()} | MEM: 128MB
                    </div>
                }
            >
                {/* Desktop 4-corner Layout */}
                <div style={{ position: 'absolute', top: `${spacing()}px`, left: `${spacing()}px` }}>
                    SYSTEM: <span style={{ color: '#00ff41' }}>ONLINE</span>
                    <br />
                    {uptime()}
                </div>

                <div style={{ position: 'absolute', top: `${spacing()}px`, right: `${spacing()}px`, 'text-align': 'right' }}>
                    {time()}
                    <br />
                    {location()}
                </div>

                <div style={{ position: 'absolute', bottom: `${spacing()}px`, left: `${spacing()}px` }}>
                    X: {coords().x} <span style={{ opacity: 0.5 }}>/</span> Y: {coords().y}
                    <br />
                    DATA: {yanrenHex}
                </div>

                <div style={{ position: 'absolute', bottom: `${spacing()}px`, right: `${spacing()}px`, 'text-align': 'right' }}>
                    {battery()}
                    <br />
                    MEM: 128 MB
                </div>
            </Show>
        </div>
    )
}
