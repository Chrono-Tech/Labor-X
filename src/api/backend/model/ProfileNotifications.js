import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'

const schemaFactory = () => ({
  userLoggedIn: PropTypes.bool,
  profileUpdated: PropTypes.bool,
  // transferReceived: PropTypes.bool,
  // transferSent: PropTypes.bool,
  // limitOrderPublished: PropTypes.bool,
  // limitOrderFilled: PropTypes.bool,
  // limitOrderExpired: PropTypes.bool,
  // marketOrderExecuted: PropTypes.bool,
})

export default class ProfileNotifications extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
