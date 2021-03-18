import React from 'react'
import { Author } from '../../../types/types'

type ownPropsType = {
  author: Author
  history: any
}

const AuthorInfo: React.FC<ownPropsType> = ({ author, history }) => (
  <div>
    <p>{author.last_name} {author.first_name}</p>
    <button className='btn btn-secondary' onClick={() => history.push('/authors')}>Назад</button>
  </div>
)

export default AuthorInfo