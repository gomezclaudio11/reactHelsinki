/**
 React Context + useReducer para manejar un contador con 
 estado global, separando valor y dispatch con hooks custom
 */
import { createContext, useReducer, useContext } from 'react'

//Es un reducer puro, como en Redux
const counterReducer = (state, action) => {
  switch (action.type) {
    case "INC":
      return state + 1
    case "DEC":
      return state - 1
    case "ZERO":
      return 0
    default:
      return state
    }
  }
const CounterContext = createContext() //Crea el contexto global.

//HOOKS
export const useCounterValue = () => {
  const counterAndDispatch = useContext(CounterContext)//Accede al context
  return counterAndDispatch[0]//Devuelve solo el valor del contador
}

export const useCounterDispatch = () => {
  const counterAndDispatch = useContext(CounterContext)
  return counterAndDispatch[1]
}//Devuelve solo el dispatch (para enviar acciones)
// así no acceden directamente al valor del contador — 
// solo a la función que lo modifica.

export const CounterContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    <CounterContext.Provider value={[counter, counterDispatch] }>
      {props.children}
    </CounterContext.Provider>
  )
}
/**
 Envolvés tu app con este provider, así cualquier componente 
 puede usar useCounterValue() o useCounterDispatch().
 */
export default CounterContext

/**
 Usar useReducer en vez de useState: ideal cuando tenés 
 lógica de acciones más complejas o múltiples pasos.

Separar el acceso a valor y acción con hooks personalizados: 
es más claro, más reusable.

Mantiene el código limpio y fácil de testear.
 */