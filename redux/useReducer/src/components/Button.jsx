import { useCounterDispatch } from "../CounterCOntext"

const Button = ({ type, label }) => {
   const dispatch = useCounterDispatch()
  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}
/**
 Cada vez que llamás a useCounterDispatch(...), se ejecuta 
 counterReducer, que decide qué nuevo valor debe tener
 el contador.
 */

export default Button