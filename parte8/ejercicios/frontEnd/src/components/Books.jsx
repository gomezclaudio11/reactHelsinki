import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = ({ show}) => {
  const [genre, setGenre] = useState(null)

  const { data, loading } = useQuery(ALL_BOOKS, {
    variables: { genre },
    pollInterval: 2000
  })

  if (loading) return <p>loading</p>

  const books = data.allBooks

  if(!show){
    return null
  }

  return (
    <div>
      <h2>books filtrado x query GraphQl</h2>
     
     <div>
        <button onClick={() => setGenre(null)}>all genres</button>
        <button onClick={() => setGenre("refactoring")}>refactoring</button>
        <button onClick={() => setGenre("patterns")}>patterns</button>
        <button onClick={() => setGenre("classic")}>classic</button>
    </div>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map(a => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(", ")}</td>
            </tr>
          
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books