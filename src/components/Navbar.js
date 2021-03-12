import React from 'react'
import {NavLink} from 'react-router-dom'

const Navbar = () => (
  
    <nav className='navbar navbar-light bg-light navbar-expand-lg'>
      <div className='navbar-brand'>
        Store books
      </div>
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <NavLink to="/books" className="nav-link">Книги</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to="/authors" className="nav-link">Авторы</NavLink>
        </li>
      </ul>
    </nav>
)

export default Navbar