import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState("")

  const addPerson = (event) =>{
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(personObject))
    setNewName("")
    setNewNumber("")
  }
  
  const sameName = persons.some(
    person => person.name.toLowerCase() === newName.toLowerCase()
  )

  if(sameName){
    alert (`${newName} ya existe`)
    return
  }

  const nameToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase()) )
  
    return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shownn with <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <ul>
        {nameToShow.map(person => (
          <Person key={person.id} person={person}/>
        ))}
      </ul>
      <form onSubmit={addPerson}>
        <div >
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map((person) => 
          <Person Key={person.id} person={person} />
          )
        }
      </ul>
    </div>
  )
}

export default App