import authorsReducer, { initialStateType } from "./authors"
import { actions } from './../actions/authors';

let state: initialStateType

beforeEach(() => {
  state = {
    authors: [
      {key: 'first1', first_name: 'Alex', last_name: 'Mkk'},
      {key: 'two2', first_name: 'Steven', last_name: 'King'}
    ],
    loading: false,
    author: {
      key: 'first1',
      first_name: '',
      last_name: ''
    },
    addInProgress: false,
    updateInProgress: false,
    removeInProgress: ['two2']
  }
})

test("remove author success", () => {
  const newState = authorsReducer(state, actions.removeAuthorSuccess('two2'))
  expect(newState.removeInProgress.includes('two2')).toBeFalsy()
})