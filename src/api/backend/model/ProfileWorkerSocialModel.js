
import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'

const schemaFactory = () => ({
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string
})

export default class ProfileWorkerSocialModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
