import React from 'react'
import { NavLink } from 'react-router-dom';
import { Author } from '../../types/types';

type PropsType = {
  authors: Array<Author>
  onRemove: (key: string) => any
  removeInProgress: Array<string>
}

const Authors: React.FC<PropsType> = ({ authors, onRemove, removeInProgress }) => {
  return (
    <table className="table table-sm">
      <tbody>
        <tr>
          <th>Фамилия</th>
          <th colSpan={4}>Имя</th>
        </tr>
      {
        authors.map((author) => {
          const { last_name, first_name, key } = author
          return (
            <tr key={`${key}`}>
              <td>{last_name}</td>
              <td>{first_name}</td>
              <td><NavLink to={`/authors/${key}`}>Смотреть</NavLink></td>
              <td><NavLink to={`/authors/${key}/edit`}>Редактировать</NavLink></td>
              <td>
                <button
                  onClick={() => onRemove(key)}
                  type="button"
                  className="btn btn-danger"
                  disabled={removeInProgress.indexOf(key) !== -1}
                >Удалить</button>
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  )
}

export default Authors