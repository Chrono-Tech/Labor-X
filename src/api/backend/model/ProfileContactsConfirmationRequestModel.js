import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'

export const schemaFactory = () => ({
  emailCode: PropTypes.string,
  phoneCode: PropTypes.string,
})

export default class ConfirmationRequestLevel2Model extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
