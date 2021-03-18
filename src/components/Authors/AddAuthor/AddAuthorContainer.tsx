import React from 'react'
import AddAuthorForm from './AddAuthorForm'
import { addAuthorHandler } from '../../../store/actions/authors'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { AppStateType } from '../../../store/reducers/rootReducer'
import { Author } from '../../../types/types'

type mapStatePropsType = {
  addInProgress: boolean
}

type mapDispatchPropsType = {
  addAuthor: (author: Author) => void
}

type PropsType = mapStatePropsType & mapDispatchPropsType

const AddAuthorContainer: React.FC<PropsType> = ({ addAuthor, addInProgress }) => {
  const history = useHistory<any>()

  const onSubmit = (formData: Author) => {
    addAuthor(formData)
  }

  return <AddAuthorForm onSubmit={onSubmit} addInProgress={addInProgress} history={history} />
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
  addInProgress: state.author.addInProgress
})

const mapDispatchToProps = (dispatch: any): mapDispatchPropsType => ({
  addAuthor: author => dispatch(addAuthorHandler(author))
})

export default connect<mapStatePropsType, mapDispatchPropsType, any, AppStateType>(mapStateToProps, mapDispatchToProps)(AddAuthorContainer)