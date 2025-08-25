//este código que es el punto de entrada de una app React que 
// usa Apollo Client para trabajar con un backend GraphQL.
//con soporte para autenticación y suscripciones en tiempo real

import ReactDOM from 'react-dom/client'
import App from './App'

import { 
  ApolloClient,  //el objeto que maneja todas las requests GraphQL.
  ApolloProvider,  //un provider de React Context que inyecta el cliente Apollo en toda tu app.
  InMemoryCache, //sistema de caché en memoria de Apollo.
  createHttpLink, //  crea un "link" HTTP para comunicarte con el backend.
  split // permite dividir requests entre distintos links (ej: HTTP y WebSocket).
 } from '@apollo/client'
//Sirve para inyectar headers de autorización en cada request (ej: token JWT).
import { setContext } from '@apollo/client/link/context'
//suscripciones websocket
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/',
}))

//middleware de Auth
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  return {
    headers: { //El token se saca de localStorage.
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

//Este es el link normal para queries y mutations vía HTTP.
const httpLink = createHttpLink({ uri: 'http://localhost:4000' })

//Divisor
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
)

//split inspecciona cada operación GraphQL.
//Si es subscription → la manda por wsLink (WebSocket).
//Si es query o mutation → la manda por httpLink + authLink.

//creaR EL CLIENTE APOLLO
const client = new ApolloClient({
  cache: new InMemoryCache(),//sistema de caché en memoria que usa Apollo para guardar datos de forma eficiente.
  link: splitLink //define cómo mandar cada request.
  })

//render de React
const root = ReactDOM.createRoot( document.getElementById('root'))
 root.render( 
  <ApolloProvider client={client}>
    <App /> 
  </ApolloProvider>,
 )
/**
 En resumen
    Configura Apollo Client.
    Soporta HTTP (queries/mutations) y WebSocket (suscripciones).
    Maneja autenticación con JWT desde localStorage.
    Inyecta Apollo en toda la app con ApolloProvider.
    */