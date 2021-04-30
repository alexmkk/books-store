import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from '../../UI/Loader'
import { fetchAuthorByKeyHandler } from '../../../store/actions/authors'
import AuthorInfo from './AuthorInfo'
import { AppStateType } from '../../../store/reducers/rootReducer'
import { Author, Book } from '../../../types/types'
import { fetchBooksHandler } from '../../../store/actions/books'

type mapStatePropsType = {
  author: Author
  loading: boolean,
  loadingBooks: boolean,
  books: Array<Book>
}

type mapDispatchPropsType = {
  fetchAuthorByKey: (key: string) => void,
  fetchBooks: (authorKey: string) => void
}

type PropsType = mapStatePropsType & mapDispatchPropsType

const AuthorInfoContainer:React.FC<PropsType> = ({ author, loading, loadingBooks, fetchAuthorByKey, fetchBooks, books }) => {
  type ParamTypes = {
    key: string
  }
  
  const { key } = useParams<ParamTypes>(),
        history = useHistory<any>()

  useEffect(() => {
    if (key !== author.key) {
      fetchBooks(key)
      fetchAuthorByKey(key)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {loading
        ? <Loader />
        : author
          ? <AuthorInfo author={author} history={history} books={books} loadingBooks={loadingBooks} />
          : <p className="text-center">Автор не найден</p>
      }
    </>
  )
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
  author: state.author.author,
  loading: state.author.loading,
  loadingBooks: state.book.loading,
  books: state.book.books
})

const mapDispatchToProps = (dispatch: any): mapDispatchPropsType => ({
  fetchAuthorByKey: (key: string) => dispatch(fetchAuthorByKeyHandler(key)),
  fetchBooks: (authorKey: string) => dispatch(fetchBooksHandler(authorKey)),
})

export default connect<mapStatePropsType, mapDispatchPropsType, any, AppStateType>(mapStateToProps, mapDispatchToProps)(AuthorInfoContainer)