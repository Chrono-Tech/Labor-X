import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'
import { TAG_CATEGORIES_LIST } from '../meta/TagCategoryModel'

const schemaFactory = () => ({
  id: PropTypes.number.isRequired,
})

export default class BoardModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }

  get key () {
    return `board-${this.id}`
  }

  get name () {
    return 'General'
  }

  get description () {
    return ''
  }

  get categories () {
    return TAG_CATEGORIES_LIST
  }
}
