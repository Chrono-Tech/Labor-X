import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'

const schemaFactory = () => ({
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
})

export default class ImageModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }
}
