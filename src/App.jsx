import React from 'react'
import Header from './components/Header.jsx'
import Feed from './components/Feed.jsx'
import Hero from './components/Hero.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div>
      <Header></Header>
      <Hero></Hero>
      <Feed></Feed>
    </div>
  )
}

export default App
