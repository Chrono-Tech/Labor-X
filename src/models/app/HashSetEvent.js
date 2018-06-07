import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  key: PropTypes.string.isRequired,
  self: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  itemHash: PropTypes.string.isRequired,
})

export default class HashSetEvent extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }
}
