import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApolloClient, 
        ApolloProvider,   
        createHttpLink, 
        InMemoryCache,
        split } from "@apollo/client"
import { setContext } from '@apollo/client/link/context'
//suscripciones websocket
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
}))

//middleware de Auth
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  return {
    headers: { //El token se saca de localStorage.
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

//Este es el link normal para queries y mutations vía HTTP.
const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' })

//Divisor
//configuráR Apollo Client para que pueda manejar dos tipos de conexiones diferentes:
//HTTP (query y mutation) → lo común, peticiones REST/GraphQL normales.
//WebSocket (subscription) → para datos en tiempo real.
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

//creaR EL CLIENTE APOLLO
const client = new ApolloClient({
  cache: new InMemoryCache(),//sistema de caché en memoria que usa Apollo para guardar datos de forma eficiente.
  link: splitLink //define cómo mandar cada request.
  })

ReactDOM.createRoot( document.getElementById('root')).render( 
  <ApolloProvider client={client}>
    <App /> 
  </ApolloProvider>
 )