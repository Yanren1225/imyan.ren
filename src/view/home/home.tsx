import { Hero } from './_components/hero'
import './home.css'
import { Socials } from './_components/socials'
import Layout from '@/layout/layout'
import { Component } from 'solid-js'

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
