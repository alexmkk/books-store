import React from 'react'

const AuthorInfo = ({ author, history }) => (
  <div>
    <p>{author.last_name} {author.first_name}</p>
    <button className='btn btn-secondary' onClick={() => history.push('/authors')}>Назад</button>
  </div>
)

export default AuthorInfo