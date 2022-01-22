import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { TypeCount } from '../functions/src/dto/TypeCount';
import { questionersLeft } from './firebase/cheapFunctions';

function App() {
  const [count, setCount] = useState(0)
  const [leftCount, setLeftCount] = useState<TypeCount | undefined>();

  useEffect(() => {
    questionersLeft().then(setLeftCount);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Press button if you are excited ^^
        </p>
      </header>
      <main>
        {JSON.stringify(leftCount)}
      </main>
    </div>
  )
}

export default App
