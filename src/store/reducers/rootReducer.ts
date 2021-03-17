import {combineReducers} from 'redux'
import booksReducer from './books';
import authorsReducer from './authors';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  book: booksReducer,
  author: authorsReducer,
  form: formReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export default rootReducer