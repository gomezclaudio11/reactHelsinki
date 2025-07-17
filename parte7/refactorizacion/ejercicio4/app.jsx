/**
 * import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/notes').then(res => {
      setNotes(res.data)
    })
  }, [])

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    axios.put(`http://localhost:3001/notes/${id}`, changedNote)
      .then(res => {
        setNotes(notes.map(n => n.id !== id ? n : res.data))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            {note.content}
            <strong> {note.important ? 'important' : 'not important'} </strong>
            <button onClick={() => toggleImportance(note.id)}>toggle</button>
          </li>
        )}
      </ul>
    </div>
  )
}

 */
/**REFACTORIZADO */
import { useEffect, useState } from 'react'
import noteService from "./services/notes"
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important} 

    noteService.update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote ))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
            <Note key={note.id} note={note} onToggle={toggleImportance}/>
          )}
      </ul>
    </div>
  )
}