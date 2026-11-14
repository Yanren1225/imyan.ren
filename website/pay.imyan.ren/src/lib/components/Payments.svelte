<script lang="ts">
  import { Terminal, TerminalPrompt } from '@yanren/common'
  import QRCode from 'qrcode'
  import { i18n } from '$lib/i18n'

  type Payment = {
    id: 'alipay' | 'wechat' | 'qq'
    icon: string
    link: string
  }

  const payments: Payment[] = [
    {
      id: 'alipay',
      icon: 'i-ri-alipay-fill',
      link: 'https://qr.alipay.com/fkx17810vgkiizqwtcqebfc',
    },
    {
      id: 'wechat',
      icon: 'i-ri-wechat-fill',
      link: 'wxp://f2f0tkJn97xBE_AALRqk5GQGYH5cu7L9keLG',
    },
    {
      id: 'qq',
      icon: 'i-ri-qq-fill',
      link: 'https://i.qianbao.qq.com/wallet/sqrcode.htm?m=tenpay&f=wallet&a=1&ac=F18F01A9E9104C71F8C43BE384C96F6213F4F51B993ACEA8806A94F08944E1C9&u=2323355219&n=%E6%B1%9D%E5%8D%97%E4%BA%AC',
    },
  ]

  let activePayment = $state<Payment['id']>('alipay')
  let qrVisible = $state(false)

  const getPaymentName = (id: Payment['id']) => i18n.t[id]

  const selectPayment = (id: Payment['id']) => {
    activePayment = id
    qrVisible = false
  }

  const handlePay = (payment: Payment) => {
    const link =
      payment.id === 'alipay'
        ? `alipays://platformapi/startapp?appId=10000007&qrcode=${encodeURIComponent(payment.link)}`
        : payment.link

    window.open(link, '_blank', 'noopener,noreferrer')
  }

  const qrcode = (node: HTMLImageElement, text: string) => {
    QRCode.toDataURL(text, {
      width: 480,
      margin: 0,
      color: { dark: '#080b0a', light: '#ffffff' },
    })
      .then((url) => {
        const show = () => node.classList.add('is-ready')
        node.addEventListener('load', show, { once: true })
        node.addEventListener('error', show, { once: true })
        node.src = url
        if (node.complete) show()
      })
      .catch((error) => console.error(error))
  }
</script>

