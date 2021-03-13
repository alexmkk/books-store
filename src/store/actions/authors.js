import {
  FETCH_AUTHORS_IN_PROGRESS, FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHOR_SUCCESS,
  ADD_AUTHOR_IN_PROGRESS, ADD_AUTHOR_SUCCESS,
  REMOVE_IN_PROGRESS_AUTHORS, REMOVE_AUTHOR_SUCCESS,
  UPDATE_AUTHOR_IN_PROGRESS, UPDATE_AUTHOR_SUCCESS
} from './actionTypes'
import axios from './../../axios/axios'

export const fetchAuthorsStart = () => ({ type: FETCH_AUTHORS_IN_PROGRESS })
export const fetchAuthorsSuccess = authors => ({ type: FETCH_AUTHORS_SUCCESS, authors })
export const fetchAuthorSuccess = author => ({ type: FETCH_AUTHOR_SUCCESS, author })
export const updateInProgress = () => ({ type: UPDATE_AUTHOR_IN_PROGRESS })
export const updateAuthorSucess = data => ({ type: UPDATE_AUTHOR_SUCCESS, data })
export const addAuthorInProgress = () => ({ type: ADD_AUTHOR_IN_PROGRESS })
export const addAuthorSuccess = () => ({ type: ADD_AUTHOR_SUCCESS })
export const removeAuthorSuccess = key => ({ type: REMOVE_AUTHOR_SUCCESS, key })
export const removeInProgress = key => ({ type: REMOVE_IN_PROGRESS_AUTHORS, key })

export const fetchAuthorsHandler = () => {
  return async dispatch => {
    dispatch(fetchAuthorsStart())
    try {
      const response = await axios.get('/authors.json')
      const authors = []
      if (response.data !== null) {
        Object.keys(response.data).forEach(key => {
          authors.push({
            ...response.data[key],
            key
          })
        })
        authors.sort((a, b) => {
          if (a.last_name > b.last_name) return 1
          if (a.last_name < b.last_name) return -1
          return 0
        })
      }
      dispatch(fetchAuthorsSuccess(authors))
    } catch (e) {
      console.log(e)
    }
  }
}

export const fetchAuthorByKeyHandler = key => {
  return async dispatch => {
    dispatch(fetchAuthorsStart())

    try {
      const response = await axios.get(`/authors/${key}.json`)
      const author = response.data
      if (author !== null) {
        author.key = key
      }

      dispatch(fetchAuthorSuccess(author))
    } catch (e) {
      console.log(e)
    }
  }
}


export const addAuthorHandler = author => {
  return async dispatch => {
    dispatch(addAuthorInProgress())
    try {
      await axios.post('/authors.json', author)
      dispatch(addAuthorSuccess())
      window.history.go(-1)
    } catch (e) {
      console.log(e)
    }
  }
}

export const updateAuthorHandler = data => {
  const { key, first_name, last_name } = data
  return async dispatch => {
    dispatch(updateInProgress())
    try {
      await axios.patch(`/authors/${key}.json`, { first_name, last_name })
      dispatch(updateAuthorSucess(data))
      window.history.go(-1)
    } catch (e) {
      console.log(e)
    }
  }
}

export const removeAuthorHandler = key => {
  return async dispatch => {
    dispatch(removeInProgress(key))
    try {
      await axios.delete(`/authors/${key}.json`)
      dispatch(removeAuthorSuccess(key))
    } catch (e) {
      console.log(e)
    }
  }
}