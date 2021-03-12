import React from 'react'
import AddAuthorForm from './AddAuthorForm'
import { addAuthorHandler } from '../../../store/actions/authors'
import { connect } from 'react-redux'

const AddAuthorContainer = ({addAuthor, addInProgress}) => {
  const onSubmit = formData => {
    addAuthor(formData)
  }

  return <AddAuthorForm onSubmit={onSubmit} addInProgress={addInProgress} />
}

const mapStateToProps = state => ({
  addInProgress: state.author.addInProgress
})

const mapDispatchToProps = dispatch => ({
  addAuthor: author => dispatch(addAuthorHandler(author))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddAuthorContainer)