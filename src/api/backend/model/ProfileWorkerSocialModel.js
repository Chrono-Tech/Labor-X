
import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'


const schemaFactory = () => ({
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
})

export default class ProfileWorkerSocialModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}

