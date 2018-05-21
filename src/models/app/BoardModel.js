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

const schemaBoardModelFactory = () => ({
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  logoSrc: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
  validationLevel: PropTypes.number,
  categories: PropTypes.arrayOf(
    PropTypes.instanceOf(TagCategoryModel)
  ),
  ipfs: PropTypes.instanceOf(BoardIPFSModel),
  clientsCounts: PropTypes.number,
  jobsCounts: PropTypes.number,
  status: PropTypes.oneOfType([
    BoardModel.STATUS.JOINED,
    BoardModel.STATUS.ON_APPROVAL,
    BoardModel.STATUS.NEED_VERIFY,
    BoardModel.STATUS.UNASSIGNED,
  ]),

})

export default class BoardModel extends AbstractModel {
  static STATUS = {
    JOINED: 'joined',
    ON_APPROVAL: 'onApproval',
    NEED_VERIFY: 'needVerify',
    UNASSIGNED: 'unAssigned',
  }

  constructor (props) {
    super(Object.assign({
      name: '',
      logoSrc: '',
      description: '',
      rating: 0,
      validationLevel: 0,
      categories: [],
      clientCounts: 0,
      jobsCounts: 0,
      status: BoardModel.STATUS.UNASSIGNED,
    }, props), schemaBoardModelFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }

  get key () {
    return `board-${this.id}`
  }
}
