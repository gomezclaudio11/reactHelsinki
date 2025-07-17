import React, { useState, useEffect } from 'react' // necesitamos esto también ahora en los archivos de los componentes
import './index.css'
import axios from 'axios'

const useNotes = (url) => {  
  const [notes, setNotes] = useState([])  
  useEffect(() => {    
    axios.get(url).then(response => {      
      setNotes(response.data)    
    })  
  }, 
  [url])  
return notes
}

const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])
  const notes = useNotes(BACKEND_URL)

  const handleClick = () => {    
    setCounter(counter + 1)    
    setValues(values.concat(counter))  
  }

  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick}>
        press
      </button>
      <div>{notes.length} notes on server {BACKEND_URL}</div>
    </div>
  )
 
}

export default App
/**
 Webpack es un empaquetador de módulos para aplicaciones 
 JavaScript modernas. Su tarea principal es tomar todos tus 
 archivos (JS, CSS, imágenes, etc.) y transformarlos en uno 
 o varios archivos finales optimizados, generalmente para 
 producción.
 Tenés un proyecto con:
index.js - App.js - style.css - imágenes - fuentes dependencias (React, Axios, etc.)

Webpack:
    Lee tu archivo de entrada (por ejemplo index.js).
    Sigue todas las importaciones (import, require, etc.).
    Transforma lo necesario (como JSX → JS o SASS → CSS).
    Genera un único archivo final (por ejemplo, bundle.js) 
    que incluye todo.

¿Por qué usar Webpack?
Quiero que mis archivos JS se empaqueten en uno solo	
Quiero usar JSX o ES6+ => Con Babel lo transpila
Quiero importar estilos, imágenes, fuentes => Usa loaders 
para eso
Quiero separar código por rutas (lazy loading) => 
Soporta code splitting
Quiero optimizar el tamaño final => Minifica y elimina 
código no usado (tree-shaking)
    */