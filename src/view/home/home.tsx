import './home.css'

import { Component } from 'solid-js'

import Layout from '@/layout/layout'

import { Hero } from './_components/hero'
import { Project } from './_components/project/project'
import { Socials } from './_components/socials'

export const Home: Component = () => {
  return (
    <Layout>
      <div id="home">
        <Hero />
        <Socials />
        <Project />
      </div>
    </Layout>
  )
}
