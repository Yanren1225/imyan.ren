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

  // We need to initialize UA parser carefully as it might run on server during SSG build where navigator is undefined
  let parsedUA: UAParser.IResult | undefined = undefined

  onMount(() => {
    parsedUA = new UAParser(navigator.userAgent).getResult()
    document.body.addEventListener('mouseup', (e) => {
      const el = document.querySelector('.payment')
      if (!el) {
        // logic from original file seemed empty here or incomplete
      }
    })
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
      selectPayment = payment.id

      setTimeout(() => {
        document
          .querySelector(`.payment-container.${payment.id}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 400)
    }
  }

  function close() {
    selectPayment = ''
  }

  // QR Code Action
  function qrcode(node: HTMLImageElement, text: string) {
    const canvas = document.createElement('canvas')
    QRCode.toCanvas(canvas, text, { width: 1000 }, (err) => {
      if (err) console.error(err)
    })
    // canvas context settings
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.imageSmoothingEnabled = false

    node.src = canvas.toDataURL('image/png')
  }
</script>

<div class="payments">
  {#each payments as item}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class={`payment-container ${item.id}`}
      class:open={selectPayment === item.id}
      onclick={(e) => {
        if ((e.target as HTMLElement).classList.contains('close')) {
          selectPayment = ''
          return
        }
        handlePay(item)
      }}
    >
      <div class="payment">
        <div class={`icon ${item.icon}`}></div>
        <img use:qrcode={item.link} alt={item.id} class="qrcode" />
        <i onclick={() => close()} class="close i-ri-close-fill"></i>
      </div>
    </div>
  {/each}
</div>

<style lang="less">
  .payments {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-top: 50px;
  }

  .payment-container {
    display: grid;
    width: 50%;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: all 0.5s;

    .payment {
      min-height: 100px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f9fafb;
      border-radius: 32px;
      position: relative; /* Ensure absolute positioning works inside */

      & > .icon {
        position: absolute;
      }

      & > .qrcode {
        border-radius: 32px;
        display: block;
        width: 80% !important;
        height: auto !important ;
        aspect-ratio: 1/1;
        visibility: hidden;
        transform: translateY(-80%);
        transition:
          transform 400ms,
          visibility 100ms;
      }

      & > .close {
        display: none !important;
      }
    }

    @media screen and (prefers-color-scheme: dark) {
      > .payment {
        background-color: #ffffff1a;
      }
    }

    &:hover {
      width: 100%;

      > .payment:hover > .icon {
        color: #fff;
      }

      &.alipay:hover > .payment {
        background-color: #027aff;
      }

      &.wechat:hover > .payment {
        background-color: #1aad19;
      }

      &.qq:hover > .payment {
        background-color: #01c5ff;
      }
    }

    &.open {
      cursor: default;
      position: relative;
      width: 80%;
      grid-template-rows: 1fr;
      flex-direction: column;
      justify-content: space-around;

      > .payment {
        aspect-ratio: 1/1;

        & > .icon {
          display: none;
        }

        & > .close {
          cursor: pointer;
          display: block !important;
          position: absolute;
          top: 16px;
          right: 16px;
          height: 40px;
          width: 40px;
          color: #fff;
          transition: 0.4s;

          &:hover {
            color: red;
          }
        }

        & > .qrcode {
          visibility: visible;
          transform: translateY(0%);
        }
      }
    }

    @media (max-width: 768px) {
      width: 100%;

      &.open {
        width: 100%;

        > .payment {
          & > .close {
            top: 8px;
            right: 8px;
            height: 32px;
            width: 32px;
          }
        }
      }

      & > .payment {
        border-radius: 16px;

        .qrcode {
          border-radius: 16px;
        }
      }

      .payment.open {
        margin-top: -100px;

        > .qrcode {
          font-size: 28px;
          top: 16px;
          right: 16px;
        }

        > .icon {
          border-radius: 16px;
        }
      }
    }

    &.alipay.open > .payment {
      background-color: #027aff;
    }

    &.wechat.open > .payment {
      background-color: #1aad19;
    }

    &.qq.open > .payment {
      background-color: #01c5ff;
    }
  }
</style>
