import { Route, Router } from '@solidjs/router'
import { Component, lazy, ErrorBoundary } from 'solid-js'

const Home = lazy(() =>
  import('./view/home/home').then((m) => ({ default: m.Home })),
)
const Friend = lazy(() =>
  import('./view/friend/friend').then((m) => ({ default: m.Friend })),
)
const Comment = lazy(() =>
  import('./view/comment/comment').then((m) => ({ default: m.Comment })),
)
const About = lazy(() =>
  import('./view/about/about').then((m) => ({ default: m.About })),
)

const AppRouter = () => {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/friend" component={Friend} />
      <Route path="/about" component={About} />
      <Route path="/comment" component={Comment} />
    </>
  )
}

const App: Component = () => {
  return (
    <Router>
      <AppRouter />
    </Router>
  )
}

export default App
