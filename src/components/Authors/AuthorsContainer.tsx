import React, { useEffect} from 'react'
import Authors from './Authors'
import Loader from '../Loader'
import { fetchAuthorsHandler, removeAuthorHandler } from '../../store/actions/authors'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { AppStateType } from '../../store/reducers/rootReducer'
import { Author } from '../../types/types'

type mapStatePropsType = {
  authors: Array<Author>
  loading: boolean
  removeInProgress: Array<string>
}

type mapDispatchPropsType = {
  fetchAuthors: () => void
  removeAuthor: (key: string) => any
}

type PropsType = mapStatePropsType & mapDispatchPropsType

const AuthorsContainer: React.FC<PropsType> = ({ authors, loading, fetchAuthors, removeAuthor, removeInProgress }) => {
  useEffect(() => {
    fetchAuthors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onRemove = (key: string): any => {
    removeAuthor(key)
  }

  return (
    <>
      <h1>Авторы</h1>
      {loading
        ? <Loader />
        : authors.length > 0
          ? <table className="table table-sm">
            <tbody>
              <tr>
                <th>Фамилия</th>
                <th colSpan={4}>Имя</th>
              </tr>
              <Authors authors={authors} onRemove={onRemove} removeInProgress={removeInProgress} />
            </tbody>
          </table>
          : <p>Авторы не найдены</p>
      }

      <NavLink to="/authors/add" exact className="nav-link">
        <button
          type="button"
          className="btn btn-success"
        >Добавить автора</button>
      </NavLink>
    </>
  )
}

const mapStatetoProps = (state: AppStateType): mapStatePropsType => ({
  authors: state.author.authors,
  loading: state.author.loading,
  removeInProgress: state.author.removeInProgress
})

const mapDispatchToProps = (dispatch: any): mapDispatchPropsType => ({
  fetchAuthors: () => dispatch(fetchAuthorsHandler()),
  removeAuthor: (key: string) => dispatch(removeAuthorHandler(key))
})

export default connect<mapStatePropsType, mapDispatchPropsType, any, AppStateType>(mapStatetoProps, mapDispatchToProps)(AuthorsContainer)