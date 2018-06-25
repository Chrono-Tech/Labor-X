import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'

export const schemaFactory = () => ({
  userName: PropTypes.string.isRequired,
  birthDate: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
})

export default class VerificationRequestLevel1Model extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
