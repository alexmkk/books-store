import React from 'react'
import { Book, Author } from '../../../types/types'

type ownPropsType = {
  book: Book
  author: Author
  history: any
}

const BookInfo: React.FC<ownPropsType> = ({ book, author, history }) => {
  let first_name = '', last_name = ''
  if (author && Object.keys(author).length !== 0) {
    first_name = author.first_name
    last_name = author.last_name
  }

  return (
    <div className="card text-dark bg-light mb-3 mx-auto" style={{ maxWidth: '18rem' }}>
      <img className="card-img-top" src={book.image || `${process.env.REACT_APP_PUBLIC_URL}/images/noImg.png`} alt="Обложка книги" />
      <div className="card-body">
        <h2 className="card-title">{book.title}</h2>
        <h5>{`${first_name} ${last_name}`}</h5>
        <p className="card-text">{book.year}</p>
      </div>
      <button className='btn btn-secondary' onClick={() => history.push('/books')}>Назад</button>
    </div>
  )
}

export default BookInfo