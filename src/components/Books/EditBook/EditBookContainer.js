import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchBookByKeyHandler, updateBookHandler } from '../../../store/actions/books';
import { useParams } from 'react-router-dom';
import EditBookForm from './EditBookForm';
import Loader from '../../Loader';

const EditBookContainer = ({book, fetchBookById, loading, updateBook, updateInProgress}) => {
  let {key} = useParams()
  useEffect(() => {
    fetchBookById(key)
  }, [])
  
  const onSubmit = formData => {
    updateBook(formData)
  }

  return loading 
          ? <Loader />
          : book 
            ? <EditBookForm book={book} onSubmit={onSubmit} updateInProgress={updateInProgress} />
            : <p>Книга не найдена</p>
}

const mapStateToProps = state => ({
  book: state.book.book,
  loading: state.book.loading,
  updateInProgress: state.book.updateInProgress
})

const mapDispatchToProps = dispatch =>  ({
  fetchBookById: id => dispatch(fetchBookByKeyHandler(id)),
  updateBook: data => dispatch(updateBookHandler(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditBookContainer)