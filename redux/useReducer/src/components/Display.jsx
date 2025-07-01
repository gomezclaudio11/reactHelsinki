import { useCounterValue } from "../CounterCOntext"

const Display = () => {
  const counter = useCounterValue()
  return <div>{counter}</div>
}

export default Display