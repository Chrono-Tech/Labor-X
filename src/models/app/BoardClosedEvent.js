import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  key: PropTypes.string.isRequired,
  self: PropTypes.string.isRequired,
  boardId: PropTypes.number.isRequired,
  status: PropTypes.bool,
})

export default class BoardClosedEvent extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }
}
