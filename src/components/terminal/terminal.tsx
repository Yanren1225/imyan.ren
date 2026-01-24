import './terminal.css'

import { Component, JSX, splitProps } from 'solid-js'

interface TerminalProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children?: JSX.Element
}

export const Terminal: Component<TerminalProps> = (props) => {
    const [local, others] = splitProps(props, ['children', 'class', 'classList'])

    return (
        <div
            class={`terminal-box ${local.class || ''}`}
            classList={local.classList}
            {...others}
        >
            <div class="terminal-header">
                <div class="dot red"></div>
                <div class="dot yellow"></div>
                <div class="dot green"></div>
            </div>
            <div class="terminal-content">{local.children}</div>
        </div>
    )
}

export const TerminalLine: Component<{ children: JSX.Element; class?: string }> = (
    props
) => {
    return <div class={`line ${props.class || ''}`}>{props.children}</div>
}

export const TerminalHighlight: Component<{ children: JSX.Element }> = (
    props
) => {
    return <span class="highlight">{props.children}</span>
}

export const TerminalPrompt: Component<{ children?: JSX.Element }> = (
    props
) => {
    return (
        <TerminalLine>
            <TerminalHighlight>root@imyan.ren:~$</TerminalHighlight> {props.children}
        </TerminalLine>
    )
}
