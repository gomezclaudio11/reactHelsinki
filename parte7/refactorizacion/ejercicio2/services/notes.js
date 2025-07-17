import axios from "axios"
const baseUrl = "http://localhost:3001/notes"

const getAll = () => axios.get(baseUrl).then(res => res.data)

const create = (newNote) => {
  return axios.post(baseUrl, newNote).then(res => res.data)
}

export default { getAll, create }
