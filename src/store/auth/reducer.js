import  combineReducers from 'redux/src/combineReducers'

import signin from './signin/reducer'
import signup from './signup/reducer'
import importReducer from './import/reducer'

const reducer = combineReducers({
  signup,
  signin,
  import: importReducer,
})

export default reducer
