import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  key: PropTypes.string.isRequired,
  boardId: PropTypes.number().isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  boardTagsMask: PropTypes.number.isRequired, // bit-mask,
  boardTagsAreaMask: PropTypes.number.isRequired, // bit-mask,
  boardTagsCategoryMask: PropTypes.number.isRequired, // bit-mask,
  status: PropTypes.boolean,
})

export default class BoardCreateEvent extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }
}
