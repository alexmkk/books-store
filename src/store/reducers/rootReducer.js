import {combineReducers} from 'redux'
import booksReducer from './books';
import authorsReducer from './authors';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  book: booksReducer,
  author: authorsReducer,
  form: formReducer
})