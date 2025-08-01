const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const gql = require('graphql-tag')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require ("graphql")

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
  Person: {
  address: (root) => {
    return {
        street: root.street,
        city: root.city
        }
    }
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find(p => p.name === args.name)) {        
        throw new GraphQLError('Name must be unique', {          
            extensions: {            
                code: 'BAD_USER_INPUT',            
                invalidArgs: args.name          
            }        
        })      
    }
      const person = { ...args, id: uuid() }
      persons = persons.concat(person)
      return person
    },

    editNumber: (root, args) => {
        const person = persons.find(p => p.name === args.name)
        if(!person) {
            return null
        }

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