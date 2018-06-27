import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import { USER_SAVE, AVATAR_UPLOAD_SUCCESS } from './actions'

export const schemaFactory = () => ({
  byId: PropTypes.objectOf(PersonModel)
})

export const initialState = {}

const persistConfig = () => ({
  key: 'person',
  storage: storage,
})

const mutations = {
  [USER_SAVE] (state, { user }) {
    return { user }
  },
  [ AVATAR_UPLOAD_SUCCESS ] (state, { res }) {
    return { ...state, user: { ...state.user, profile } }
  }
}

const userReducer = (state = initialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}

export default () => persistReducer(persistConfig(), userReducer)
