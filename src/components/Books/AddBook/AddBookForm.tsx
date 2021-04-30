import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { Author, Book } from '../../../types/types'

type ownPropsType = {
  authors: Array<Author>
  addInProgress: boolean
  history: any
}

const AddBookForm: React.FC<InjectedFormProps<Book, ownPropsType> & ownPropsType> = ({ handleSubmit, authors, addInProgress, history }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h1>Новая книга</h1>
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
        <label htmlFor="year" className="form-label">Первая публикация</label>
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
        <label htmlFor="text" className="form-label">URL обложки</label>
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
          <option value=''>Выберите автора</option>
          {authors.map(author => {
            return <option key={author.key} value={`${author.key}`}>{author.last_name} {author.first_name}</option>
          })}
        </Field>
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label">Описание</label>
        <Field
          name="description"
          id="description"
          component="textarea"
          className="form-control"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={addInProgress}
      >Добавить</button>
      <button className='btn btn-secondary ml-3' onClick={() => history.push('/books')}>Назад</button>
    </form>
  )
}

export default reduxForm<Book, ownPropsType>({ form: 'addBook' })(AddBookForm)