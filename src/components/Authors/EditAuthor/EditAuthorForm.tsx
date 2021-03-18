import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { connect } from 'react-redux'
import { AppStateType } from '../../../store/reducers/rootReducer'
import { Author } from '../../../types/types'

type ownPropsType = {
  author: Author | null
  updateInProgress: boolean
  history: any
}

const EditAuthorForm: React.FC<InjectedFormProps<Author, ownPropsType> & ownPropsType> = ({ handleSubmit, author, updateInProgress, history }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h1>Редактировать автора <strong>{author ? author.last_name : null} {author ? author.first_name: null}</strong></h1>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Фамилия</label>
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
      <button className='btn btn-secondary ml-3' onClick={() => history.push('/authors')}>Назад</button>
    </form>
  )
}


export default connect(
  (state: AppStateType) => ({
    initialValues: {
      first_name: state.author.author.first_name,
      last_name: state.author.author.last_name,
      key: state.author.author.key
    }})
)(reduxForm<Author, ownPropsType>({ form: 'editAuthor' })(EditAuthorForm))