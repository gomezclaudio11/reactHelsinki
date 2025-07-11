import { useEffect } from 'react'
import Notes from "./components/Notes"
import NewNote from "./components/NewNote"
import VisibilityFilter from "./components/VisibilityFilter"
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch()//te permite enviar acciones al store de Redux.
  useEffect(() => {//Este hook se ejecuta una sola vez al montar el componente
    dispatch(initializeNotes())  
  }, [])
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
}

export default App