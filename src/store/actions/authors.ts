import { AppStateType, InferActionsTypes } from '../reducers/rootReducer'
import { ThunkAction } from 'redux-thunk'
import { Author } from '../../types/types'
import { authorsAPI } from './../../api/authors-api'

export const actions = {
  fetchAuthorsStart: () => ({ type: 'FETCH_AUTHORS_IN_PROGRESS' } as const),
  fetchAuthorsSuccess: (authors: Array<Author>) => ({ type: 'FETCH_AUTHORS_SUCCESS', authors } as const),
  fetchAuthorSuccess: (author: Author) => ({ type: 'FETCH_AUTHOR_SUCCESS', author } as const),
  updateInProgress: () => ({ type: 'UPDATE_AUTHOR_IN_PROGRESS' } as const),
  updateAuthorSucess: (data: Author) => ({ type: 'UPDATE_AUTHOR_SUCCESS', data } as const),
  addAuthorInProgress: () => ({ type: 'ADD_AUTHOR_IN_PROGRESS' } as const),
  addAuthorSuccess: () => ({ type: 'ADD_AUTHOR_SUCCESS' } as const),
  removeAuthorSuccess: (key: string) => ({ type: 'REMOVE_AUTHOR_SUCCESS', key } as const),
  removeInProgress: (key: string) => ({ type: 'REMOVE_IN_PROGRESS_AUTHORS', key } as const)
}

export const fetchAuthorsHandler = (): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.fetchAuthorsStart())
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
      dispatch(actions.fetchAuthorsSuccess(authors))
    } catch (e) {
      console.log(e)
    }
  }
}

export const fetchAuthorByKeyHandler = (key: string): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.fetchAuthorsStart())
    
    try {
      const author = await authorsAPI.getAuthor(key)
      
      if (author !== null) {
        author.key = key
      }

      dispatch(actions.fetchAuthorSuccess(author))
    } catch (e) {
      console.log(e)
    }
  }
}

export const addAuthorHandler = (author: Author): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.addAuthorInProgress())
    try {
      await authorsAPI.addAuthor(author)
      dispatch(actions.addAuthorSuccess())
      window.history.go(-1)
    } catch (e) {
      console.log(e)
    }
  }
}

export const updateAuthorHandler = (data: Author): ThunkType => {
  const { key, first_name, last_name } = data
  return async (dispatch) => {
    dispatch(actions.updateInProgress())
    try {
      await authorsAPI.updateAuthor(key, { key, first_name, last_name })
      dispatch(actions.updateAuthorSucess(data))
      window.history.go(-1)
    } catch (e) {
      console.log(e)
    }
  }
}

export const removeAuthorHandler = (key: string): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.removeInProgress(key))
    try {
      await authorsAPI.removeAuthor(key)
      dispatch(actions.removeAuthorSuccess(key))
    } catch (e) {
      console.log(e)
    }
  }
}

export type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>