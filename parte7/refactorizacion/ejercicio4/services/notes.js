import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => axios.get(baseUrl).then(res => res.data)

const update = (id, newObject) =>{
    axios.put(`${baseUrl}/{id}`, newObject).then(res =>res.data)
} 

export default { getAll, update }
    