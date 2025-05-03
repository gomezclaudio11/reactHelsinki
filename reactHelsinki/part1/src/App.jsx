import { useState } from 'react'

const Display = ({counter}) => {
  return  (
    <div>{counter}</div>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}      
    </button>
  )
}

const App = () => {

  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)
  const increaseByOne = () => {
    console.log('increasing, value before', counter) 
    setCounter(counter + 1) 
  }
  const decreaseByOne = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter -1)
  }
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  return (
    <div>
      <div>
      <Display counter = {counter}/>
      </div>
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={decreaseByOne} text="minus" />
      <Button onClick={setToZero} text="zero" />
    </div>
  )
}

export default App