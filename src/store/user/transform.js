import { UserAccountTypesModel } from 'src/models'
import { createTransform } from 'redux-persist'

export const userTransform = () => createTransform(
  (inboundState) => {
    const user = inboundState
    return user
  },
  (outboundState) => {
    if (outboundState) {
      const { accountTypes, ...other } = outboundState
      return {
        accountTypes: new UserAccountTypesModel(accountTypes),
        ...other,
      }
    } else {
      return {}
    }
  },
  // define which reducers this transform gets called for.
  { whitelist: ['user'] }
)
