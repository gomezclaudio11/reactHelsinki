require ("dotenv").config()
const express = require("express")
const Note = require("./models/note")
const app = express()
const  cors = require("cors")

app.use(cors())

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
  }

let notes = [
  { id: 1, 
    content: "HTML is easy", 
    important: true 
  },
  { id: 2, 
    content: "Browser can execute only JavaScript", 
    important: false 
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.use(express.json())
app.use(express.static('dist'))
app.get ("/", (request, response) =>{
    response.send("<h1>Hello world</h1>")
})

app.get("/api/notes", (request, response) => {
    Note.find({}).then((notes) =>{
        response.json(notes)
    })
})

app.get("/api/notes/:id", (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
        } else {
            response.status(404).rnd
        }
        })
        .catch (error => next(error))
})

app.post("/api/notes", (request, response, next) => {
   const body = request.body

   if(!body.content) {
    return response.status(400).json({
        error: "content missing"
    })
   }

   const note = new Note ({
    content:body.content,
    important: Boolean(body.important) || false,
   })

   note.save()
   .then((savedNote) => {
    response.json(savedNote)
   })
   .catch(error => next(error))
})

app.delete("/api/notes/:id", (request, response, next) => {
   Note.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next (error))
})

app.put("api/notes/:id", (request, response, next) => {
    const {content, important} = request.body

    Note.findByIdAndUpdate(
        request.params.id, 
        {content, important},
        {new: true, runValidators: true, context: "query"}
        )
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next (error))
})

const unknowEndpoint = (request, response) => {
    response.status(404).send({error: "unknow endpoint"})
}

app.use(unknowEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
});
