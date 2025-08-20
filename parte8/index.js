//Es el backend completo de una API GraphQL con Apollo Server + 
// MongoDB + JWT.
// resolviendo queries y mutations sobre Person y User.

const { ApolloServer } = require('@apollo/server') //servidor principal de GraphQl
const { startStandaloneServer } = require('@apollo/server/standalone') // metodo para levantar el servidor de forma simple sin Express
const gql = require('graphql-tag') //permite definir esquemas de graphQL usando temple strings
const { v1: uuid } = require('uuid') //genera ID unicos
const { GraphQLError } = require ("graphql") //permite lanzar errores personalizados
const mongoose = require("mongoose") //conexion MongoDB
mongoose.set("strictQuery", false)
//Modelos mongoose
const Person = require("./models/person")
const User = require("./models/user")
const jwt = require('jsonwebtoken') //generar y verificar tokens

require("dotenv").config() //para variables .env

const MONGODB_URI = process.env.MONGODB_URI

console.log("connecting to", MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("connecteed to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB", error.message);
  })

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

//Esquemas, definivcion del esquema GraphQL
const typeDefs = gql`
  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }
  
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
    me: User
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

    createUser(
      username: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token  
    
    addAsFriend(
      name: String!
    ): User
}
`
// resolvers (implementación de las queries y mutations)
//args viene de los argumentos que el cliente manda en la 
// query/mutation, y GraphQL automáticamente los mete en ese 
// objeto para su uso.
const resolvers = {
  Query: {
    personCount: () => async () => Person.collection.countDocuments(), 
    allPersons:  async (root, args) => {
      // filters missing
      if (!args.phone) {
        return Person.find({})
      }
      return Person.find({ phone: {
        $exists: args.phone === "YES"
      }})
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
//me: devuelve el usuario actual que está logueado (gracias al 
//context). 
//context es un objeto compartido entre resolvers.
//Se llena al inicio de cada request (ej. con el usuario autenticado).
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  //Cuando GraphQL pide el campo address, lo genera a partir
  //de los campos planos street y city.
  Person: {
  address: ({ street, city }) => {
    return {
        street,
        city
        }
    }
  },
  Mutation: {
    addPerson:  async (root, args, context) => {
      const person = new Person({ ...args })
      const currentUser = context.currentUser
//Solo permite agregar personas si el usuario está logueado 
      if(!currentUser){
           throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
//Guarda la persona y la agrega a la lista de amigos del usuario.
      try {
        await person.save()  
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (error) {
        throw new GraphQLError("saving user Failed", {
          extensions: {
             code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return person
    },

    //busca una persona x nombre
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      person.phone = args.phone
         try {
        await person.save()
      } catch (error) {
        throw new GraphQLError('Editing number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      return person
    },
    //crea un nuevo usuario
    createUser: async (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      //Busca el usuario.
      const user = await User.findOne({ username: args.username })
      //Si la password es correcta ("secret" fija), genera un token JWT.
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })        
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      //Devuelve { value: token }.
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
//Agrega una persona a la lista de amigos del usuario actual, si todavía no lo es.
    addAsFriend: async (root, args, { currentUser }) => {
      const nonFriendAlready = (person) => 
        !currentUser.friends.map(f => f._id.toString()).includes(person._id.toString())
  
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        }) 
      }
  
      const person = await Person.findOne({ name: args.name })
      if ( nonFriendAlready(person) ) {
        currentUser.friends = currentUser.friends.concat(person)
      }
  
      await currentUser.save()
  
      return currentUser
    }, 
}
}

const server = new ApolloServer({
  typeDefs, //contiene el esquema graphql
  resolvers, // contiene los resolutores del servidor, como se responde a las consultas
})

// Cada request revisa el Authorization header.
// Si hay un token válido → mete currentUser en el context.
// Ese context se pasa a todos los resolvers.

startStandaloneServer(server, {
  listen: { port: 4000 },
   context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})