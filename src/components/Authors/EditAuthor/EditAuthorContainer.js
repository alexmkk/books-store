import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchAuthorByKeyHandler, updateAuthorHandler } from '../../../store/actions/authors';
import { useHistory, useParams } from 'react-router-dom';
import EditAuthorForm from './EditAuthorForm';
import Loader from '../../Loader';

const EditAuthorContainer = ({ author, fetchAuthorByKey, loading, updateAuthor, updateInProgress }) => {
  let { key } = useParams()
  useEffect(() => {
    fetchAuthorByKey(key)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const history = useHistory()

  const onSubmit = formData => {
    updateAuthor(formData)
  }

  return loading
    ? <Loader />
    : author
      ? <EditAuthorForm author={author} onSubmit={onSubmit} updateInProgress={updateInProgress} history={history} />
      : <p>Автор не найден</p>
}

const mapStateToProps = state => ({
  author: state.author.author,
  loading: state.author.loading,
  updateInProgress: state.author.updateInProgress
})

const mapDispatchToProps = dispatch => ({
  fetchAuthorByKey: key => dispatch(fetchAuthorByKeyHandler(key)),
  updateAuthor: data => dispatch(updateAuthorHandler(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditAuthorContainer)