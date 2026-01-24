import './about.css'

import { Component } from 'solid-js'

import {
    Terminal,
    TerminalHighlight,
    TerminalLine,
    TerminalPrompt,
} from '@/components/terminal/terminal'
import Layout from '@/layout/layout'

export const About: Component = () => {
    return (
        <Layout>
            <div id="about">
                <Terminal class="about-terminal">
                    <TerminalPrompt>cat /etc/profile</TerminalPrompt>
                    <TerminalLine># Loading user profile configuration...</TerminalLine>
                    <TerminalLine>
                        module.load('yanren_profile'){' '}
                        <TerminalHighlight>...Pending</TerminalHighlight>
                    </TerminalLine>
                    <TerminalLine>
                        {'>'} User profile is currently under construction.
                    </TerminalLine>
                    <TerminalLine>{'>'} Please check back later.</TerminalLine>
                    <TerminalPrompt>
                        <span class="cursor" />
                    </TerminalPrompt>
                </Terminal>
            </div>
        </Layout>
    )
}
