import PropTypes from 'prop-types'
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import { USER_SAVE } from './actions'
import UserModel from "../../models/app/UserModel"
import type Account from "../../models/web3/Account"

export const schemaFactory = () => ({
  existingAccount: Account,
  user: PropTypes.instanceOf(UserModel),
})

export const initialState = { user: null }

const persistConfig = () => ({
  key: 'user',
  storage: storage,
})

const mutations = {
  [USER_SAVE] (state, { user }) {
    return { user }
  },
}

const userReducer = (state = initialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}

export default () => persistReducer(persistConfig(), userReducer)
