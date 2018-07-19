import PropTypes from 'prop-types'
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import { USER_SAVE } from './actions'
import UserModel from "../../models/app/UserModel"
import { userTransform } from './transform'

export const schemaFactory = () => ({
  user: PropTypes.instanceOf(UserModel),
})

export const initialState = { user: null }

const persistConfig = () => ({
  key: 'user',
  storage: storage,
  transforms: typeof window === 'undefined'
    ? []
    : [ userTransform() ],
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
