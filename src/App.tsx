import { Route, Router } from '@solidjs/router'
import { Component } from 'solid-js'

import { Comment } from './view/comment/comment'
import { Firend } from './view/firend/firend'
import { Home } from './view/home/home'

const AppRouter = () => {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/firend" component={Firend} />
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
