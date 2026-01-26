import { Component, createSignal, Show } from 'solid-js'
import './image-with-placeholder.css'

interface ImageWithPlaceholderProps {
    src: string
    alt: string
    class?: string
    imgClass?: string
    loading?: 'lazy' | 'eager'
    handleError?: (e: Event) => void
}

export const ImageWithPlaceholder: Component<ImageWithPlaceholderProps> = (props) => {
    const [loading, setLoading] = createSignal(true)

    // Reset loading state when src changes
    // Note: specific to SolidJS reactivity, if props.src creates a new tracking context

    return (
        <div class={`img-placeholder-container ${props.class || ''}`}>
            <Show when={loading()}>
                <div class="img-placeholder-shim" />
            </Show>

            <img
                class={`img-with-placeholder ${props.imgClass || ''} ${loading() ? 'is-loading' : ''}`}
                src={props.src}
                alt={props.alt}
                loading={props.loading || 'lazy'}
                decoding="async"
                onLoad={() => setLoading(false)}
                onError={(e) => {
                    setLoading(false)
                    if (props.handleError) {
                        props.handleError(e)
                    }
                }}
            />
        </div>
    )
}
