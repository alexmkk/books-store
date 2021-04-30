import React, {useState} from 'react'

const Search = ({fetchBooks}) => {
  const [value, setValue] = useState('')
  
  const onChangeHandler = e => {
    setValue(e.target.value)
    fetchBooks()
  }

  return (
    <input
      type="text"
      className="form-control"
      id="inputSearch"
      placeholder="Поиск по названию"
      onChange={onChangeHandler}
      value={value}
    />
  )
}

export default Search