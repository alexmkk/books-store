import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBookByKeyHandler } from '../../../store/actions/books'
import { connect } from 'react-redux'
import Loader from '../../Loader'
import BookInfo from './BookInfo'

const BookInfoContainer = ({book, loading, fetchBookById}) => {
  let {key} = useParams()
  
  useEffect(() => {
    fetchBookById(key)
  }, [])
  
  return (
    <>
      {loading
        ? <Loader />
        : book 
          ? <BookInfo book={book} />
          : <p className="text-center">Книга не найдена</p>
      }
    </>
  )
}

const mapStateToProps = state => ({
  book: state.book.book,
  loading: state.book.loading
})

const mapDispatchToProps = dispatch =>  ({
  fetchBookById: key => dispatch(fetchBookByKeyHandler(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookInfoContainer)