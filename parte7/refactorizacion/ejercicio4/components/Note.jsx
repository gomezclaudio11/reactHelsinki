const Note = ({ note, onToggle }) => {
    return (
        <li>
            {note.content}
            <strong> {note.important ? 'important' : 'not important'} </strong>
      <button onClick={() => onToggle(note.id)}>toggle</button>
        </li>
    )
}

export default Note