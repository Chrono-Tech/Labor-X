import { combineReducers } from 'redux'
import generalProfile from './general-profile'
import myProfile from './my-profile'

export default combineReducers({
  generalProfile,
  myProfile,
})