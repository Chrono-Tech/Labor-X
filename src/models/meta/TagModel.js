import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
})

export default class TagModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }

  get code () {
    return Math.pow(2, this.index)
  }
}

export const TAGS_LIST = [
  new TagModel({
    index: 0,
    name: 'Tag 1',
  }),
  new TagModel({
    index: 1,
    name: 'Tag 2',
  }),
  new TagModel({
    index: 2,
    name: 'Tag 3',
  }),
]
