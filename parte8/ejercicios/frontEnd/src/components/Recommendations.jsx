import { useState } from "react"

const Recommendations = ({ books, show }) => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  if (!show) {
    return null
  }

  // obtener todos los géneros disponibles sin repetir
  //Aplica un map para obtener todos los géneros.
  //Hace un flat (aplana) el resultado en un solo array.
  //Un Set elimina duplicados automáticamente
  //El Set no es un array, entonces usamos el spread operator (...) para volverlo un array
  const genres = [...new Set(books.flatMap(b => b.genres))]

  // si hay un género seleccionado, filtramos
  const booksToShow = selectedGenre
    ? books.filter(b => b.genres.includes(selectedGenre))
    : books

  return (
    <div>
      <h2>books filtrado x React</h2>

      {selectedGenre && (
        <p>
          filtered by genre: <b>{selectedGenre}</b>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th> 
            <th>genres</th> 
          </tr>
          {booksToShow.map(a => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres ? a.genres.join(", ") : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "1rem" }}>
        {genres.map((g, index) => (
          <button key={`${g}-${index}`} onClick={() => setSelectedGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Recommendations
