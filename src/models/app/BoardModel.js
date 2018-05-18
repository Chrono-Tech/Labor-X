import PropTypes from 'prop-types'
import { AbstractModel, TagCategoryModel } from 'src/models'

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
  ipfs: PropTypes.instanceOf(IPFSBoardModel),
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
      ipfs: new IPFSBoardModel(),
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
