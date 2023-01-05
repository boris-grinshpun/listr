import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Main from './components/Main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Main/>        
    </div>
  )
}

export default App
