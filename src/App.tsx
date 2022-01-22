import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { TypeCount } from '../functions/src/dto/TypeCount';
import { getQuestionerId, loadQuestioner, questionersLeft } from './firebase/cheapFunctions';
import { Model, Survey } from 'survey-react';

function App() {
  const [count, setCount] = useState(0)
  const [leftCount, setLeftCount] = useState<TypeCount | undefined>();

  const [receivedQuestioner, setReceivedQuestioner] = useState<string | null | undefined>();

  const fetchLeftCount = async (): Promise<void> => {
    const data = await questionersLeft();
    setLeftCount(data);
  }

  const takeRandomForm = (): Promise<void> =>
    getQuestionerId()
      .then(setReceivedQuestioner)
      .then(fetchLeftCount);

  useEffect(() => {
    fetchLeftCount();
  }, []);

  const loadForm = async (id: string) => {
    const model = new Model(await loadQuestioner(id));
    setModel(model);
  }

  const [model, setModel] = useState<any>();
  useEffect(() => {
    loadForm("A");
  }, []);

  return !model ? <p>Ładowanie</p> : <Survey model={model} />

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
        <p>
          <button type="button" onClick={takeRandomForm}>
            Weź formularz
          </button>
        </p>
        {receivedQuestioner !== undefined &&
        <p>
          {receivedQuestioner
            ? `Wypełnij formularz ${receivedQuestioner}`
            : 'Nie ma już więcej formularzy :('}
        </p>}
      </header>
      <main>
        {JSON.stringify(leftCount)}
      </main>
    </div>
  )
}

export default App
