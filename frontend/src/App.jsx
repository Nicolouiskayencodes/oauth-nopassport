import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// require('dotenv').config();
import './App.css'

const path='/'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <a href={`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_clientId}&redirect_uri=${import.meta.env.VITE_callback}?path=${path}&scope=user:email`}>Login with Github</a>
    </>
  )
}

export default App
