import React from 'react'

const BookInfo = ({book}) => (
  <div className="card text-dark bg-light mb-3 mx-auto" style={{maxWidth: '28rem'}}>
    <div className="card-header">{book.title}</div>
    <div className="card-body">
      <h5 className="card-title">Фамилия и имя автора</h5>
      <p className="card-text">{book.year}</p>
    </div>
  </div>
)

export default BookInfo