import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'

const schemaFactory = () => ({
  isRequested: PropTypes.bool,
})

export default class ProfileRecruiterModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  static fromJson (data) {
    const profile = new ProfileRecruiterModel(data)
    return profile
  }
}
