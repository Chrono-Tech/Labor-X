import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'
import { TAG_CATEGORIES_LIST } from '../meta/TagCategoryModel'

const schemaFactory = () => ({
  id: PropTypes.number.isRequired,
  ipfs: PropTypes.instanceOf(IPFSBoardModel),
})

class IPFSBoardModel extends AbstractModel {
  constructor (props) {
    super(Object.assign({
      name: 'Default Name',
      description: 'Default Job Description',
      company: 'Company Name',
    }, props), schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }
}

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
