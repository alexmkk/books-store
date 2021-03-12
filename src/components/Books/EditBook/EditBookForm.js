import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const EditBookForm = ({handleSubmit, book, updateInProgress}) => {
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
        <Field  
          component="input"
          type="hidden"
          className="form-control"
          id="key"
          name="key"
        />
      </div>
      
      <button 
        type="submit"
        className="btn btn-primary"
        disabled={updateInProgress}
      >Сохранить</button>
    </form>
  )
}

export default connect((state, book) => ({ 
  initialValues: {
    title: book.book.title,
    key: book.book.key
  } 
}))(reduxForm({form: 'editBook'})(EditBookForm))