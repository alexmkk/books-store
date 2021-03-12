import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import Loader from '../../Loader';

import { fetchAuthorByKeyHandler } from '../../../store/actions/authors';
import AuthorInfo from './AuthorInfo';

const AuthorInfoContainer = ({author, loading, fetchAuthorByKey}) => {
  let {key} = useParams()
    
  useEffect(() => {
    fetchAuthorByKey(key)
  }, [key])
  
  return (
    <>
      {loading
        ? <Loader />
        : author 
          ? <AuthorInfo author={author} />
          : <p className="text-center">Автор не найден</p>
      }
    </>
  )
}

const mapStateToProps = state => ({
  author: state.author.author,
  loading: state.author.loading
})

const mapDispatchToProps = dispatch =>  ({
  fetchAuthorByKey: key => dispatch(fetchAuthorByKeyHandler(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthorInfoContainer)