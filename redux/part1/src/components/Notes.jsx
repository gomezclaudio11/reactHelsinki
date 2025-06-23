import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong> {note.important ? 'important' : 'not important'}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  //dispatch permite enviar acciones al store de Redux 
  // para modificar el estado.
  //useSelector te permite leer valores del estado 
  // de Redux. Es como useState, pero accediendo al 
  // estado global.
  const notes = useSelector(state =>{
    if ( state.filter === "ALL") {
      return state.notes
    }
    return state.filter === "IMPORTANT"
      ? state.notes.filter (note => note.important)
      : state.notes.filter (note => !note.important)
  } )
  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => 
            dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  )
}
//useSelector te da acceso a las notas guardadas en el 
// estado de Redux.

//useDispatch te permite modificar ese estado cuando 
// hacés click.
export default Notes