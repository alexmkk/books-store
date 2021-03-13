import React, { useEffect } from 'react'
import AddBookForm from './AddBookForm'
import { addBookHandler } from '../../../store/actions/books'
import { connect } from 'react-redux'
import { fetchAuthorsHandler } from '../../../store/actions/authors'
import { useHistory } from 'react-router'

const AddBookContainer = ({ addBook, fetchAuthors, authors, addInProgress }) => {
  useEffect(() => {
    fetchAuthors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const history = useHistory()

  const onSubmit = formData => {
    addBook(formData)
  }

  return <AddBookForm onSubmit={onSubmit} authors={authors} addInProgress={addInProgress} history={history} />
}

const mapStateToProps = state => ({
  authors: state.author.authors,
  addInProgress: state.book.addInProgress
})

const mapDispatchToProps = dispatch => ({
  addBook: book => dispatch(addBookHandler(book)),
  fetchAuthors: () => dispatch(fetchAuthorsHandler())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddBookContainer)