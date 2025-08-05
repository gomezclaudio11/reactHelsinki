//trabajando con Apollo Server 4, creando una API GraphQL para 
// gestionar personas.

const { ApolloServer } = require('@apollo/server') //servidor principal de GraphQl
const { startStandaloneServer } = require('@apollo/server/standalone') // metodo para levantar el servidor de forma simple sin Express
const gql = require('graphql-tag') //permite definir esquemas de graphQL usando temple strings
const { v1: uuid } = require('uuid') //genera ID unicos
const { GraphQLError } = require ("graphql") //permite lanzar errores personalizados

//lista de memoria de personas
let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

//Esquemas, define como luce tu API GraphQL
const typeDefs = gql`
  type Address {  
    street: String!  
    city: String! 
    }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }
  
  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons (phone: YesNo) : [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
  addPerson(
    name: String!
    phone: String
    street: String!
    city: String!
  ): Person
  editNumber(
    name: String!
    phone: String!
    ): Person
}
`
// resolver especifica como responder a cada campo o accion
const resolvers = {
  Query: {
    personCount: () => persons.length, 
    allPersons: (root, args) => {
        if(!args.phone) {
            return persons
        }
        const byPhone = (person) => 
            args.phone === "YES" ? person.phone : !person.phone
        return persons.filter(byPhone)
    },
    findPerson: (root, args) =>
      persons.find(p => p.name === args.name)
  },
  //Cuando GraphQL pide el campo address, lo genera a partir
  //de los campos planos street y city.
  Person: {
  address: (root) => {
    return {
        street: root.street,
        city: root.city
        }
    }
  },
  Mutation: {
    addPerson: (root, args) => { // verifica que el name sea unico
      if (persons.find(p => p.name === args.name)) {        
        throw new GraphQLError('Name must be unique', {          
            extensions: {            
                code: 'BAD_USER_INPUT',            
                invalidArgs: args.name          
            }        
        })      
    }
    //crea una persona y lo agrega al array
      const person = { ...args, id: uuid() }
      persons = persons.concat(person)
      return person
    },

    //busca una persona x nombre
    editNumber: (root, args) => {
        const person = persons.find(p => p.name === args.name)
        if(!person) {
            return null
        }
    //si la encuentra crea una copia del nuevo telefono y actualiza el array    
        const updatedPerson = { ...person, phone: args.phone }
        persons = persons.map(p => p.name === args.name ? updatedPerson : p)
        return updatedPerson
    }

}
}
/**
 Así que cada vez que un objeto Person es devuelto, los campos 
 name, phone e id se devuelven utilizando sus resolutores 
 predeterminados, pero el campo address se forma utilizando un 
 resolutor autodefinido. El parámetro root de la función de 
 resolución es el objeto-persona, por lo que la calle y la 
 ciudad de la dirección se pueden tomar de sus campos.
 */

const server = new ApolloServer({
  typeDefs, //contiene el esquema graphql
  resolvers, // contiene los resolutores del servidor, como se responde a las consultas
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})