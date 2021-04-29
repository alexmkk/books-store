import React from 'react'
import { Author, Book } from '../../../types/types'
import Loader from '../../UI/Loader'
import { NavLink } from 'react-router-dom';

type ownPropsType = {
  author: Author,
  books: Array<Book>,
  history: any
}

const AuthorInfo: React.FC<ownPropsType> = ({ author, history, books }) => {
  return (
    <div>
      <h1>{author.last_name} {author.first_name} <button className='btn btn-secondary' onClick={() => history.push('/authors')}>Назад</button></h1>
      {books.length === 0 ? <Loader/> : null}
      <div className="d-flex justify-content-left flex-wrap pt-3">
        {
          books.map(book => {
            return (
              <div key={book.key} className="card" style={{width: "25%", margin: "10px"}}>
                <img
                  src={book.image || `${process.env.REACT_APP_PUBLIC_URL}/images/noImg.png`}
                  className="card-img-top"
                  alt="Обложка"
                  height="400"
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <button className='btn btn-primary' onClick={() => history.push(`/books/${book.key}`)}>Смотреть</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AuthorInfo