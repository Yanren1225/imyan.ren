<script lang="ts">
  import QRCode from 'qrcode'
  import { UAParser } from 'ua-parser-js'
  import { onMount } from 'svelte'

  type Payment = {
    id: string
    icon: string
    link: string
    type: string
  }

  let selectPayment = $state('')
  let isDesktop = $state(false)

  let parsedUA: UAParser.IResult | undefined = undefined

  onMount(() => {
    parsedUA = new UAParser(navigator.userAgent).getResult()

    // Check if desktop on mount
    const checkDesktop = () => {
      isDesktop = document.body.clientWidth >= 900
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)

    // Click outside to close (only for mobile)
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (!target.closest('.payment-item') && !isDesktop) {
        selectPayment = ''
      }
    })

    return () => {
      window.removeEventListener('resize', checkDesktop)
    }
  })

  // svelte-ignore non_reactive_update
  const payments: Array<Payment> = [
    {
      id: 'alipay',
      icon: 'i-ri-alipay-fill',
      link: 'https://qr.alipay.com/fkx17810vgkiizqwtcqebfc',
      type: 'qrcode',
    },
    {
      id: 'wechat',
      icon: 'i-ri-wechat-fill',
      link: 'wxp://f2f0tkJn97xBE_AALRqk5GQGYH5cu7L9keLG',
      type: 'qrcode',
    },
    {
      id: 'qq',
      icon: 'i-ri-qq-fill',
      link: 'https://i.qianbao.qq.com/wallet/sqrcode.htm?m=tenpay&f=wallet&a=1&ac=F18F01A9E9104C71F8C43BE384C96F6213F4F51B993ACEA8806A94F08944E1C9&u=2323355219&n=%E6%B1%9D%E5%8D%97%E4%BA%AC',
      type: 'qrcode',
    },
  ]

  function handlePay(payment: Payment) {
    if (payment.type === 'openlink') {
      window.open(payment.link, '_blank')
    } else {
      if (
        parsedUA &&
        payment.id === 'alipay' &&
        parsedUA.device.type === 'mobile'
      ) {
        window.open(
          'alipays://platformapi/startapp?appId=10000007&qrcode=https://qr.alipay.com/fkx07170tzxfnbs56z5ejdb',
          '_blank',
        )
        return
      }
      // On desktop, no toggle needed (always expanded)
      // On mobile, toggle
      if (!isDesktop) {
        selectPayment = payment.id === selectPayment ? '' : payment.id
      }
    }
  }

  // Check if item should show details
  function shouldShowDetails(itemId: string): boolean {
    return isDesktop || selectPayment === itemId
  }

  // QR Code Action
  function qrcode(node: HTMLImageElement, text: string) {
    const canvas = document.createElement('canvas')
    QRCode.toCanvas(
      canvas,
      text,
      { width: 1000, margin: 0, color: { dark: '#000000', light: '#ffffff' } },
      (err) => {
        if (err) console.error(err)
      },
    )
    node.src = canvas.toDataURL('image/png')
  }
</script>

<div class="payments-terminal" class:desktop={isDesktop}>
  {#each payments as item}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="payment-item {item.id}"
      class:active={selectPayment === item.id || isDesktop}
      onclick={() => handlePay(item)}
    >
      <div class="payment-header">
        <span class="bracket">[</span>
        <span class="status-indicator"
          >{shouldShowDetails(item.id) ? 'x' : ' '}</span
        >
        <span class="bracket">]</span>
        <span class="payment-id">{item.id.toUpperCase()}</span>
        <span class="separator">::</span>
        <span class="payment-status"
          >{shouldShowDetails(item.id) ? 'ACTIVE' : 'IDLE'}</span
        >
      </div>

      {#if shouldShowDetails(item.id)}
        <div class="payment-details">
          <div class="scan-line"></div>
          <div class="qr-box">
            <img use:qrcode={item.link} alt={item.id} class="qrcode-image" />
          </div>
          <p class="instruction">SCAN_QR_CODE_TO_PROCEED</p>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .payments-terminal {
    display: flex;
    flex-direction: column;
    gap: 0;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 16px;
    line-height: 1.6;
  }

  /* Desktop: 3 column grid */
  .payments-terminal.desktop {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  /* Define brand colors */
  .payment-item.alipay {
    --accent-color: #1677ff;
  }
  .payment-item.wechat {
    --accent-color: #07c160;
  }
  .payment-item.qq {
    --accent-color: #12b7f5;
  }

  .payment-item {
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
  }

  /* Mobile: hover effect */
  .payment-item:hover {
    background: var(--c-card-bg-hover);
  }

  .payment-item:hover .bracket,
  .payment-item:hover .separator,
  .payment-item:hover .status-indicator,
  .payment-item:hover .payment-id {
    color: var(--accent-color);
  }

  .payment-item.active {
    border: 1px solid var(--accent-color);
    background: color-mix(in srgb, var(--accent-color), transparent 90%);
  }

  .payment-item.active:hover {
    background: color-mix(in srgb, var(--accent-color), transparent 85%);
  }

  /* Desktop: always show active style */
  .payments-terminal.desktop .payment-item {
    cursor: default;
  }

  .payment-header {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5ch;
    flex-wrap: wrap;
  }

  .bracket,
  .separator {
    color: var(--geek-border);
    transition: color 0.2s;
  }

  .status-indicator {
    color: var(--accent-color);
    font-weight: bold;
    width: 1ch;
    text-align: center;
  }

  .payment-id {
    color: var(--geek-text);
    font-weight: bold;
    transition: color 0.2s;
  }

  .payment-details {
    padding: 1rem;
    border-top: 1px dashed var(--accent-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .qr-box {
    padding: 10px;
    background: white;
    margin-bottom: 0.5rem;
    border: 2px solid var(--accent-color);
  }

  .qrcode-image {
    width: 150px;
    height: 150px;
    display: block;
    image-rendering: pixelated;
  }

  /* Larger QR on desktop */
  .payments-terminal.desktop .qrcode-image {
    width: 180px;
    height: 180px;
  }

  .instruction {
    font-size: 0.7rem;
    opacity: 0.7;
    letter-spacing: 1px;
    color: var(--accent-color);
    text-align: center;
  }

  .scan-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      color-mix(in srgb, var(--accent-color), transparent 95%) 50%
    );
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 10;
  }

  /* Responsive adjustments */
  @media (max-width: 767px) {
    .payment-header {
      padding: 0.25rem 0;
    }
  }
</style>
