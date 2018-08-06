import PropTypes from 'prop-types'

import AbstractModel from 'src/models/AbstractModel'
import ProfileModel from "src/api/backend/model/ProfileModel"
import ProfileRecruiterModel from "src/api/backend/model/ProfileRecruiterModel"
import ProfileClientModel from "src/api/backend/model/ProfileClientModel"
import ProfileWorkerModel from "src/api/backend/model/ProfileWorkerModel"

import UserAccountTypesModel from './UserAccountTypesModel'

export const schemaFactory = () => ({
  token: PropTypes.string,
  accountTypes: PropTypes.instanceOf(UserAccountTypesModel),
  profile: PropTypes.instanceOf(ProfileModel),
  recruiter: PropTypes.instanceOf(ProfileRecruiterModel),
  client: PropTypes.instanceOf(ProfileClientModel),
  worker: PropTypes.instanceOf(ProfileWorkerModel),
})

export default class UserModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  static fromJson (data) {
    if (data == null) return null
    // const accountTypes = { client: client.isRequested, worker: worker.isRequested, recruiter: recruiter.isRequested }
    return new UserModel({
      token: data.token,
      profile: ProfileModel.fromJson(data.profile),
      recruiter: new ProfileRecruiterModel(data.recruiter),
      client: new ProfileClientModel(data.client),
      worker: new ProfileWorkerModel(data.worker),
    })
  }

  get accountTypes () {
    return UserAccountTypesModel.fromProfiles(this.recruiter, this.client, this.worker)
  }

}
