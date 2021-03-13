import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchBookByKeyHandler, updateBookHandler } from '../../../store/actions/books'
import { useHistory, useParams } from 'react-router-dom'
import EditBookForm from './EditBookForm'
import Loader from '../../Loader'
import { fetchAuthorsHandler } from '../../../store/actions/authors'

const EditBookContainer = ({ book, fetchBookByKey, loading, updateBook, updateInProgress, fetchAuthors, authors }) => {
  let { key } = useParams()
  useEffect(() => {
    fetchBookByKey(key)
    fetchAuthors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const history = useHistory()

  const onSubmit = formData => {
    updateBook(formData)
  }

  return loading
    ? <Loader />
    : book
      ? <EditBookForm book={book} onSubmit={onSubmit} updateInProgress={updateInProgress} history={history} authors={authors} />
      : <p>Книга не найдена</p>
}

const mapStateToProps = state => ({
  book: state.book.book,
  loading: state.book.loading,
  authors: state.author.authors,
  updateInProgress: state.book.updateInProgress
})

const mapDispatchToProps = dispatch => ({
  fetchBookByKey: id => dispatch(fetchBookByKeyHandler(id)),
  updateBook: data => dispatch(updateBookHandler(data)),
  fetchAuthors: () => dispatch(fetchAuthorsHandler())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditBookContainer)