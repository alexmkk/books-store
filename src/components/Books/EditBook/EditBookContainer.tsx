import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchBookByKeyHandler, updateBookHandler } from '../../../store/actions/books'
import { useHistory, useParams } from 'react-router-dom'
import EditBookForm from './EditBookForm'
import Loader from '../../Loader'
import { fetchAuthorsHandler } from '../../../store/actions/authors'
import { Book } from '../../../store/reducers/books'
import { Author } from '../../../store/reducers/authors'
import { AppStateType } from '../../../store/reducers/rootReducer'

type mapStatePropsType = {
  book: Book
  loading: boolean
  authors: Array<Author>
  updateInProgress: boolean
}

type mapDispatchPropsType = {
  fetchBookByKey: (key: string) => void
  updateBook: (data: Book) => void
  fetchAuthors: () => void
}

type PropsType = mapStatePropsType & mapDispatchPropsType

const EditBookContainer: React.FC<PropsType> = ({ book, fetchBookByKey, loading, updateBook, updateInProgress, fetchAuthors, authors }) => {
  type ParamsTypes = {
    key: string
  }
  
  const { key } = useParams<ParamsTypes>(),
        history = useHistory<any>()
        
  useEffect(() => {
    fetchBookByKey(key)
    fetchAuthors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (formData: Book) => {
    updateBook(formData)
  }

  return loading
    ? <Loader />
    : book
      ? <EditBookForm book={book} onSubmit={onSubmit} updateInProgress={updateInProgress} history={history} authors={authors} />
      : <p>Книга не найдена</p>
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
  book: state.book.book,
  loading: state.book.loading,
  authors: state.author.authors,
  updateInProgress: state.book.updateInProgress
})

const mapDispatchToProps = (dispatch: any): mapDispatchPropsType => ({
  fetchBookByKey: key => dispatch(fetchBookByKeyHandler(key)),
  updateBook: data => dispatch(updateBookHandler(data)),
  fetchAuthors: () => dispatch(fetchAuthorsHandler())
})

export default connect<mapStatePropsType, mapDispatchPropsType, any, AppStateType>(mapStateToProps, mapDispatchToProps)(EditBookContainer)