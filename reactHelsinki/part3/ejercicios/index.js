const express = require ("express")

const app = express()
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    personsLarge = persons.length 
    const date = new Date()
    const htmlResponse = `
        <p>Phonebook has info for ${personsLarge} people </p>
        <p>${date}</p>
        `
    response.send(htmlResponse)
})

app.get ("/api/persons/:id", (request, response) => {
    const personId = Number(request.params.id)
    const person = persons.find(person => person.id === personId)

    if(person){
        response.json(person)
    } else {
        response.status(400).end()
    }

})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.filter(person=> person.id !== id)

    response.status(204).end()
})

app.post("/api/persons/", (request, response) =>{
    const body = request.body

    if(!body.name){
        return response.status(400).json({error: "falta el contenido"})
    }

    const newPerson = {
        id: Math.floor( Math.random () * 1000),
        name: body.name,
        number: body.number
    }

    persons.push(newPerson)

    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT)
console.log(`server running in ${PORT}`);

