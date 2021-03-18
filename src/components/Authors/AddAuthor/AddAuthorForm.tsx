import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { Author } from '../../../types/types'

type ownPropsType = {
  addInProgress: boolean
  history: any
}

const AddAuthorForm: React.FC<InjectedFormProps<Author, ownPropsType> & ownPropsType> = ({ handleSubmit, addInProgress, history }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h1>Новый автор</h1>
      <div className="mb-3">
        <label htmlFor="last_name" className="form-label">Фамилия</label>
        <Field
          component="input"
          type="text"
          className="form-control"
          id="last_name"
          name="last_name"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="first_name" className="form-label">Имя</label>
        <Field
          component="input"
          type="text"
          className="form-control"
          id="first_name"
          name="first_name"
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={addInProgress}
      >Добавить</button>
      <button className='btn btn-secondary ml-3' onClick={() => history.push('/authors')}>Назад</button>
    </form>
  )
}

export default reduxForm<Author, ownPropsType>({ form: 'addAuthor' })(AddAuthorForm)