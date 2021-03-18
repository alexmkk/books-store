import { fetchAuthorByKeyHandler, fetchAuthorsHandler } from './authors'
import { booksAPI } from '../../api/api'
import { Book } from '../reducers/books'
import { ThunkAction } from 'redux-thunk'
import { InferActionsTypes, AppStateType } from '../reducers/rootReducer'

type UpdateBookType = {
  key: string
  title: string
  year: number
  author_id: string
  image: string | ''
}

export const actions = {
  fetchBooksSuccess: (books: Array<Book>) => ({ type: 'FETCH_BOOKS_SUCCESS', books } as const),
  fetchBooksStart: () => ({ type: 'FETCH_BOOKS_IN_PROGRESS' } as const),
  fetchBookSuccess: (book: Book) => ({ type: 'FETCH_BOOK_SUCCESS', book } as const),
  updateInProgress: () => ({ type: 'UPDATE_BOOK_IN_PROGRESS' } as const),
  updateBookSucess: (data: UpdateBookType) => ({ type: 'UPDATE_BOOK_SUCCESS', data } as const),
  addBookInProgress: () => ({ type: 'ADD_BOOK_IN_PROGRESS' } as const),
  addBookSucess: () => ({ type: 'ADD_BOOK_SUCCESS' } as const),
  removeBookSuccess: (key: string) => ({ type: 'REMOVE_BOOK_SUCCESS', key } as const),
  removeInProgress: (key: string) => ({ type: 'REMOVE_IN_PROGRESS', key } as const)
}

export type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const fetchBooksHandler = (): ThunkType => {
  return async (dispatch: any) => {
    dispatch(fetchAuthorsHandler())
    dispatch(actions.fetchBooksStart())
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
      dispatch(actions.fetchBooksSuccess(books))
    } catch (e) {
      console.log(e)
    }
  }
}

export const fetchBookByKeyHandler = (key: string): ThunkType => {
  return async (dispatch: any) => {
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
  return async (dispatch: any) => {
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

export const updateBookHandler = (data: UpdateBookType): ThunkType => {
  const { key, title, year, author_id, image } = data
  return async (dispatch: any) => {
    dispatch(actions.updateInProgress())
    try {
      await booksAPI.updateBook(key, {title, year, author_id, image})
      dispatch(actions.updateBookSucess(data))
      window.history.go(-1)
    } catch (e) {
      console.log(e)
    }
  }
}

export const removeBookHandler = (key: string): ThunkType => {
  return async (dispatch: any) => {
    dispatch(actions.removeInProgress(key))
    try {
      await booksAPI.removeBook(key)
      dispatch(actions.removeBookSuccess(key))
    } catch (e) {
      console.log(e)
    }
  }
}