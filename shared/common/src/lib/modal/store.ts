import { writable } from 'svelte/store'

export interface ModalOptions {
  title?: string
  content?: string
  html?: string
  confirmText?: string
  cancelText?: string
  type?: 'info' | 'warning' | 'error'
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
}

interface ModalInstance extends ModalOptions {
  id: string
  isOpen: boolean
  resolve?: (value: boolean) => void
}

function createModalStore() {
  const { subscribe, update } = writable<ModalInstance[]>([])

  function open(options: ModalOptions) {
    const id = Math.random().toString(36).substring(2, 9)
    const instance: ModalInstance = { ...options, id, isOpen: true }
    update((modals) => [...modals, instance])

    return {
      close: () => close(id),
    }
  }

  function close(id: string) {
    update((modals) => modals.filter((m) => m.id !== id))
  }

  function confirm(options: ModalOptions): Promise<boolean> {
    return new Promise((resolve) => {
      const id = Math.random().toString(36).substring(2, 9)
      const instance: ModalInstance = {
        ...options,
        id,
        isOpen: true,
        resolve,
        onConfirm: async () => {
          if (options.onConfirm) await options.onConfirm()
          resolve(true)
          close(id)
        },
        onCancel: () => {
          if (options.onCancel) options.onCancel()
          resolve(false)
          close(id)
        },
      }
      update((modals) => [...modals, instance])
    })
  }

  return {
    subscribe,
    open,
    close,
    confirm,
  }
}

export const modal = createModalStore()
