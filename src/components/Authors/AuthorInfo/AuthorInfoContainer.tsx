import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from '../../Loader'
import { fetchAuthorByKeyHandler } from '../../../store/actions/authors'
import AuthorInfo from './AuthorInfo'
import { AppStateType } from '../../../store/reducers/rootReducer'
import { Author } from '../../../types/types'

type mapStatePropsType = {
  author: Author
  loading: boolean
}

type mapDispatchPropsType = {
  fetchAuthorByKey: (key: string) => void
}

type PropsType = mapStatePropsType & mapDispatchPropsType

const AuthorInfoContainer:React.FC<PropsType> = ({ author, loading, fetchAuthorByKey }) => {
  type ParamTypes = {
    key: string
  }
  
  const { key } = useParams<ParamTypes>(),
        history = useHistory<any>()

  useEffect(() => {
    fetchAuthorByKey(key)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {loading
        ? <Loader />
        : author
          ? <AuthorInfo author={author} history={history} />
          : <p className="text-center">Автор не найден</p>
      }
    </>
  )
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
  author: state.author.author,
  loading: state.author.loading
})

const mapDispatchToProps = (dispatch: any): mapDispatchPropsType => ({
  fetchAuthorByKey: (key: string) => dispatch(fetchAuthorByKeyHandler(key))
})

export default connect<mapStatePropsType, mapDispatchPropsType, any, AppStateType>(mapStateToProps, mapDispatchToProps)(AuthorInfoContainer)