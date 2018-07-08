import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'

const schemaFactory = () => ({
  isRequested: PropTypes.bool,
})

export default class ProfileClientModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
