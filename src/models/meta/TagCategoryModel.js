import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
})

export default class TagCategoryModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }

  get code () {
    return Math.pow(2, this.index)
  }
}

export const TAG_CATEGORIES_LIST = [
  new TagCategoryModel({
    index: 0,
    name: 'Tag Category 1',
  }),
  new TagCategoryModel({
    index: 1,
    name: 'Tag Category 2',
  }),
  new TagCategoryModel({
    index: 2,
    name: 'Tag Category 3',
  }),
]
