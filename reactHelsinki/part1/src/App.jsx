import { useState, useEffect, useRef } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from "./services/login"
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const noteFormRef = useRef()

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    if (!note) return 

    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)))
      })
      .catch(error => {
        console.error('Error updating note:', error.response || error.message)
        setErrorMessage(
          `Note cont was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = (noteObject) => {
    try {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        if (!returnedNote || !returnedNote.content) {
          throw new Error("Invalid note response")
        }
        setNotes(notes.concat(returnedNote))
    })
    .catch(error => {
      console.error('Error creating note:', error.response?.data || error.message)
      setErrorMessage("Error creating note. Check console for details.")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
    } catch (err) {
      console.error('Unexpected error in addNote:', err)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        "loggedNoteappUser", JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log(exception)      
      setErrorMessage("wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log("logging in with", username, password)    
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" }
    const showWhenVisible = { display: loginVisible ? "" : "none" }
   return (
    <div>
    <div style={hideWhenVisible}>
      <button onClick={() => setLoginVisible(true)}>log in</button>
    </div>
    <div style={showWhenVisible}>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
      <button onClick={() => setLoginVisible(false)}>cancel</button>
    </div>
  </div>
  )
  }
  
  
  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef} >
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

    
 return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in </p>
        {noteForm()}
        </div>}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
}










export default App