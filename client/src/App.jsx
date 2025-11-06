
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/pages/LandingPage'
import "./App.css"


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>

    </div>
  )
}

export default App