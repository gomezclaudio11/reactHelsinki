import { useMutation } from "@apollo/client"
import { useState } from "react"
import { EDIT_BIRTHYEAR } from "../queries"
import { useEffect } from "react"

const SetBirthYear = ({ setError, show }) => {
    const [name, setName] = useState("")
    const [born, setBorn] = useState("")

    const [ changeYear, result ] = useMutation(EDIT_BIRTHYEAR)

    const submit = (event) => {
        event.preventDefault()

        changeYear( {
            variables: {
                name,
                setBornTo: Number(born)
            }
        })

        setName("")
        setBorn("")
    }
 useEffect (() => {
    if(result.data && result.data.editAuthor === null) {
        setError("person not found")
    }
  }, [result.data])

  if(!show){
    return null
  }
  
  return(
     <div>
      <h2>Set Birth Year</h2>

      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>change born</button>
      </form>
    </div>
  )
}

export default SetBirthYear