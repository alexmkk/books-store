import axios from 'axios'

const instanse = axios.create({
  baseURL: 'https://store-books-default-rtdb.firebaseio.com'
})

export default instanse