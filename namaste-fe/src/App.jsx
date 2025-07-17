import { useState } from 'react'
import './App.css'
import LoginPage from './components/Login.jsx'
import SignupPage from './components/Signup.jsx'
import {Routes, Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
  )
}

export default App
