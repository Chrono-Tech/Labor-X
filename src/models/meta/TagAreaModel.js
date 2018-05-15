import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
})

export default class TagAreaModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }

  get code () {
    return Math.pow(2, this.index)
  }
}

export const TAG_AREAS_LIST = [
  new TagAreaModel({
    index: 0,
    name: 'Tag Area 1',
  }),
  new TagAreaModel({
    index: 1,
    name: 'Tag Area 2',
  }),
  new TagAreaModel({
    index: 2,
    name: 'Tag Area 3',
  }),
]
