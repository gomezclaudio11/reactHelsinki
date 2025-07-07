import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CounterContextProvider } from './CounterCOntext.jsx'

createRoot(document.getElementById('root')).render(
  <CounterContextProvider>
    <App />
  </CounterContextProvider>,
)
/**
 Todo lo que esté dentro de <App /> podrá acceder al 
 contexto (ej. contador, acciones para incrementarlo, etc.)

usando el Context API de React se puede compartir datos 
entre componentes sin pasar props manualmente.
 */