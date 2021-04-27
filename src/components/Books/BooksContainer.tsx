import React, { useEffect } from 'react'
import Books from './Books'
import Loader from '../UI/Loader'
import { connect } from 'react-redux'
import { fetchBooksHandler, removeBookHandler } from '../../store/actions/books'
import { NavLink } from 'react-router-dom'

import { AppStateType } from '../../store/reducers/rootReducer'
import { Book, Author } from '../../types/types'

type mapStatePropsType = {
  books: Array<Book>
  authors: Array<Author>
  loading: boolean
  removeInProgress: Array<string>
}

type mapDispatchPropsType = {
  fetchBooks: () => void
  removeBook: (key: string) => void
}

type PropsType = mapStatePropsType & mapDispatchPropsType

const BooksContainer: React.FC<PropsType> = ({ loading, books, fetchBooks, removeBook, removeInProgress, authors }) => {
  useEffect(() => {
    fetchBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onRemove = (key: string) => {
    removeBook(key)
  }
  return (
    <>
      <h1>Книги</h1>
      {loading
        ? <Loader />
        : books.length > 0
          ? <Books books={books} onRemove={onRemove} removeInProgress={removeInProgress} authors={authors} />
          : <p>Книги не найдены</p>
      }
      <NavLink to="/books/add" exact className="nav-link">
        <button
          type="button"
          className="btn btn-success"
        >Добавить книгу</button>
      </NavLink>
    </>
  )
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
  books: state.book.books,
  authors: state.author.authors,
  loading: state.book.loading,
  removeInProgress: state.book.removeInProgress
})

const mapDispatchToProps = (dispatch: any): mapDispatchPropsType => ({
  fetchBooks: () => dispatch(fetchBooksHandler()),
  removeBook: key => dispatch(removeBookHandler(key))
})

export default connect<mapStatePropsType, mapDispatchPropsType, any, AppStateType>(mapStateToProps, mapDispatchToProps)(BooksContainer)