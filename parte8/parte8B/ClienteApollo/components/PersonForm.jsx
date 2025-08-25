import React, { useState } from 'react'
import { useMutation } from '@apollo/client'//Hook de Apollo para ejecutar mutaciones GraphQL.
import { ALL_PERSONS, CREATE_PERSON } from '../src/queries'

const PersonForm = ({ setError }) => {
    //Cada campo del formulario tiene un estado propio que guarda el valor que el usuario escribe.
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')


  const [ createPerson ] = useMutation(CREATE_PERSON, {// es la mutación que agrega una persona al servido
    onError: (error) => {
        const messages = error.graphQLErrors.map(e => e.message).join("\n")
        setError(messages)
    },
        update: (cache, response) => {      
          cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {        
            return {          
              allPersons: allPersons.concat(response.data.addPerson),        
            }      
          })    
        },
  })

//Función de envío del formulario
  const submit = (event) => {
    event.preventDefault()

//ejecuta la mutación enviando los datos como variables a GraphQL.
//Luego resetea los campos del formulario a cadenas vacías.
    createPerson({  
      variables: { 
        name, street, city,
        //phone en undefined si el usuario no ha dado un valor.
        phone: phone.length > 0 ? phone : undefined
      } })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }
//render del formulario
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone <input value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street <input value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city <input value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )
}

export default PersonForm
/**
 Importante:
El useMutation devuelve un array donde:
    El primer elemento (createPerson) es una función para ejecutar la mutación.
    El segundo elemento (que acá no usamos) tendría información sobre el estado de la mutación (loading, error, data...).
 */