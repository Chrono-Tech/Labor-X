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
    name: 'Building',
  }),
  new TagCategoryModel({
    index: 1,
    name: 'Industrial',
  }),
  new TagCategoryModel({
    index: 2,
    name: 'Warehousing',
  }),
  new TagCategoryModel({
    index: 3,
    name: 'Cleaning',
  }),
  new TagCategoryModel({
    index: 4,
    name: 'E-Commerce',
  }),
]
