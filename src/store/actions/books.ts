import { fetchAuthorByKeyHandler, fetchAuthorsHandler } from './authors'
import { ThunkAction } from 'redux-thunk'
import { InferActionsTypes, AppStateType } from '../reducers/rootReducer'
import { Book } from '../../types/types'
import { booksAPI } from './../../api/books-api'

export const actions = {
  fetchBooksSuccess: (books: Array<Book>) => ({ type: 'FETCH_BOOKS_SUCCESS', books } as const),
  fetchBooksStart: () => ({ type: 'FETCH_BOOKS_IN_PROGRESS' } as const),
  fetchBookSuccess: (book: Book) => ({ type: 'FETCH_BOOK_SUCCESS', book } as const),
  updateInProgress: () => ({ type: 'UPDATE_BOOK_IN_PROGRESS' } as const),
  updateBookSucess: (data: Book) => ({ type: 'UPDATE_BOOK_SUCCESS', data } as const),
  addBookInProgress: () => ({ type: 'ADD_BOOK_IN_PROGRESS' } as const),
  addBookSucess: () => ({ type: 'ADD_BOOK_SUCCESS' } as const),
  removeBookSuccess: (key: string) => ({ type: 'REMOVE_BOOK_SUCCESS', key } as const),
  removeInProgress: (key: string) => ({ type: 'REMOVE_IN_PROGRESS', key } as const)
}

export const fetchBooksHandler = (authorKey?: string): ThunkType => {
  return async dispatch => {
    if (!authorKey) dispatch(fetchAuthorsHandler())
    dispatch(actions.fetchBooksStart())
    
    try {
      const data = await booksAPI.getBooks(authorKey)
      const books: Array<Book> = []

      if (data !== null) {
        Object.keys(data).forEach(key => {
          books.push({
            ...data[key],
            key
          })
        })
      }
      dispatch(actions.fetchBooksSuccess(books))
    } catch (e) {
      console.log(e)
    }
  }
}

export const fetchBookByKeyHandler = (key: string): ThunkType => {
  return async dispatch => {
    dispatch(actions.fetchBooksStart())

    try {
      const book = await booksAPI.getBook(key)
      if (book !== null) {
        book.key = key
        dispatch(fetchAuthorByKeyHandler(book.author_id))
      }
      dispatch(actions.fetchBookSuccess(book))
    } catch (e) {
      console.log(e)
    }
  }
}

export const addBookHandler = (book: Book): ThunkType => {
  return async dispatch => {
    dispatch(actions.addBookInProgress())
    const bookModify = {
      ...book,
      createt_at: Date.now()
    }
    try {
      await booksAPI.addBook(bookModify)
      dispatch(actions.addBookSucess())
      window.history.go(-1)
    } catch (e) {
      console.log(e)
    }
  }
}

export const updateBookHandler = (data: Book): ThunkType => {
  const { key, title, year, author_id, image, description } = data
  return async dispatch => {
    dispatch(actions.updateInProgress())
    try {
      await booksAPI.updateBook(key, {key, title, year, author_id, image, description})
      dispatch(actions.updateBookSucess(data))
      window.history.go(-1)
    } catch (e) {
      console.log(e)
    }
  }
}

export const removeBookHandler = (key: string): ThunkType => {
  return async dispatch => {
    dispatch(actions.removeInProgress(key))
    try {
      await booksAPI.removeBook(key)
      dispatch(actions.removeBookSuccess(key))
    } catch (e) {
      console.log(e)
    }
  }
}

export type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>