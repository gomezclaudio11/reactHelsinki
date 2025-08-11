import React, { useState } from 'react'
import { useQuery } from '@apollo/client';// Hook de Apollo para ejecutar queries GraphQL.
import Persons from '../components/Persons';
import PersonForm from '../components/PersonForm';
import Notify from '../components/Notify';
import { ALL_PERSONS } from './queries';
import PhoneForm from '../components/PhoneForm';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS, {
    pollInterval:2000
  }) //actualizar cache cada 2s
  //útil para mantener datos actualizados en tiempo real sin websockets
//Cuando se llama, useQuery realiza la consulta que recibe como
//parámetro. Devuelve un objeto con varios campos.
  if (result.loading)  {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  } //MUESTRA UN ERROR EN PANTALLA X 10s

  return (
    <div>
      <Notify errorMessage={errorMessage}/>
      <Persons persons={result.data.allPersons}/>
      <PersonForm setError={notify}/>
      <PhoneForm/>
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