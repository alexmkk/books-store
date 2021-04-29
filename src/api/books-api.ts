
import instanse from './api'
import { Book } from '../types/types'

export const booksAPI = {
  getBooks(authorKey?: string) {
    const filter = authorKey ? `?orderBy="author_id"&equalTo="${authorKey}"` : ""
    
    return instanse.get('/books.json' + filter)
        .then(response => response.data)
  },
  getBook(key: string) {
    return instanse.get(`/books/${key}.json`)
        .then(response => response.data)
  },
  addBook(bookModify: Book) {
    return instanse.post('/books.json', bookModify)
  },
  updateBook(key: string, data: Book) {
    return instanse.patch(`/books/${key}.json`, data)
  },
  removeBook(key: string) {
    return instanse.delete(`/books/${key}.json`)
  }
}