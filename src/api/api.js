import axios from 'axios'

const instanse = axios.create({
  baseURL: 'https://store-books-default-rtdb.firebaseio.com'
})

export const booksAPI = {
  getBooks() {
    return instanse.get('/books.json')
        .then(response => response.data)
  },
  getBook(key) {
    return instanse.get(`/books/${key}.json`)
        .then(response => response.data)
  },
  addBook(bookModify) {
    return instanse.post('/books.json', bookModify)
  },
  updateBook(key, data) {
    return instanse.patch(`/books/${key}.json`, data)
  },
  removeBook(key) {
    return instanse.delete(`/books/${key}.json`)
  }
}

export const authorsAPI = {
  getAuthors() {
    return instanse.get('/authors.json')
        .then(response => response.data)
  },
  getAuthor(key) {
    return instanse.get(`/authors/${key}.json`)
        .then(response => response.data)
  },
  addAuthor(author) {
    return instanse.post('/authors.json', author)
  },
  updateAuthor(key, data) {
    return instanse.patch(`/authors/${key}.json`, data)
  },
  removeAuthor(key) {
    return instanse.delete(`/authors/${key}.json`)
  }
}

export default instanse