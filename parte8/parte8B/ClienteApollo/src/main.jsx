import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { 
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache
 } from '@apollo/client'

//este código que es el punto de entrada de una app React que 
// usa Apollo Client para trabajar con un backend GraphQL.

//creaR EL CLIENTE APOLLO
const client = new ApolloClient({
  cache: new InMemoryCache(),//sistema de caché en memoria que usa Apollo para guardar datos de forma eficiente.
  link: new HttpLink({ //define la URL del backend GraphQL.
    uri: 'http://localhost:4000',
  })
})


const root = ReactDOM.createRoot( document.getElementById('root'))
 root.render( 
  <ApolloProvider client={client}>
    <App /> 
  </ApolloProvider>,
 )