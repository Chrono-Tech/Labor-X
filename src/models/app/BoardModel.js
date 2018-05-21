import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'
import TagCategoryModel from '../meta/TagCategoryModel'
import TagAreaModel from '../meta/TagAreaModel'
import TagModel from '../meta/TagModel'
import BoardIPFSModel from './BoardIPFSModel'
import BoardExtraModel from './BoardExtraModel'

const schemaFactory = () => ({
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  tags: PropTypes.arrayOf(
    PropTypes.instanceOf(TagModel)
  ),
  tagsArea: PropTypes.arrayOf(
    PropTypes.instanceOf(TagAreaModel)
  ),
  tagsCategory: PropTypes.arrayOf(
    PropTypes.instanceOf(TagCategoryModel)
  ),
  ipfs: PropTypes.instanceOf(BoardIPFSModel),
  extra: PropTypes.instanceOf(BoardExtraModel),
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
}
