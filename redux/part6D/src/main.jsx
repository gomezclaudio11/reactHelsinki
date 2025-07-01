import React from 'react'
import ReactDOM from 'react-dom/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'


const queryClient = new QueryClient() // instancia que maneja cache, configuraciones, etc.

ReactDOM.createRoot(document.getElementById('root')).render(

//un Provider que hace que toda tu app tenga acceso a React Query.
  <QueryClientProvider client={queryClient}>
    <App />

  </QueryClientProvider>
)

/**
 React Query
TanStack Query
Es una librería que maneja la capa de datos asíncrona 
(fetch, cache, sincronización y actualización de datos) 
en apps React, de forma mucho más eficiente y simple que 
usar solo useEffect + useState.
 */