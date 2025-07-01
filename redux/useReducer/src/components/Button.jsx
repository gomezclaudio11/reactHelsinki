import { useCounterDispatch } from "../CounterCOntext"

const Button = ({ type, label }) => {
   const dispatch = useCounterDispatch()
  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}

export default Button