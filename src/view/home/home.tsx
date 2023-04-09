import './home.css'

import { Component } from 'solid-js'

import Layout from '@/layout/layout'

import { Hero } from './_components/hero'
import { Socials } from './_components/socials'

const Home: Component = () => {
  return (
    <Layout>
      <div id="home">
        <Hero />
        <Socials />
      </div>
    </Layout>
  )
}

export { Home }
