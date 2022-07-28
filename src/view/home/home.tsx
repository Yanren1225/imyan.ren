import { Hero } from './_components/hero'
import './home.css'
import { Socials } from './_components/socials'
import { Footer } from './_components/footer'
import { LanguageSwitcher } from './_components/language-swicher'

const Home = () => {
  return (
    <div id="home">
      <LanguageSwitcher />
      <Hero />
      <Socials />
      <Footer />
    </div>
  )
}

export { Home }
