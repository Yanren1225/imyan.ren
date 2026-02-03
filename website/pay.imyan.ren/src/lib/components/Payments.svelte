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

  let parsedUA = $state<UAParser.IResult | undefined>(undefined)

  onMount(() => {
    parsedUA = new UAParser(navigator.userAgent).getResult()
  })

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

  const handlePay = (payment: Payment) => {
    if (!payment.link) return

    if (payment.id === 'alipay') {
      window.open(
        `alipays://platformapi/startapp?appId=10000007&qrcode=${encodeURIComponent(payment.link)}`,
        '_blank',
      )
    } else if (payment.id === 'wechat' || payment.id === 'qq') {
      window.open(payment.link, '_blank')
    }
  }

  const qrcode = (node: HTMLImageElement, text: string) => {
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

<div class="payments-terminal">
  {#each payments as item}
    <div class="payment-item {item.id}">
      <div class="payment-header">
        <span class="payment-id">{item.id.toUpperCase()}</span>
        {#if parsedUA?.device.type === 'mobile'}
          <button
            class="open-link-btn"
            onclick={() => handlePay(item)}
            title="Open in app"
          >
            OPEN ↗
          </button>
        {/if}
      </div>

      <div class="payment-details">
        <div class="scan-line"></div>
        <div class="qr-box">
          <img use:qrcode={item.link} alt={item.id} class="qrcode-image" />
        </div>
        <p class="instruction">SCAN_QR_CODE_TO_PROCEED</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .payments-terminal {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 1rem;
    width: 100%;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 16px;
    line-height: 1.6;
  }

  @media (min-width: 900px) {
    .payments-terminal {
      grid-template-columns: repeat(auto-fill, 230px);
    }
  }

  @media (max-width: 530px) {
    .payments-terminal {
      grid-template-columns: minmax(0, 280px);
      justify-content: center;
    }
  }

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
    border: 1px solid var(--accent-color);
    background: color-mix(in srgb, var(--accent-color), transparent 90%);
    transition: all 0.2s;
  }

  .payment-item:hover {
    background: color-mix(in srgb, var(--accent-color), transparent 85%);
  }

  .payment-header {
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5ch;
    flex-wrap: wrap;
  }

  .payment-id {
    color: var(--accent-color);
    font-weight: bold;
    transition: color 0.2s;
  }

  .open-link-btn {
    margin-left: auto;
    background: transparent;
    border: 1px solid var(--accent-color);
    color: var(--accent-color);
    font-size: 0.9rem;
    padding: 0.15rem 0.4rem;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
    line-height: 1;
  }

  .open-link-btn:hover {
    background: var(--accent-color);
    color: var(--c-bg);
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
  @media (min-width: 768px) {
    .qrcode-image {
      width: 180px;
      height: 180px;
    }
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
</style>
