import { combineReducers } from 'redux'

import form from "redux-form/lib/reducer";

import accountPasswordView from './accountPasswordView'
import loginView from './loginView'
import user from './user'

export default combineReducers({
    form,
    accountPasswordView,
    loginView,
    user,
})