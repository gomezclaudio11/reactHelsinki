require('dotenv').config()
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const bcrypt = require('bcrypt')

const MONGODB_URI = process.env.MONGODB_URI

mongoose.set("strictQuery", false)
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

const authorsData = [
  { name: 'Robert Martin', born: 1952 },
  { name: 'Martin Fowler', born: 1963 },
  { name: 'Fyodor Dostoevsky', born: 1821 },
  { name: 'Joshua Kerievsky' },
  { name: 'Sandi Metz' }
]

const booksData = [
  { title: 'Clean Code', published: 2008, authorName: 'Robert Martin', genres: ['refactoring'] },
  { title: 'Agile software development', published: 2002, authorName: 'Robert Martin', genres: ['agile','patterns','design'] },
  { title: 'Refactoring, edition 2', published: 2018, authorName: 'Martin Fowler', genres: ['refactoring'] },
  { title: 'Refactoring to patterns', published: 2008, authorName: 'Joshua Kerievsky', genres: ['refactoring','patterns'] },
  { title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby', published: 2012, authorName: 'Sandi Metz', genres: ['refactoring','design'] },
  { title: 'Crime and punishment', published: 1866, authorName: 'Fyodor Dostoevsky', genres: ['classic','crime'] },
  { title: 'Demons', published: 1872, authorName: 'Fyodor Dostoevsky', genres: ['classic','revolution'] }
]

const seedDB = async () => {
  // Limpiar colecciones
  await Author.deleteMany({})
  await Book.deleteMany({})
  await User.deleteMany({})

  // Crear autores
  const authors = {}
  for (const a of authorsData) {
    const author = new Author(a)
    await author.save()
    authors[a.name] = author
  }

  // Crear libros
  for (const b of booksData) {
    const book = new Book({
      title: b.title,
      published: b.published,
      genres: b.genres,
      author: authors[b.authorName]._id
    })
    await book.save()
  }

  // Crear usuario de prueba
  const passwordHash = await bcrypt.hash('secret', 10)
  const testUser = new User({
    username: 'testuser',
    favoriteGenre: 'refactoring',
    passwordHash
  })
  await testUser.save()

  console.log('Database seeded successfully with authors, books, and a test user!')
  mongoose.connection.close()
}

seedDB()
