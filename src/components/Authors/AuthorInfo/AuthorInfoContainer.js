import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from '../../Loader'

import { fetchAuthorByKeyHandler } from '../../../store/actions/authors'
import AuthorInfo from './AuthorInfo'

const AuthorInfoContainer = ({ author, loading, fetchAuthorByKey }) => {
  let { key } = useParams()

  useEffect(() => {
    fetchAuthorByKey(key)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const history = useHistory()

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

const mapStateToProps = state => ({
  author: state.author.author,
  loading: state.author.loading
})

const mapDispatchToProps = dispatch => ({
  fetchAuthorByKey: key => dispatch(fetchAuthorByKeyHandler(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthorInfoContainer)