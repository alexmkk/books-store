import {
  FETCH_AUTHOR_SUCCESS,
  FETCH_AUTHORS_IN_PROGRESS,
  FETCH_AUTHORS_SUCCESS,
  ADD_AUTHOR_IN_PROGRESS,
  ADD_AUTHOR_SUCCESS,
  UPDATE_AUTHOR_IN_PROGRESS,
  UPDATE_AUTHOR_SUCCESS,
  REMOVE_IN_PROGRESS_AUTHORS,
  REMOVE_AUTHOR_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  authors: [],
  loading: false,
  author: {},
  addInProgress: false,
  updateInProgress: false,
  removeInProgress: []
}

export default function authorsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_AUTHORS_IN_PROGRESS:
      return {
        ...state, author: [], loading: true
      }
    case FETCH_AUTHORS_SUCCESS:
      return {
        ...state, loading: false, authors: action.authors
      }
    case FETCH_AUTHOR_SUCCESS:
      return {
        ...state, loading: false, author: action.author
      }
    case ADD_AUTHOR_IN_PROGRESS: {
      return { ...state, addInProgress: true }
    }
    case ADD_AUTHOR_SUCCESS:
      return { ...state, addInProgress: false }
    case UPDATE_AUTHOR_IN_PROGRESS:
      return {
        ...state, updateInProgress: true
      }
    case UPDATE_AUTHOR_SUCCESS:
      return {
        ...state,
        updateInProgress: false,
        authors: state.authors.map(author => {
          if (author.key === action.data.key) {
            return {
              ...author,
              first_name: action.data.first_name,
              last_name: action.data.last_name
            }
          }
          return author
        }),
        author: {
          ...state.author,
          first_name: action.data.first_name,
          last_name: action.data.last_name
        }
      }
    case REMOVE_IN_PROGRESS_AUTHORS:
      return {
        ...state,
        removeInProgress: [
          ...state.removeInProgress,
          action.key
        ]
      }
    case REMOVE_AUTHOR_SUCCESS:
      return {
        ...state,
        authors: state.authors.filter(author => author.key !== action.key),
        removeInProgress: state.removeInProgress.filter(key => key !== action.key)
      }
    default:
      return state
  }
}