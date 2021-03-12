import {FETCH_BOOKS_IN_PROGRESS, FETCH_BOOKS_SUCCESS,
        FETCH_BOOK_SUCCESS,
        ADD_BOOK_IN_PROGRESS,
        REMOVE_IN_PROGRESS, REMOVE_BOOK_SUCCESS,
        UPDATE_BOOK_IN_PROGRESS, UPDATE_BOOK_SUCCESS} 
      from './actionTypes'
import axios from './../../axios/axios'

export const fetchBooksStart = () => ({type: FETCH_BOOKS_IN_PROGRESS})
export const fetchBooksSuccess = books => ({type: FETCH_BOOKS_SUCCESS, books})
export const fetchBookSuccess = book => ({type: FETCH_BOOK_SUCCESS, book})
export const updateInProgress = () => ({type: UPDATE_BOOK_IN_PROGRESS})
export const updateBookSucess = data => ({type: UPDATE_BOOK_SUCCESS, data})
export const addBookInProgress = () => ({type: ADD_BOOK_IN_PROGRESS})
export const removeBookSuccess = key => ({type: REMOVE_BOOK_SUCCESS, key})
export const removeInProgress = key => ({type: REMOVE_IN_PROGRESS, key})

export const fetchBooksHandler = () => {
  return async dispatch => {
    dispatch(fetchBooksStart())
    try {
      const response = await axios.get('/books.json')
      
      const books = []
      
      if (response.data !== null) {
        Object.keys(response.data).forEach(key => {
          books.push({
            ...response.data[key],
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

export const fetchBookByKeyHandler = key => {
  return async dispatch => {
    dispatch(fetchBooksStart())

    try {
      const response = await axios.get(`/books/${key}.json`)
      const book = response.data
      book.key = key
      dispatch(fetchBookSuccess(book))
    } catch (e) {
      console.log(e)
    }
  }
}

export const addBookHandler = book => {
  return async dispatch => {
    dispatch(addBookInProgress())
    const bookModify = {
      ...book,
      createt_at: Date.now(),
      image: "img"
    }
    try {
      await axios.post('/books.json', bookModify)
      window.history.go(-1)
    } catch (e) {
      console.log(e)
    }
  }
}

export const updateBookHandler = data => {
  const {key, title} = data
  return async dispatch => {
    dispatch(updateInProgress())
    try {
      await axios.patch(`/books/${key}.json`, {title})
      dispatch(updateBookSucess(data))
      window.history.go(-1)
    } catch (e) {
      console.log(e)
    }
  }
}

export const removeBookHandler = key => {
  return async dispatch => {
    dispatch(removeInProgress(key))
    try {
      await axios.delete(`/books/${key}.json`)
      dispatch(removeBookSuccess(key))
    } catch (e) {
      console.log(e)
    }
  }
}