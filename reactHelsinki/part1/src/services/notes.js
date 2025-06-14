import axios from 'axios'
const baseUrl = "/api/notes" //"https://reacthelsinki-2.onrender.com/api/notes"
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  console.log('Token usado en create:', token)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
  setToken
}