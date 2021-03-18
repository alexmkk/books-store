import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchAuthorByKeyHandler, updateAuthorHandler } from '../../../store/actions/authors'
import { useHistory, useParams } from 'react-router-dom'
import EditAuthorForm from './EditAuthorForm'
import Loader from '../../Loader'
import { AppStateType } from '../../../store/reducers/rootReducer'
import { Author } from '../../../types/types'

type mapStatePropsType = {
  author: Author
  loading: boolean
  updateInProgress: boolean
}

type mapDispatchPropsType = {
  fetchAuthorByKey: (key: string) => void
  updateAuthor: (data: Author) => void
}

type PropsType = mapStatePropsType & mapDispatchPropsType

const EditAuthorContainer: React.FC<PropsType> = ({ author, fetchAuthorByKey, loading, updateAuthor, updateInProgress }) => {
  type ParamTypes = {
    key: string
  }
  
  const { key } = useParams<ParamTypes>(),
        history = useHistory<any>()

  useEffect(() => {
    fetchAuthorByKey(key)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (formData: Author) => {
    updateAuthor(formData)
  }

  return loading
    ? <Loader />
    : author
      ? <EditAuthorForm author={author} onSubmit={onSubmit} updateInProgress={updateInProgress} history={history} />
      : <p>Автор не найден</p>
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
  author: state.author.author,
  loading: state.author.loading,
  updateInProgress: state.author.updateInProgress
})

const mapDispatchToProps = (dispatch: any): mapDispatchPropsType => ({
  fetchAuthorByKey: (key: string) => dispatch(fetchAuthorByKeyHandler(key)),
  updateAuthor: (data: Author) => dispatch(updateAuthorHandler(data))
})

export default connect<mapStatePropsType, mapDispatchPropsType, any, AppStateType>(mapStateToProps, mapDispatchToProps)(EditAuthorContainer)