import React, { useEffect } from 'react'
import AddBookForm from './AddBookForm'
import { addBookHandler } from '../../../store/actions/books'
import { connect } from 'react-redux'
import { fetchAuthorsHandler } from '../../../store/actions/authors'

const AddBookContainer = ({addBookHandlerCreator, fetchAuthors, authors, addInProgress}) => {
  useEffect(() => {
    fetchAuthors()
  }, [])

  const onSubmit = formData => {
    addBookHandlerCreator(formData)
  }

  return <AddBookForm onSubmit={onSubmit} authors={authors} addInProgress={addInProgress} />
}

const mapStateToProps = state => ({
  authors: state.author.authors,
  addInProgress: state.book.addInProgress
})

const mapDispatchToProps = dispatch => ({
  addBookHandlerCreator: book => dispatch(addBookHandler(book)),
  fetchAuthors: () => dispatch(fetchAuthorsHandler())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddBookContainer)