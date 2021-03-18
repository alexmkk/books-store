import React from 'react'
import { NavLink } from 'react-router-dom'
import { Book, Author } from '../../types/types'


type ownPropsType = {
  books: Array<Book>
  authors: Array<Author>
  onRemove: (key: any) => void
  removeInProgress: Array<string>
}

const Books: React.FC<ownPropsType> = ({ books, authors, onRemove, removeInProgress }) => {
  return (
    <>
      {
        books.map(book => {
          const { title, year, key } = book
          let author = [],
            last_name = '',
            first_name = ''
          if (authors.length > 0) {
            author = authors.filter(author => author.key === book.author_id)
            if (author.length > 0) {
              last_name = author[0].last_name
              first_name = author[0].first_name
            }
          }

          return (
            <tr key={key}>
              <td>{title}</td>
              <td>{last_name}</td>
              <td>{first_name}</td>
              <td>{year}</td>
              <td>
                <NavLink to={`/books/${key}`}>Смотреть</NavLink>
              </td>
              <td>
                <NavLink to={`/books/${key}/edit`}>Редактировать</NavLink>
              </td>
              <td>
                <button
                  onClick={() => onRemove(key)}
                  type="button"
                  className="btn btn-danger"
                  disabled={key ? removeInProgress.indexOf(key) !== -1 : false}
                >Удалить</button>
              </td>
            </tr>
          )
        })
      }
    </>
  )
}

export default Books