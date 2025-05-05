import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ( {text, value}) => {
  return(
    <p> {text}: {value} </p>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodOpinion = () => {
    setGood(good + 1)
  }

  const neutralOpinion = () => {
    setNeutral (neutral + 1)
  }

  const badOpinion = () => {
    setBad (bad + 1)
  }

  const total = good + bad + neutral

  const average = total === 0 ? 0 : (good - bad) / total

  const positive = total === 0 ? 0 : (good / total) * 100

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodOpinion} text="good"/>
      <Button handleClick={neutralOpinion} text="neutral"/>
      <Button handleClick={badOpinion} text="bad"/>
      <h2>statistics</h2>
      { total === 0 ? (
        <p> No feedback given</p>
      ) : (
      <div>
      <StatisticsLine text="good" value = {good}/>
      <StatisticsLine text="neutral" value = {neutral}/>
      <StatisticsLine text="bad" value = {bad}/>
      <StatisticsLine text="all" value = {total}/>
      <StatisticsLine text="average" value = {average.toFixed(1)}/>
      <StatisticsLine text="positive" value = {positive.toFixed(1) + "%"}/>
      </div>
    )}  
  </div>
  )
}

export default App