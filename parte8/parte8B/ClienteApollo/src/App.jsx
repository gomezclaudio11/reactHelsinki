import React, { useState } from 'react'
import { useQuery, // Hook de Apollo para ejecutar queries GraphQL.
        useApolloClient, //para acceder al cliente Apollo directamente (ej: manipular la caché).
        useSubscription //para escuchar eventos en tiempo real (cuando alguien agrega una persona).
      } from '@apollo/client';
import Persons from '../components/Persons';
import PersonForm from '../components/PersonForm';
import PhoneForm from '../components/PhoneForm';
import Notify from '../components/Notify';
import LoginForm from '../components/LoginForm'

import { ALL_PERSONS, PERSON_ADDED } from './queries';

//Helper
export const updateCache = (cache, query, addedPerson) => {
  const uniqByName = (a) => { //evita duplicados
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
//reemplaza los datos del query ALL_PERSONS con la nueva lista.
  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    }
  })
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  //suscripcion en tiempo real
  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`) //Muestra notificación
      //mete a la persona en la lista
      updateCache (client.cache, { query: ALL_PERSONS }, addedPerson)
    }
  })

  if (result.loading)  {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  } //MUESTRA UN MSJ EN PANTALLA X 10s

  //Borra el token en memoria y en localStorage.
   const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  //Render (cuando no hay login)
  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    )
  }

  // Render (cuando hay login)
  return (
    <div>
      <Notify errorMessage={errorMessage}/>
      <PersonForm setError={notify}/>
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons}/>
      <PhoneForm setError={notify}/>
    </div>
  )
}

export default App

/**
 result es un objeto que contiene:
    loading → true mientras la query está en proceso.
    data → datos devueltos por la query (result.data.allPersons).
    error → información de error si la query falla.
    y otros campos como refetch, networkStatus, etc.
 */