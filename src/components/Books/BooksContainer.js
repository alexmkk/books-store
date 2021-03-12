import React, { useEffect } from 'react'
import Books from './Books'
import Loader from './../Loader/'
import { connect } from 'react-redux'
import { fetchBooksHandler, removeBookHandler } from './../../store/actions/books'
import { NavLink } from 'react-router-dom'
import { fetchAuthorsHandler } from './../../store/actions/authors'

const BooksContainer = ({loading, books, fetchBooks, removeBook, removeInProgress, fetchAuthors, authors}) => {
  useEffect(() => {
    fetchAuthors()
    fetchBooks()
  }, [fetchAuthors, fetchBooks])

  const onDelete = key => {
    removeBook(key)
  }

  return (
    <>
      <h1>Книги</h1>
      <table className="table table-sm">
        <tbody>
          <tr>
            <th>Название</th>
            <th>Фамилия автора</th>
            <th>Имя автора</th>
            <th>Первая публикация</th>
            <th colSpan='3'></th>
          </tr>
          {loading 
            ? <tr><td colSpan='7'><Loader /></td></tr>
            : books 
              ? <Books books={books} onDelete={onDelete} removeInProgress={removeInProgress} authors={authors} />
              : <tr><td colSpan='7'><p>Книги не найдены</p></td></tr>
          }
        </tbody>
      </table>
      <NavLink to="/books/add" exact className="nav-link">
        <button  
          type="button"
          className="btn btn-success"
        >Добавить книгу</button>
      </NavLink>
    </>
  )
}

const mapStateToProps = state => ({
  books: state.book.books,
  authors: state.author.authors,
  loading: state.book.loading,
  removeInProgress: state.book.removeInProgress
})
  
const mapDispatchToProps = dispatch =>  ({
  fetchBooks: () => dispatch(fetchBooksHandler()),
  fetchAuthors: () => dispatch(fetchAuthorsHandler()),
  removeBook: key => dispatch(removeBookHandler(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(BooksContainer)