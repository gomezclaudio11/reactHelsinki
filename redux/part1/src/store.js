import { configureStore } from '@reduxjs/toolkit'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: { //combina múltiples reducers en uno solo.
    notes: noteReducer,
    filter: filterReducer
  }
})
/**
 configureStore crea tu store de Redux con buena configuración 
 por defecto.
 Middleware preconfigurado (redux-thunk por defecto).
Herramientas de desarrollo (Redux DevTools activado 
automáticamente).
Comprobación de errores más estricta (como si modificás el 
estado mal).

Al pasarle { notes, filter } como reducers, EL state global 
va a tener esas dos partes.
Cada parte es manejada por su propio reducer (noteReducer, 
filterReducer).
 */

export default store