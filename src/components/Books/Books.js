import React from 'react'
import { NavLink } from 'react-router-dom';

const Books = ({books, authors, onDelete, removeInProgress}) => {
  return (
    <>
      {
        books.map(book => {
          const {title, year, key} = book
          return (
            <tr key={key}>
              <td>{title}</td>
              <td>Фамилия автора</td>
              <td>Имя автора</td>
              <td>{year}</td>
              <td>
                <NavLink to={`/books/${key}`}>Смотреть</NavLink>
              </td>
              <td>
                <NavLink to={`/books/edit/${key}`}>Редактировать</NavLink>
              </td>
              <td>
                <button
                  onClick={() => onDelete(key)}
                  type="button"
                  className="btn btn-danger"
                  disabled={removeInProgress.indexOf(key) !== -1}
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