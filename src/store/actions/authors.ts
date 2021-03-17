import {
  FETCH_AUTHORS_IN_PROGRESS, FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHOR_SUCCESS,
  ADD_AUTHOR_IN_PROGRESS, ADD_AUTHOR_SUCCESS,
  REMOVE_IN_PROGRESS_AUTHORS, REMOVE_AUTHOR_SUCCESS,
  UPDATE_AUTHOR_IN_PROGRESS, UPDATE_AUTHOR_SUCCESS
} from './actionTypes'
import { authorsAPI } from '../../api/api'
import { Author } from '../reducers/authors'
import { AppStateType } from '../reducers/rootReducer'
import { ThunkAction } from 'redux-thunk'

type FetchAuthorsStartType = {type: typeof FETCH_AUTHORS_IN_PROGRESS}
type FetchAuthorsSuccessType = {
  type: typeof FETCH_AUTHORS_SUCCESS
  authors: Array<Author>
}
type FetchAuthorSuccessType = {
  type: typeof FETCH_AUTHOR_SUCCESS
  author: Author
}
type UpdateInProgressType = {type: typeof UPDATE_AUTHOR_IN_PROGRESS}
type UpdateAuthorSucessType = {
  type: typeof UPDATE_AUTHOR_SUCCESS
  data: Author
}
type AddAuthorInProgressType = {type: typeof ADD_AUTHOR_IN_PROGRESS}
type AddAuthorSuccessType = {type: typeof ADD_AUTHOR_SUCCESS}
type RemoveAuthorSuccessType = {
  type: typeof REMOVE_AUTHOR_SUCCESS
  key: string
}
type RemoveInProgressType = {
  type: typeof REMOVE_IN_PROGRESS_AUTHORS
  key: string
}

export type AuthorsType = FetchAuthorsStartType | FetchAuthorsSuccessType | FetchAuthorSuccessType | UpdateInProgressType | 
          UpdateAuthorSucessType | AddAuthorInProgressType | AddAuthorSuccessType | RemoveAuthorSuccessType | RemoveInProgressType

export const fetchAuthorsStart = (): FetchAuthorsStartType => ({ type: FETCH_AUTHORS_IN_PROGRESS })
export const fetchAuthorsSuccess = (authors: Array<Author>): FetchAuthorsSuccessType => ({ type: FETCH_AUTHORS_SUCCESS, authors })
export const fetchAuthorSuccess = (author: Author): FetchAuthorSuccessType => ({ type: FETCH_AUTHOR_SUCCESS, author })
export const updateInProgress = (): UpdateInProgressType => ({ type: UPDATE_AUTHOR_IN_PROGRESS })
export const updateAuthorSucess = (data: Author): UpdateAuthorSucessType => ({ type: UPDATE_AUTHOR_SUCCESS, data })
export const addAuthorInProgress = (): AddAuthorInProgressType => ({ type: ADD_AUTHOR_IN_PROGRESS })
export const addAuthorSuccess = (): AddAuthorSuccessType => ({ type: ADD_AUTHOR_SUCCESS })
export const removeAuthorSuccess = (key: string): RemoveAuthorSuccessType => ({ type: REMOVE_AUTHOR_SUCCESS, key })
export const removeInProgress = (key: string): RemoveInProgressType => ({ type: REMOVE_IN_PROGRESS_AUTHORS, key })

export const fetchAuthorsHandler = (): ThunkAction<Promise<void>, AppStateType, unknown, AuthorsType> => {
  return async (dispatch) => {
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

export const fetchAuthorByKeyHandler = (key: string): ThunkAction<Promise<void>, AppStateType, unknown, AuthorsType> => {
  return async (dispatch) => {
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

export const addAuthorHandler = (author: Author): ThunkAction<Promise<void>, AppStateType, unknown, AuthorsType> => {
  return async (dispatch) => {
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

export const updateAuthorHandler = (data: Author): ThunkAction<Promise<void>, AppStateType, unknown, AuthorsType> => {
  const { key, first_name, last_name } = data
  return async (dispatch) => {
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

export const removeAuthorHandler = (key: string): ThunkAction<Promise<void>, AppStateType, unknown, AuthorsType> => {
  return async (dispatch) => {
    dispatch(removeInProgress(key))
    try {
      await authorsAPI.removeAuthor(key)
      dispatch(removeAuthorSuccess(key))
    } catch (e) {
      console.log(e)
    }
  }
}