import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'
import ProfileModel from "./ProfileModel";
import ProfileWorkerModel from "./ProfileWorkerModel";
import ProfileClientModel from "./ProfileClientModel";
import ProfileRecruiterModel from "./ProfileRecruiterModel";

const schemaFactory = () => ({
  token: PropTypes.string.isRequired,
  profile: PropTypes.instanceOf(ProfileModel),
  worker: PropTypes.instanceOf(ProfileWorkerModel),
  client: PropTypes.instanceOf(ProfileClientModel),
  recruiter: PropTypes.instanceOf(ProfileRecruiterModel),
})

export default class SigninResBodyModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  static fromJson (data) {
    if (data == null) return null
    return new SigninResBodyModel({
      ...data,
      profile: ProfileModel.fromJson(data.profile),
      worker: new ProfileWorkerModel(data.worker),
      client: new ProfileClientModel(data.client),
      recruiter: new ProfileRecruiterModel(data.recruiter),
    })
  }
}
