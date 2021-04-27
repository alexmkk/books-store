import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { fetchBookByKeyHandler } from '../../../store/actions/books'
import { connect } from 'react-redux'
import Loader from '../../UI/Loader'
import BookInfo from './BookInfo'
import { AppStateType } from '../../../store/reducers/rootReducer'
import { Book, Author } from '../../../types/types'

type mapStatePropsType = {
  book: Book
  author: Author
  loading: boolean
}

type mapDispatchPropsType = {
  fetchBookByKey: (key: string) => void
}

type PropsType = mapStatePropsType & mapDispatchPropsType

const BookInfoContainer: React.FC<PropsType> = ({ book, author, loading, fetchBookByKey }) => {
  type ParamTypes = {
    key: string
  }
  
  const { key } = useParams<ParamTypes>(),
        history = useHistory<any>()
  
  useEffect(() => {
    fetchBookByKey(key)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
  book: state.book.book,
  author: state.author.author,
  loading: state.book.loading
})

const mapDispatchToProps = (dispatch: any): mapDispatchPropsType => ({
  fetchBookByKey: key => dispatch(fetchBookByKeyHandler(key))
})

export default connect<mapStatePropsType, mapDispatchPropsType, any, AppStateType>(mapStateToProps, mapDispatchToProps)(BookInfoContainer)