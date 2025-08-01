import axios from 'axios'


const baseUrl = 'http://localhost:3001/api/notes'

export const getNotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createNote = newNote =>  
    axios.post(baseUrl, newNote).then(res => res.data)

export const updateNote = updatedNote =>
  axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote).then(res => res.data)