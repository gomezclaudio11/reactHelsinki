import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  
  const newNoteMutation = useMutation({ 
    mutationFn: createNote,//hace un POST con Axios.
    onSuccess:(newNote) => { //que hace si el servidor devuelve ok
      const notes = queryClient.getQueriesData(["notes"])
      // obtenés la cache actual con getQueriesData, y la actualizás localmente con la nueva nota.
      queryClient.setQueriesData(["notes"], notes.concat(newNote))
    }
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value //extrae texto de la nota
    event.target.note.value = '' // limpia el input
    newNoteMutation.mutate({ content, important: true}) //llama al mutate para hacer el POST
  }

  const updateNoteMutation = useMutation({
    mutationFn: updateNote, //hace un PUT con axios
    onSuccess: () => {
      queryClient.invalidateQueries('notes') //se invalida la query "notes" provocanndo un refresh
    },
  })

  const toggleImportance = (note) => {
    updateNoteMutation.mutate( {...note, important: !note.important })
  } //Al hacer clic en un <li>, se invierte el valor de important y se dispara la mutación
  
  const result = useQuery({    
    queryKey: ['notes'],    
    queryFn: getNotes,
    refetchOnWindowFocus: false  //evita que se vuelva a fetchear si el usuario cambia de pestaña y vuelve.
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
          <strong> {note.important ? 'important' : 'not important'}</strong>
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
/**
 useQuery — para LEER datos
Te permite hacer fetch (por ejemplo, un GET) y tener el 
resultado + estados como isLoading, isError, etc. 

 const { data, isLoading, isError } = useQuery({
  queryKey: ['clave'],         // nombre único de la consulta
  queryFn: () => fetchAlgo()   // la función que hace el GET
})

 */
/**
 useMutation — para CREAR, EDITAR o BORRAR datos
Sirve para hacer acciones que cambian datos en el backend 
(POST, PUT, DELETE), sin asociarse directamente a una 
queryKey.
 */
/**
 .mutate() — ejecuta la acción
Usás .mutate() para disparar la mutación.
Le pasás los datos que querés enviar al mutationFn.
Cuando el backend responde bien, se ejecuta onSuccess.
Si falla, se ejecuta onError.
 */
/**
 onSuccess — lógica después de un OK
Sirve para:
    Actualizar cache
    Navegar a otra página
    Mostrar un mensaje
    Invalidad queries
 */