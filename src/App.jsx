import { useState, createContext } from 'react'
import './App.css'
import Main from './components/Main'
// const globalStateContext = createContext(globalState);

// import {globalState} from './store/globalState'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* <globalStateContext.Provider value={globalState}> */}
        <Main />
      {/* </globalStateContext.Provider> */}

    </div>
  )
}

export default App
