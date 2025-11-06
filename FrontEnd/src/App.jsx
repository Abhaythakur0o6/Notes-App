import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginSignup from './Pages/LoginSignup'
import MainPage from './Pages/MainPage'
import ProtectedRoute from './ProtectedRoute.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginSignup />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/notes' element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App