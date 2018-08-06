// @flow

import PropTypes from 'prop-types'
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"

import {
  USER_SAVE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from './actions'
import UserModel from "../../models/app/UserModel"
import { userTransform } from './transform'

export const schemaFactory = () => ({
  user: PropTypes.instanceOf(UserModel),
  logoutLoading: PropTypes.bool,
})

interface State {
  user: UserModel;
  logoutLoading: boolean;
}

export const STATE = {
  user: null,
  logoutLoading: false,
}

const persistConfig = () => ({
  key: 'user',
  storage: storage,
  transforms: typeof window === 'undefined'
    ? []
    : [ userTransform() ],
})

const mutations = {
  [USER_SAVE]: (state, { user }) => ({ ...state, user }),
  [LOGOUT_REQUEST]: (state) => ({ ...state, logoutLoading: true }),
  [LOGOUT_SUCCESS]: (state) => ({ ...state, logoutLoading: false }),
}

const userReducer = (state: State = STATE, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}

export default () => persistReducer(persistConfig(), userReducer)
