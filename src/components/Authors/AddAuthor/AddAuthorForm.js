import React from 'react'
import { Field, reduxForm } from 'redux-form';

const AddAuthorForm = ({handleSubmit, addInProgress}) => {
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
    </form>
  )
}

export default reduxForm({form: 'addAuthor'})(AddAuthorForm)