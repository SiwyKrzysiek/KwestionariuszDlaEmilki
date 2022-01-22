import { useEffect, useState } from 'react'
import './App.css'
import { TypeCount } from '../functions/src/dto/TypeCount';
import { getQuestionerId, loadQuestioner, questionersLeft, saveResponse } from './firebase/cheapFunctions';
import { Model, Survey } from 'survey-react';

function App() {
  // const [count, setCount] = useState(0)
  // const [leftCount, setLeftCount] = useState<TypeCount | undefined>();

  // const [receivedQuestioner, setReceivedQuestioner] = useState<string | null | undefined>();

  // const fetchLeftCount = async (): Promise<void> => {
  //   const data = await questionersLeft();
  //   setLeftCount(data);
  // }

  // const takeRandomForm = (): Promise<void> =>
  //   getQuestionerId()
  //     .then(setReceivedQuestioner)
  //     .then(fetchLeftCount);

  // useEffect(() => {
  //   fetchLeftCount();
  // }, []);

  const loadForm = async (id: string) => {
    const model = new Model(await loadQuestioner(id));
    model.onComplete.add((sender: any) => saveResponse(sender.data))
    setModel(model);
  }

  const [model, setModel] = useState<any>();
  useEffect(() => {
    (async () => {
      const id = await getQuestionerId();
      id && loadForm(id);
    })();
  }, []);

  return !model ? <p>Ładowanie</p> : <Survey model={model} />
}

export default App
