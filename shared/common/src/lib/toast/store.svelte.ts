export type ToastType = 'info' | 'success' | 'warning' | 'error'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration: number
}

function createToastStore() {
  let toasts = $state<Toast[]>([])

  function add(message: string, type: ToastType = 'info', duration: number = 3000) {
    const id = Math.random().toString(36).substring(2, 9)
    const toast: Toast = { id, message, type, duration }
    toasts = [...toasts, toast]
    return id
  }

  function remove(id: string) {
    toasts = toasts.filter((t) => t.id !== id)
  }

  return {
    get toasts() {
      return toasts
    },
    add,
    remove,
    info: (message: string, duration?: number) => add(message, 'info', duration),
    success: (message: string, duration?: number) => add(message, 'success', duration),
    warning: (message: string, duration?: number) => add(message, 'warning', duration),
    error: (message: string, duration?: number) => add(message, 'error', duration),
  }
}

export const toast = createToastStore()
