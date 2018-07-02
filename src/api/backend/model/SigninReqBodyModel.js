import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'

const schemaFactory = () => ({
  purpose: PropTypes.string.isRequired,
})

export default class SigninReqBodyModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
