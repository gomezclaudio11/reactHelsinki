import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = () => {
  const dispatch = useDispatch()
//te permite enviar acciones al store de Redux. y actualiza el estado
  return (
    <div>
      all    
      <input 
        type="radio" 
        name="filter" 
        onChange={() => dispatch(filterChange('ALL'))}
      />
      important   
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('IMPORTANT'))}
      />
      nonimportant 
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('NONIMPORTANT'))}
      />
    </div>
  )
}
/**
Cada input:
    Tiene el mismo name ("filter") → Se comportan como 
    botones de radio.
    Al hacer clic, dispara una acción con dispatch
    (filterChange('...')).
 */

export default VisibilityFilter