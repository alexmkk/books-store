import React from 'react'
import AddAuthorForm from './AddAuthorForm'
import { addAuthorHandler } from '../../../store/actions/authors'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'

const AddAuthorContainer = ({ addAuthor, addInProgress }) => {
  const history = useHistory()

  const onSubmit = formData => {
    addAuthor(formData)
  }

  return <AddAuthorForm onSubmit={onSubmit} addInProgress={addInProgress} history={history} />
}

const mapStateToProps = state => ({
  addInProgress: state.author.addInProgress
})

const mapDispatchToProps = dispatch => ({
  addAuthor: author => dispatch(addAuthorHandler(author))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddAuthorContainer)