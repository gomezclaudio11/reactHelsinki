import { useState, useEffect } from 'react'
import Note from './components/Note'
import notesService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowALL] = useState(true)
  
  useEffect(() => {
    notesService
      .getAll()
      .then(initialNotes => {
         setNotes(initialNotes)
     })
    },[])

  const addNote = (event) => {    
    event.preventDefault()    
    const noteObject = {
     content: newNote,
      important: Math.random() > 0.5,
   } 
   notesService
    .create(noteObject)
    .then (returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote("")
    })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value)
  }
   
  const notesToShow = showAll ? notes : notes.filter (note => note.important)
  
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    notesService
      .update(id, changedNote)
      .then (returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch((error) => {
        console.log(error)        
        alert(`the note ${note.content} was alredy deleted from server`)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }
  return (
        <div>
        <h1>Notes</h1>
        <div>
          <button onClick={()=> setShowALL(!showAll)}>
            show {showAll ? "important" : "all"}
          </button>  
        </div>  
          <ul>
            {notesToShow.map((note) =>
            <Note 
              key={note.id} 
              note ={note}
              toggleImportance={() => toggleImportanceOf(note.id)}  
            />
            )
            }
          </ul>
        <form onSubmit={addNote}>
        <input value={newNote}
              onChange={handleNoteChange}
        />       
        <button type="submit">save</button>      
      </form>   
      </div>
      )
      }
      
     
          
export default App 