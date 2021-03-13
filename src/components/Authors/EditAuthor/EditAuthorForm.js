import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const EditAuthorForm = ({ handleSubmit, author, updateInProgress, history }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h1>Редактировать автора <strong>{author.last_name} {author.first_name}</strong></h1>
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

export default connect(state => ({
  initialValues: {
    first_name: state.author.author.first_name,
    last_name: state.author.author.last_name,
    key: state.author.author.key
  }
}))(reduxForm({ form: 'editAuthor' })(EditAuthorForm))