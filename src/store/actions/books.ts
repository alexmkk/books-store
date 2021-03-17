import {
  FETCH_BOOKS_IN_PROGRESS, FETCH_BOOKS_SUCCESS,
  FETCH_BOOK_SUCCESS,
  ADD_BOOK_IN_PROGRESS, ADD_BOOK_SUCCESS,
  REMOVE_IN_PROGRESS, REMOVE_BOOK_SUCCESS,
  UPDATE_BOOK_IN_PROGRESS, UPDATE_BOOK_SUCCESS
}
  from './actionTypes'

import { fetchAuthorByKeyHandler, fetchAuthorsHandler } from './authors'
import { booksAPI } from '../../api/api'
import { Book } from '../reducers/books'

type UpdateBookType = {
  key: string
  title: string
  year: number
  author_id: string
  image: string | ''
}

type UpdateBookSucessType = {
  type: typeof UPDATE_BOOK_SUCCESS
  data: UpdateBookType
}

export const fetchBooksStart = () => ({ type: FETCH_BOOKS_IN_PROGRESS })
export const fetchBooksSuccess = (books: Array<Book>) => ({ type: FETCH_BOOKS_SUCCESS, books })
export const fetchBookSuccess = (book: Book) => ({ type: FETCH_BOOK_SUCCESS, book })
export const updateInProgress = () => ({ type: UPDATE_BOOK_IN_PROGRESS })
export const updateBookSucess = (data: UpdateBookType): UpdateBookSucessType => ({ type: UPDATE_BOOK_SUCCESS, data })
export const addBookInProgress = () => ({ type: ADD_BOOK_IN_PROGRESS })
export const addBookSucess = () => ({ type: ADD_BOOK_SUCCESS })
export const removeBookSuccess = (key: string) => ({ type: REMOVE_BOOK_SUCCESS, key })
export const removeInProgress = (key: string) => ({ type: REMOVE_IN_PROGRESS, key })

export const fetchBooksHandler = () => {
  return async (dispatch: any) => {
    dispatch(fetchAuthorsHandler())
    dispatch(fetchBooksStart())
    try {
      const data = await booksAPI.getBooks()
      const books: Array<Book> = []

      if (data !== null) {
        Object.keys(data).forEach(key => {
          books.push({
            ...data[key],
            key
          })
        })
      }
      dispatch(fetchBooksSuccess(books))
    } catch (e) {
      console.log(e)
    }
  }
}

export const fetchBookByKeyHandler = (key: string) => {
  return async (dispatch: any) => {
    dispatch(fetchBooksStart())

    try {
      const book = await booksAPI.getBook(key)
      if (book !== null) {
        book.key = key
        dispatch(fetchAuthorByKeyHandler(book.author_id))
      }
      dispatch(fetchBookSuccess(book))
    } catch (e) {
      console.log(e)
    }
  }
}

export const addBookHandler = (book: Book) => {
  return async (dispatch: any) => {
    dispatch(addBookInProgress())
    const bookModify = {
      ...book,
      createt_at: Date.now()
    }
    try {
      await booksAPI.addBook(bookModify)
      dispatch(addBookSucess())
      window.history.go(-1)
    } catch (e) {
      console.log(e)
    }
  }
}

export const updateBookHandler = (data: UpdateBookType) => {
  const { key, title, year, author_id, image } = data
  return async (dispatch: any) => {
    dispatch(updateInProgress())
    try {
      await booksAPI.updateBook(key, {title, year, author_id, image})
      dispatch(updateBookSucess(data))
      window.history.go(-1)
    } catch (e) {
      console.log(e)
    }
  }
}

export const removeBookHandler = (key: string) => {
  return async (dispatch: any) => {
    dispatch(removeInProgress(key))
    try {
      await booksAPI.removeBook(key)
      dispatch(removeBookSuccess(key))
    } catch (e) {
      console.log(e)
    }
  }
}