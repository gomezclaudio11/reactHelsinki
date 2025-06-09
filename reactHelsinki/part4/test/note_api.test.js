const assert = require("node:assert");
const bcrypt = require ("bcrypt")
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper")
const Note = require("../models/note");
const User = require("../models/user")
const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({})  
  await Note.insertMany(helper.initialNotes)
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

/**********TEST DE NOTAS */

describe('NOTES api', () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test('all notes are returned', async () => {
    const notes = await helper.notesInDb()
  
    assert.strictEqual(notes.length, helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const notes = await helper.notesInDb()
  
    const contents = notes.map((r) => r.content)
  
    assert(contents.includes('HTML is easy'))
  })

  test("a valid note can be added", async () => {
    //crear usuario para test
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'testpass' 
    }
    
    await api.post("/api/users").setEncoding(newUser)

    //login del usuario para obtener el token
    const loginResponse = await api
      .post("/api/login")
      .send({ username: newUser.username, password: newUser.password })

    const token = loginResponse.body.token

    const newNote = {
      content: "async/await simplifies making async calls",
      important: true,
    }

//Enviar el POST con token en headers
    await api
      .post("/api/notes")
      .set("authorization", `Bearer ${token}`)
      .send(newNote)
      .expect(201)
      .expect("Content-Type", /application\/json/)
//verificamos que se haya agregado
const notesAtEnd = await helper.notesInDb()
const contents = notesAtEnd.map(r => r.content)
    
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

    assert(contents.includes("async/await simplifies making async calls"))
  })

  test('note without content is not added', async () => {
    const newNote = { important: true }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

    const notesAtEnd = await helper.notesInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
  })

  test("a specific note can be viewed", async () => {
    const notesAtStart = await helper.notesInDb()
  
    const noteToView = notesAtStart[0]
  
    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(resultNote.body.content, noteToView.content)
  })

  test('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]
  
    await api    
      .delete(`/api/notes/${noteToDelete.id}`)    
      .expect(204)
    const notesAtEnd = await helper.notesInDb()
  
    const contents = notesAtEnd.map(r => r.content)
    assert(!contents.includes(noteToDelete.content))
  
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
  })

})

/***test de USUARIOS */

describe('user creation', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})