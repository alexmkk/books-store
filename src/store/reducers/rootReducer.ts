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

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>

export default rootReducer