import React, { useEffect } from 'react'
import AddBookForm from './AddBookForm'
import { addBookHandler } from '../../../store/actions/books'
import { connect } from 'react-redux'
import { fetchAuthorsHandler } from '../../../store/actions/authors'
import { useHistory } from 'react-router'
import { AppStateType } from '../../../store/reducers/rootReducer'
import { Author, Book } from '../../../types/types'

type mapStatePropsType = {
  authors: Array<Author>
  addInProgress: boolean
}

type mapDispatchPropsType = {
  addBook: (book: Book) => void
  fetchAuthors: () => void
}

type PropsType = mapStatePropsType & mapDispatchPropsType

const AddBookContainer: React.FC<PropsType> = ({ addBook, fetchAuthors, authors, addInProgress }) => {
  useEffect(() => {
    fetchAuthors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const history = useHistory<any>()

  const onSubmit = (formData: Book) => {
    addBook(formData)
  }

  return <AddBookForm onSubmit={onSubmit} authors={authors} addInProgress={addInProgress} history={history} />
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
  authors: state.author.authors,
  addInProgress: state.book.addInProgress
})

const mapDispatchToProps = (dispatch: any): mapDispatchPropsType => ({
  addBook: book => dispatch(addBookHandler(book)),
  fetchAuthors: () => dispatch(fetchAuthorsHandler())
})

export default connect<mapStatePropsType, mapDispatchPropsType, any, AppStateType>(mapStateToProps, mapDispatchToProps)(AddBookContainer)