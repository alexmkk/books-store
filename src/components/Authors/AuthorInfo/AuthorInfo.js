import React from 'react'

const AuthorInfo = ({author}) => (
  <div>
    <p>{author.last_name} {author.first_name}</p>
  </div>
)

export default AuthorInfo