import { useEffect, useState } from "react"
import notesService from "./services/notes"

const App = () => {
  const [notes, setNotes] = useState([])
 useEffect(() => {
  notesService.getAll().then(initialNotes => setNotes(initialNotes))
  notesService.create({ content: 'nueva nota' })
  .then(returnedNote => setNotes(notes.concat(returnedNote)))
}, [])

  return (
    <div>
      <h1>Notes</h1>
      {notes.map(note => <p key={note.id}>{note.content}</p>)}
    </div>
  )
}
