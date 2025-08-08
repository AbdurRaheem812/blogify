import { useState } from 'react'
import Navbar from '../components/navbar.jsx'
import Signup from '../pages/signup.jsx'
import Login from '../pages/login.jsx'
import Home from '../pages/home.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoute from '../components/protectedRoute.jsx'

import { isAuthenticated } from '../utils/auth'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
