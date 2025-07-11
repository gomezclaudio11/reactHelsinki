import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate }  from 'react-router-dom'
import { useParams, useNavigate } from "react-router-dom"
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      
        <Link style={padding} to="/anecdotes">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
     
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
      <li key={anecdote.id} >
       <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      </li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(n => n.id === Number(id))
  return(
    <div>
    <div>{anecdote.content}</div>
    <div>{anecdote.votes}</div>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)


const CreateNew = (props) => {
  //cada uno es un campo controlado con su propi estado y logica
  const content = useField("text")
  const author = useField("text")
  const url = useField("text")
  const navigate = useNavigate()

    const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.inputProps.value,
      author: author.inputProps.value,
      votes: 0
    })
    navigate("/anecdotes")
  }
  const handleReset = () => {
     // Limpiar los campos con reset()
    content.reset()
    author.reset()
    url.reset()
  }
    return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content: 
          <input {...content.inputProps} />
        </div>
        <div>
          author: 
          <input {...author.inputProps} />
        </div>
        <div>
          url for more info
          <input {...url.inputProps} />
        </div>
        <button >create</button>
        <button type='button' onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    // mostrar notificación
  setNotification(`A new anecdote "${anecdote.content }" created!`)
  
  // limpiar notificación después de 5 segundos
  setTimeout(() => {
    setNotification('')
  }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      
      <Router>
      <div>

      <h1>Software anecdotes</h1>
      <Menu />
      {notification && (
      <div style={{ 
        border: '1px solid green', 
        padding: 10, 
        marginBottom: 10 }}>
        {notification}
      </div>
    )}
      <Routes>
        <Route path='/anecdotes' element={ <AnecdoteList anecdotes={anecdotes}/>} />
        <Route path='/anecdotes/:id' element={ <Anecdote anecdotes={anecdotes}/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/create' element={<CreateNew addNew={addNew} />}/>
      </Routes>
      </div>
      </Router>
      
      <Footer />
    </div>
  )
}

export default App