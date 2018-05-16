import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'
import TagCategoryModel from '../meta/TagCategoryModel'
import TagAreaModel from '../meta/TagAreaModel'
import TagModel from '../meta/TagModel'
import BoardIPFSModel from './BoardIPFSModel'

const schemaFactory = () => ({
  id: PropTypes.number.isRequired,
  status: PropTypes.bool,
  ipfs: PropTypes.instanceOf(BoardIPFSModel),
  tags: PropTypes.arrayOf(
    PropTypes.instanceOf(TagModel)
  ),
  tagsArea: PropTypes.arrayOf(
    PropTypes.instanceOf(TagAreaModel)
  ),
  tagsCategory: PropTypes.arrayOf(
    PropTypes.instanceOf(TagCategoryModel)
  ),
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
