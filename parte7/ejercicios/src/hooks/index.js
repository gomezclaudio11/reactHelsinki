import { useState } from 'react'


export const useField = (type) => {//recibe un tipo de input
  const [value, setValue] = useState('')//maneja su propio estado interno

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () =>{
    setValue ("")
  }
  return{//devuelve un objeto
      inputProps: {
        type,
        value,
        onChange
      },
      reset
  }
}
// los módulos pueden tener muchas exportaciones nombradas

export const useAnotherHook = () => {
  // ...
}
/*
 ¿Qué es un hook personalizado?

Es una función que usa hooks internos de React (como 
useState, useEffect, etc.) para encapsular lógica 
reutilizable.

En vez de repetir el mismo código en varios lugares, 
lo metés en un hook propio y lo reutilizás.
*/