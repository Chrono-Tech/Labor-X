import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'

export const schemaFactory = () => ({
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
})

export default class VerificationRequestContactsModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
