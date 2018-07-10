import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'
import ProfileWorkerSocialModel from './ProfileWorkerSocialModel'
import ProfileWorkerServiceModel from './ProfileWorkerServiceModel'
import ProfileWorkerEmploymentModel from './ProfileWorkerEmploymentModel'

const schemaFactory = () => ({
  regular: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
    hourlyCharge: PropTypes.string
  }),
  verifiable: PropTypes.shape({
    intro:  PropTypes.string,
    pageBackground:  PropTypes.string,
    attachments: PropTypes.arrayOf(PropTypes.string)
  }),
  custom: PropTypes.any,
  socials: PropTypes.arrayOf(PropTypes.instanceOf(ProfileWorkerSocialModel)),
  services: PropTypes.arrayOf(PropTypes.instanceOf(ProfileWorkerServiceModel)),
  employments: PropTypes.arrayOf(PropTypes.instanceOf(ProfileWorkerEmploymentModel)),
})

export default class ProfileWorkerModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
