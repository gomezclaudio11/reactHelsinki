const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}
//action creator
export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  }
}
/**
 Recibe un state (inicialmente 'ALL') y una acción.
Si la acción es 'SET_FILTER', actualiza el state con 
action.payload.
Si no, devuelve el estado actual.
 */
export default filterReducer