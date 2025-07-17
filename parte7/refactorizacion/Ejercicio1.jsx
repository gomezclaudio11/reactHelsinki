/**original */
/*
const App = () => {
  const [count, setCount] = useState(0)

  const handleIncrease = () => {
    setCount(count + 1)
  }

  const handleDoubleIncrease = () => {
    setCount(count + 2)
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleIncrease}>+1</button>
      <button onClick={handleDoubleIncrease}>+2</button>
    </div>
  )
}
*/
/**REFACTORIZADO */
const App = () => {
  const [count, setCount] = useState(0)

  const handleClick = (amount) => {
    setCount(count + amount)
  }

  return(
    <div>
      <p>{count}</p>
      <button onClick={() => handleClick(1)}>+1</button>
      <button onClick={() => handleClick(2)}>+2</button>
      <button onClick={() => handleClick(5)}>+5</button>
    </div>
  )
}