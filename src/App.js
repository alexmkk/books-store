
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import BooksContainer from './components/Books/BooksContainer'
import BookInfoContainer from './components/Books/BookInfo/BookInfoContainer'
import AuthorsContainer from './components/Authors/AuthorsContainer'
import AuthorInfoContainer from './components/Authors/AuthorInfo/AuthorInfoContainer'
import AddBookContainer from './components/Books/AddBook/AddBookContainer'
import EditBookContainer from './components/Books/EditBook/EditBookContainer'
import AddAuthorContainer from './components/Authors/AddAuthor/AddAuthorContainer'
import EditAuthorContainer from './components/Authors/EditAuthor/EditAuthorContainer'

function App() {
  return (
    <>
      <Navbar />
      <div className='container pt-4'>
        <Switch>
          <Route path='/books/add' exact>
            <AddBookContainer />
          </Route>
          <Route path='/books' exact>
            <BooksContainer />
          </Route>
          <Route path='/books/:key' exact>
            <BookInfoContainer />
          </Route>
          <Route path='/books/:key/edit' exact>
            <EditBookContainer />
          </Route>
          <Route path='/authors/add' exact>
            <AddAuthorContainer />
          </Route>
          <Route path='/authors' exact>
            <AuthorsContainer />
          </Route>
          <Route path='/authors/:key' exact>
            <AuthorInfoContainer />
          </Route>
          <Route path='/authors/:key/edit' exact>
            <EditAuthorContainer />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default App