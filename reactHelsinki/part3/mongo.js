require("dotenv").config()
 const mongoose = require('mongoose')
 const password = process.env.MONGO_PASSWORD


if (!password) {
  console.log('error not found MONGO_PASSWORD .env')
  process.exit(1)
}

 
const url =
`mongodb+srv://claudiogomez23:${password}@fullstackhelsinki.ks8dnzg.mongodb.net/notesApp?retryWrites=true&w=majority&appName=fullstackHelsinki`
mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

 const note = new Note({
    content: 'PYTHON IS WONDER',
    important: true,
})

 
note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})

/**
Note.find({}).then (result =>{
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
*/