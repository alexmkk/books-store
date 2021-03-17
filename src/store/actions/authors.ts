import {
  FETCH_AUTHORS_IN_PROGRESS, FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHOR_SUCCESS,
  ADD_AUTHOR_IN_PROGRESS, ADD_AUTHOR_SUCCESS,
  REMOVE_IN_PROGRESS_AUTHORS, REMOVE_AUTHOR_SUCCESS,
  UPDATE_AUTHOR_IN_PROGRESS, UPDATE_AUTHOR_SUCCESS
} from './actionTypes'
import { authorsAPI } from '../../api/api'
import { Author } from '../reducers/authors'

type UpdateAuthorSucessType = {
  type: typeof UPDATE_AUTHOR_SUCCESS
  data: Author
}

export const fetchAuthorsStart = () => ({ type: FETCH_AUTHORS_IN_PROGRESS })
export const fetchAuthorsSuccess = (authors: Array<Author>) => ({ type: FETCH_AUTHORS_SUCCESS, authors })
export const fetchAuthorSuccess = (author: Author) => ({ type: FETCH_AUTHOR_SUCCESS, author })
export const updateInProgress = () => ({ type: UPDATE_AUTHOR_IN_PROGRESS })
export const updateAuthorSucess = (data: Author): UpdateAuthorSucessType => ({ type: UPDATE_AUTHOR_SUCCESS, data })
export const addAuthorInProgress = () => ({ type: ADD_AUTHOR_IN_PROGRESS })
export const addAuthorSuccess = () => ({ type: ADD_AUTHOR_SUCCESS })
export const removeAuthorSuccess = (key: string) => ({ type: REMOVE_AUTHOR_SUCCESS, key })
export const removeInProgress = (key: string) => ({ type: REMOVE_IN_PROGRESS_AUTHORS, key })

export const fetchAuthorsHandler = () => {
  return async (dispatch: any) => {
    dispatch(fetchAuthorsStart())
    try {
      const data = await authorsAPI.getAuthors()
      const authors: Array<Author> = []
      if (data !== null) {
        Object.keys(data).forEach(key => {
          authors.push({
            ...data[key],
            key
          })
        })
        authors.sort((a, b) => {
          if (a.last_name && b.last_name) {
            if (a.last_name > b.last_name) return 1
            if (a.last_name < b.last_name) return -1
          }
          return 0
        })
      }
      dispatch(fetchAuthorsSuccess(authors))
    } catch (e) {
      console.log(e)
    }
  }
}

export const fetchAuthorByKeyHandler = (key: string) => {
  return async (dispatch: any) => {
    dispatch(fetchAuthorsStart())

    try {
      const author = await authorsAPI.getAuthor(key)
      
      if (author !== null) {
        author.key = key
      }

      dispatch(fetchAuthorSuccess(author))
    } catch (e) {
      console.log(e)
    }
  }
}

export const addAuthorHandler = (author: Author) => {
  return async (dispatch: any) => {
    dispatch(addAuthorInProgress())
    try {
      await authorsAPI.addAuthor(author)
      dispatch(addAuthorSuccess())
      window.history.go(-1)
    } catch (e) {
      console.log(e)
    }
  }
}

export const updateAuthorHandler = (data: Author) => {
  const { key, first_name, last_name } = data
  return async (dispatch: any) => {
    dispatch(updateInProgress())
    try {
      await authorsAPI.updateAuthor(key, { first_name, last_name })
      dispatch(updateAuthorSucess(data))
      window.history.go(-1)
    } catch (e) {
      console.log(e)
    }
  }
}

export const removeAuthorHandler = (key: string) => {
  return async (dispatch: any) => {
    dispatch(removeInProgress(key))
    try {
      await authorsAPI.removeAuthor(key)
      dispatch(removeAuthorSuccess(key))
    } catch (e) {
      console.log(e)
    }
  }
}