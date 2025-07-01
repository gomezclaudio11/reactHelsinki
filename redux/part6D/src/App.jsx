import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  
  const newNoteMutation = useMutation({ 
    mutationFn: createNote,
    onSuccess:(newNote) => {
      const notes = queryClient.getQueriesData(["notes"])
      queryClient.setQueriesData(["notes"], notes.concat(newNote))
    }
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true})
  }
    const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries('notes')
    },
  })

  const toggleImportance = (note) => {
    updateNoteMutation.mutate( {...note, important: !note.important })
  }

  const result = useQuery({    
    queryKey: ['notes'],    
    queryFn: getNotes,
    refetchOnWindowFocus: false  
  })  
  console.log(JSON.parse(JSON.stringify(result)))
  if ( result.isLoading ) {    
    return <div>loading data...</div>  
  }
  const notes = result.data

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App
/**
 
React Query es una librería de estado del servidor, 
responsable de la gestión de operaciones asíncronas entre
 el servidor y el cliente

Redux, etc. son librerías de estado del cliente que se 
pueden usar para almacenar datos asíncronos, aunque de 
manera menos eficiente cuando se comparan con una 
herramienta como React Query

Entonces, React Query es una librería que mantiene el 
estado del servidor en el frontend, es decir, actúa como 
una caché para lo que se almacena en el servidor. 
React Query simplifica el procesamiento de datos en el 
servidor y, en algunos casos, puede eliminar la necesidad 
de que los datos en el servidor se guarden en el estado 
del frontend.

La mayoría de las aplicaciones de React no necesitan solo 
una forma de almacenar temporalmente los datos servidos, 
sino también alguna solución para cómo se maneja el resto 
del estado del frontend (por ejemplo, el estado de los 
formularios o las notificaciones).
 */