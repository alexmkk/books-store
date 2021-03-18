
import instanse from './api'
import { Author } from '../types/types'

export const authorsAPI = {
  getAuthors() {
    return instanse.get('/authors.json')
        .then(response => response.data)
  },
  getAuthor(key: string) {
    return instanse.get(`/authors/${key}.json`)
        .then(response => response.data)
  },
  addAuthor(author: Author) {
    return instanse.post('/authors.json', author)
  },
  updateAuthor(key: string, data: Author) {
    return instanse.patch(`/authors/${key}.json`, data)
  },
  removeAuthor(key: string) {
    return instanse.delete(`/authors/${key}.json`)
  }
}