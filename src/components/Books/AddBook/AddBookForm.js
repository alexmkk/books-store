import React from 'react'
import { Field, reduxForm } from 'redux-form';

const AddBookForm = ({handleSubmit, authors, addInProgress}) => {
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
        <Field  
          name="author_id"
          id="author_id"
          component="select"
          required
        >
          <option value=''>Выберите автора</option>
          {authors.map(author => {
            return <option key={author.id} value={author.id}>{author.last_name} {author.first_name}</option>
          })}
        </Field>
        </div>
      <button 
        type="submit"
        className="btn btn-primary"
        disabled={addInProgress}
      >Добавить</button>
    </form>
  )
}

export default reduxForm({form: 'addBook'})(AddBookForm)