<section class="payment-region" aria-labelledby="payment-heading">
  <Terminal>
    <TerminalPrompt hostname="root@pay.imyan.ren:~$">
      {i18n.t.payment}
    </TerminalPrompt>
    <p id="payment-heading" class="payment-hint">{i18n.t.chooseMethod}</p>
    <div class="payments-grid">
      {#each payments as item}
        <article
          class="payment-item {item.id}"
          class:active={activePayment === item.id}
        >
          <button
            type="button"
            class="payment-selector"
            aria-pressed={activePayment === item.id}
            onclick={() => selectPayment(item.id)}
          >
            <span class="payment-icon {item.icon}" aria-hidden="true"></span>
            <span class="payment-id">{item.id.toUpperCase()}</span>
            <span class="selector-mark" aria-hidden="true">
              {activePayment === item.id ? i18n.t.selectedMark : i18n.t.selectMark}
            </span>
          </button>

          <div class="payment-details">
            <button class="open-app-btn" type="button" onclick={() => handlePay(item)}>
              <span class="{item.icon}" aria-hidden="true"></span>
              {i18n.t.openApp.replace('{payment}', getPaymentName(item.id))}
              <span aria-hidden="true">↗</span>
            </button>

            <button
              class="qr-toggle"
              type="button"
              aria-expanded={qrVisible}
              onclick={() => (qrVisible = !qrVisible)}
            >
              {i18n.t.useQrCode}
              <span aria-hidden="true">{qrVisible ? '−' : '+'}</span>
            </button>

            <div class="qr-content" class:qr-visible={qrVisible}>
              <div class="qr-frame">
                <span class="corner corner-tl"></span>
                <span class="corner corner-tr"></span>
                <span class="corner corner-bl"></span>
                <span class="corner corner-br"></span>
                <img
                  use:qrcode={item.link}
                  alt={i18n.t.qrAlt.replace('{payment}', getPaymentName(item.id))}
                  class="qrcode-image"
                />
              </div>
              <p class="instruction">{i18n.t.scanQrCode}</p>
              <p class="save-hint">{i18n.t.saveImg}</p>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </Terminal>
</section>

<style>
  .payment-region {
    width: 100%;
  }

  .payment-hint {
    font-size: 0.8rem;
    opacity: 0.5;
  }

  .payments-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 260px);
    gap: 1rem;
  }

  .payment-item {
    --accent-color: var(--c-neon);
    min-width: 0;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--accent-color);
    background: color-mix(in srgb, var(--accent-color), transparent 90%);
    transition:
      background-color 0.2s,
      border-color 0.2s,
      box-shadow 0.2s;
  }

  .payment-item:hover {
    background: color-mix(in srgb, var(--accent-color), transparent 85%);
  }

  @media (min-width: 761px) {
    .payment-item.active {
      background: color-mix(in srgb, var(--accent-color), transparent 82%);
      box-shadow:
        inset 0 0 0 1px var(--accent-color),
        0 0 20px -8px var(--accent-color);
    }
  }

  .payment-item.alipay {
    --accent-color: #1677ff;
  }

  .payment-item.wechat {
    --accent-color: #07c160;
  }

  .payment-item.qq {
    --accent-color: #12a9e8;
  }

  .payment-selector {
    width: 100%;
    min-height: 2.75rem;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 0;
    border-bottom: 1px dashed var(--c-grid);
    background: transparent;
    color: inherit;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
  }

  .payment-selector:focus-visible,
  .open-app-btn:focus-visible,
  .qr-toggle:focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: 3px;
  }

  .payment-selector:active {
    transform: none;
  }

  .payment-icon {
    flex: 0 0 auto;
    width: 1rem;
    height: 1rem;
    color: var(--accent-color);
  }

  .payment-id {
    color: var(--accent-color);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .selector-mark {
    display: none;
    margin-left: auto;
    color: var(--accent-color);
    font-size: 0.6rem;
  }

  .payment-details {
    flex: 1;
    padding: 1.25rem 0.75rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .open-app-btn,
  .qr-toggle {
    display: none;
  }

  .qr-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .qr-frame {
    width: min(100%, 13.75rem);
    aspect-ratio: 1;
    padding: 0.65rem;
    box-sizing: border-box;
    position: relative;
    background: #fff;
  }

  /* Loading skeleton: a faint checkerboard shows while the QR is generated */
  .qr-frame::before {
    content: '';
    position: absolute;
    inset: 0.65rem;
    background-image:
      linear-gradient(45deg, rgb(0 0 0 / 0.04) 25%, transparent 25%, transparent 75%, rgb(0 0 0 / 0.04) 75%),
      linear-gradient(45deg, rgb(0 0 0 / 0.04) 25%, transparent 25%, transparent 75%, rgb(0 0 0 / 0.04) 75%);
    background-size: 16px 16px;
    background-position:
      0 0,
      8px 8px;
  }

  .corner {
    width: 0.65rem;
    height: 0.65rem;
    position: absolute;
    border-color: var(--accent-color);
  }

  .corner-tl {
    top: -4px;
    left: -4px;
    border-top: 2px solid;
    border-left: 2px solid;
  }

  .corner-tr {
    top: -4px;
    right: -4px;
    border-top: 2px solid;
    border-right: 2px solid;
  }

  .corner-bl {
    bottom: -4px;
    left: -4px;
    border-bottom: 2px solid;
    border-left: 2px solid;
  }

  .corner-br {
    right: -4px;
    bottom: -4px;
    border-right: 2px solid;
    border-bottom: 2px solid;
  }

  .qrcode-image {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .qrcode-image.is-ready {
    opacity: 1;
  }

  .instruction {
    margin-top: 0.85rem;
    color: var(--accent-color);
    font-size: 0.67rem;
    letter-spacing: 0.08em;
    text-align: center;
  }

  .save-hint {
    display: none;
    margin-top: 0.35rem;
    font-size: 0.65rem;
    opacity: 0.5;
  }

  @media (max-width: 760px) {
    .payments-grid {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .payment-item {
      border-color: var(--c-grid);
      background: var(--c-bg-soft);
    }

    .payment-item.active {
      border-color: var(--accent-color);
      background: var(--c-card-bg);
    }

    .payment-selector {
      min-height: 3.75rem;
      padding: 0.75rem 1rem;
      border-bottom: 0;
    }

    .active .payment-selector {
      border-bottom: 1px dashed var(--c-grid);
    }

    .selector-mark {
      display: block;
    }

    .payment-details {
      display: none;
      padding: 1rem;
    }

    .payment-item.active .payment-details {
      display: flex;
    }

    .open-app-btn,
    .qr-toggle {
      width: 100%;
      min-height: 3rem;
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      border: 1px solid var(--accent-color);
      font-family: inherit;
      cursor: pointer;
    }

    .open-app-btn {
      background: var(--accent-color);
      color: #07100c;
      font-weight: 700;
    }

    .open-app-btn span:first-child {
      width: 1.2rem;
      height: 1.2rem;
    }

    .qr-toggle {
      margin-top: 0.65rem;
      justify-content: space-between;
      background: transparent;
      color: var(--accent-color);
    }

    .qr-content {
      display: none;
      padding-top: 1.5rem;
    }

    .qr-content.qr-visible {
      display: flex;
    }

    .qr-frame {
      width: min(100%, 14rem);
    }

    .save-hint {
      display: block;
    }
  }

</style>
