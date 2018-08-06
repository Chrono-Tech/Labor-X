// @flow

import { UserModel } from 'src/models'
import { createTransform } from 'redux-persist'

export const userTransform = () => createTransform(
  (user: UserModel) => user ? user : null,
  (user: UserModel) => user ? UserModel.fromJson(user) : null,
  { whitelist: ['user'] }
)
