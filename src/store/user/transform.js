import ProfileModel from 'src/api/backend/model/ProfileModel'
import { UserAccountTypesModel, UserModel } from 'src/models'
import { createTransform } from 'redux-persist'

export const userTransform = () => createTransform(
  (inboundState) => {
    const user = inboundState
    return user
  },
  (outboundState) => {
    if (outboundState) {
      const { accountTypes, token, profile, level1, level2, level3, level4,  ...other } = outboundState
      return new UserModel({
        token,
        profile: ProfileModel.fromJson(profile),
        accountTypes: new UserAccountTypesModel(accountTypes),
        ...other,
      })

    } else {
      return {}
    }
  },
  // define which reducers this transform gets called for.
  { whitelist: ['user'] }
)
