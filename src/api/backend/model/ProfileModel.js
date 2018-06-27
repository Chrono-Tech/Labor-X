import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'
import ProfileLevel1Model from "./ProfileLevel1Model";
import ProfileLevel2Model from "./ProfileLevel2Model";
import ProfileLevel3Model from "./ProfileLevel3Model";
import ProfileLevel4Model from "./ProfileLevel4Model";
import ProfileNotifications from "./ProfileNotifications";

export const schemaFactory = () => ({
  id: PropTypes.string.isRequired,
  ipfsHash: PropTypes.string.isRequired,
  level1: PropTypes.instanceOf(ProfileLevel1Model),
  level2: PropTypes.instanceOf(ProfileLevel2Model),
  level3: PropTypes.instanceOf(ProfileLevel3Model),
  level4: PropTypes.instanceOf(ProfileLevel4Model),
  notifications: PropTypes.shape({
    laborx: PropTypes.shape({
      sms: PropTypes.instanceOf(ProfileNotifications),
      email: PropTypes.instanceOf(ProfileNotifications),
    })
  })
})

export default class ProfileModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  getVerificationLevel () {
    if (!(this.level1 && this.level1.approved)) return 0
    if (!(this.level2 && this.level2.approved)) return 1
    if (!(this.level3 && this.level3.approved)) return 2
    if (!(this.level4 && this.level4.approved)) return 3
    return 4
  }

  isApproved () {
    return this.getVerificationLevel() === 4
  }

  static fromJson (data) {
    if (data == null) return null
    return new ProfileModel({
      ...data,
      level1: new ProfileLevel1Model(data.level1),
      level2: new ProfileLevel2Model(data.level2),
      level3: new ProfileLevel3Model(data.level3),
      level4: new ProfileLevel4Model(data.level4),
      notifications: {
        laborx: {
          sms: new ProfileNotifications(data.notifications.laborx.sms),
          email: new ProfileNotifications(data.notifications.laborx.email),
        }
      }
    })
  }

}

