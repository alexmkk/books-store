import axios from 'axios'

export default axios.create({
  baseURL: 'https://store-books-default-rtdb.firebaseio.com'
})