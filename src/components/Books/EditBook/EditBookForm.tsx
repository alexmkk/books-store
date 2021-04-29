import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { connect } from 'react-redux'
import { AppStateType } from '../../../store/reducers/rootReducer'
import { Book, Author } from '../../../types/types'

type ownPropsType = {
  book: Book
  updateInProgress: boolean
  history: any
  authors: Array<Author>
}

const EditBookForm: React.FC<InjectedFormProps<Book, ownPropsType> & ownPropsType> = ({ handleSubmit, book, updateInProgress, history, authors }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h1>Редактировать книгу <strong>{book.title}</strong></h1>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Название</label>
        <Field
          component="input"
          type="text"
          className="form-control"
          id="title"
          name="title"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Первая публикация</label>
        <Field
          component="input"
          type="number"
          className="form-control"
          id="year"
          name="year"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">URL обложки</label>
        <Field
          component="input"
          type="text"
          className="form-control"
          id="image"
          name="image"
        />
      </div>
      <div className="mb-3">
        <Field
          name="author_id"
          id="author_id"
          component="select"
          className="form-control"
          required
        >
          {authors.map(author => {
            return <option
              key={author.key}
              value={author.key}
            >{author.last_name} {author.first_name}</option>
          })}
        </Field>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Описание</label>
        <Field
          name="description"
          id="description"
          component="textarea"
          className="form-control"
          rows="7"
        />
      </div>
      <Field
        component="input"
        type="hidden"
        className="form-control"
        id="key"
        name="key"
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={updateInProgress}
      >Сохранить</button>
      <button className='btn btn-secondary ml-3' onClick={() => history.push('/books')}>Назад</button>
    </form>
  )
}

export default connect((state: AppStateType) => ({
  initialValues: {
    title: state.book.book.title,
    year: state.book.book.year,
    author_id: state.book.book.author_id,
    image: state.book.book.image,
    key: state.book.book.key,
    description: state.book.book.description
  }
}))(reduxForm<Book, ownPropsType>({ form: 'editBook' })(EditBookForm))