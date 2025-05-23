require("dotenv").config()
const mongoose = require ("mongoose")
const password = process.env.MONGO_PASSWORD

if(!password) {
    console.log("Error falta la variable mongo_password en .env");
    process.exit(1)
}


const url =
`mongodb+srv://claudiogomez23:${password}@fullstackhelsinki.ks8dnzg.mongodb.net/notesApp?retryWrites=true&w=majority&appName=fullstackHelsinki`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const PhoneBook = mongoose.model('PhoneBook', phoneSchema)

if (process.argv.length === 2) {
    // Mostrar todos los contactos
    PhoneBook.find({}).then(result => {
      console.log("phonebook:");
      result.forEach(entry => {
        console.log(`${entry.name} ${entry.number}`);
      });
      mongoose.connection.close();
    });
  } else {
    // Agregar un nuevo contacto
    const nameEnv = process.argv[2];
    const numberEnv = process.argv[3];
  
    const phone = new PhoneBook({
      name: nameEnv,
      number: numberEnv,
    });
  
    phone.save().then(() => {
      console.log(`added ${nameEnv} number ${numberEnv} to phonebook`);
      mongoose.connection.close();
    });
  }