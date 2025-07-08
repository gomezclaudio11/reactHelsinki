import { useParams } from "react-router-dom"

const Note = ( { notes }) => {
    const id = useParams().id
    const note = notes.find(n => n.id === Number(id))
    return (
        <div> 
            <h2>{note.content}</h2> 
            <div>{note.user}</div> 
            <div>{note.important ? 'important' : ''}</div> 
            </div>
    )
}
/**
 El componente Note recibe todas las notas como props notes, 
 y se puede acceder al parámetro URL (el id de la nota que 
 se mostrará) con la función useParams de React Router.
 */
export default Note