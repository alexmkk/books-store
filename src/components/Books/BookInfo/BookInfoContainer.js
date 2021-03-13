import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { fetchBookByKeyHandler } from '../../../store/actions/books'
import { connect } from 'react-redux'
import Loader from '../../Loader'
import BookInfo from './BookInfo'

const BookInfoContainer = ({ book, author, loading, fetchBookByKey }) => {
  let { key } = useParams()
  useEffect(() => {
    fetchBookByKey(key)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const history = useHistory()

  return (
    <>
      {loading
        ? <Loader />
        : book
          ? <BookInfo book={book} author={author} history={history} />
          : <p className="text-center">Книга не найдена</p>
      }
    </>
  )
}

const mapStateToProps = state => ({
  book: state.book.book,
  author: state.author.author,
  loading: state.book.loading
})

const mapDispatchToProps = dispatch => ({
  fetchBookByKey: key => dispatch(fetchBookByKeyHandler(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookInfoContainer)