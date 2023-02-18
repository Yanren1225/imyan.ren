import { Hero } from './_components/hero'
import './home.css'
import { Socials } from './_components/socials'
import Layout from '@/layout/layout'

const Home = () => {
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
