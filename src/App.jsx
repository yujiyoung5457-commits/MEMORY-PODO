import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import useAuthStore from './store/authStore'
import Board from './pages/Board'
import Detail from './pages/Detail'

const App = () => {
  const listenAuthState = useAuthStore((state) => state.listenAuthState)

  useEffect(() => {
    const unsubscribe = listenAuthState()

    return () => {
      unsubscribe()
    }
  }, [listenAuthState])

  return (
    <div className="app">
      <header>
        <h2>MEMORY PODO</h2>
      </header>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
