import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { AuthProvider } from '@/contexts/auth/provider';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <h1>Hello world</h1>
      </AuthProvider>
    </>
  )
}

export default App
