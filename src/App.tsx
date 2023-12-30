import { Route, Router, Routes } from '@solidjs/router'
import { Component } from 'solid-js'

import { Comment } from './view/comment/comment'
import { Firend } from './view/firend/firend'
import { Home } from './view/home/home'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="firend" element={<Firend />} />
      <Route path="comment" element={<Comment />} />
    </Routes>
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
