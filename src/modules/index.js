import { combineReducers } from 'redux'
import showu from './showu';
import user from './user';

const rootReducer = combineReducers({
  showu,
  user
})

export default rootReducer;