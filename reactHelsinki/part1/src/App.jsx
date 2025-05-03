import { useState } from 'react'

//reenderizado coondicional
const History = (props) => {
  if (props.allClicks.length === 0){
    return(
      <div>
        THE APP IS USED BY PRESSING THE BUTTONS
      </div>
    )
  }
  return(
    <div>
      button press history : {props.allClicks.join(" ")}
    </div>
  )
}

const Button = ({ handleClick, text }) => (  
    <button onClick={handleClick}> 
     {text}  
    </button>
  )

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L')) // La adición del nuevo elemento al array se logra con el método concat, que no muta el array existente, sino que devuelve una nueva copia del array con el elemento agregado.
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />      
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <History allClicks= {allClicks}/>
    </div>
  )
}
export default App