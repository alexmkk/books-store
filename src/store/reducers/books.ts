import { ActionTypes } from "../actions/books"

export type Book = {
  key: string,
  author_id: string,
  createt_at: number,
  image: string | '',
  title: string,
  year: number
}

const initialState = {
  books: [] as Array<Book>,
  loading: false,
  book: {} as Book,
  addInProgress: false,
  updateInProgress: false,
  removeInProgress: [] as Array<string>
}

export type InitialStateType = typeof initialState

export default function booksReducer(state = initialState, action: ActionTypes): InitialStateType {
  switch (action.type) {
    case 'FETCH_BOOKS_IN_PROGRESS':
      return {
        ...state, loading: true
      }
    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state, loading: false, books: action.books
      }
    case 'FETCH_BOOK_SUCCESS':
      return {
        ...state, loading: false, book: action.book
      }
    case 'ADD_BOOK_IN_PROGRESS': {
      return { ...state, addInProgress: true }
    }
    case 'ADD_BOOK_SUCCESS':
      return { ...state, addInProgress: false }
    case 'UPDATE_BOOK_IN_PROGRESS':
      return {
        ...state, updateInProgress: true
      }
    case 'UPDATE_BOOK_SUCCESS':
      return {
        ...state,
        updateInProgress: false,
        books: state.books.map(book => {
          if (book.key === action.data.key) {
            return { ...book, title: action.data.title }
          }
          return book
        }),
        book: {
          ...state.book,
          title: action.data.title
        }
      }
    case 'REMOVE_IN_PROGRESS':
      return {
        ...state,
        removeInProgress: [
          ...state.removeInProgress,
          action.key
        ]
      }
    case 'REMOVE_BOOK_SUCCESS':
      return {
        ...state,
        books: state.books.filter(book => book.key !== action.key),
        removeInProgress: state.removeInProgress.filter(key => key !== action.key)
      }
    default:
      return state
  }
}