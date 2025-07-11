import React from 'react'
import ReactDOM from "react-dom/client"
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
/**
 <Provider> es un componente especial de React Redux que 
 hace disponible el store a todos los componentes de tu 
 aplicación.
 Estoy creando un store con el noteReducer y lo paso a 
 toda mi app para que cualquier componente pueda acceder 
 a ese estado y modificarlo si hace falta.
 */