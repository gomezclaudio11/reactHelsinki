import { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from "./services/notes"

  const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState("")

    useEffect(() => {
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
    }, [])
    
    const addPerson = (event) =>{
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      personService
        .create(personObject)
        .then (returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
        })
    }

    const deletePerson = (id, name) => {
    if(window.confirm(`Seguro que queres borrar a ${name}`)){
      personService
        .borrar(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log(error)          
          alert (`la persona ${name} ya fue eliminada del servidor`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
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
        <div>
          <h3>Filter result</h3>
        </div>
        <ul>
        {nameToShow.map(person => (
          <Person key={person.id} person={person}/>
          ))}
        </ul>
        <h3>Add contact</h3>
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
              <Person 
                key={person.id} 
                person={person} 
                handleDelete={() => deletePerson(person.id, person.name)} />
              )
            }
          </ul>
          </div>
          )
          }
          
  export default App 