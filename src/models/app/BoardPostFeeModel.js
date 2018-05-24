import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'
import {filterArrayByIndexMask} from '../../utils/index'

const schemaFactory = () => ({
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
})

export default class BoardPostFeeModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }
  
  get code () {
    return Math.pow(4, this.index) // odd bit mask
  }
  
  static valueOf (index) {
    return BOARD_POST_FEE_LIST[index]
  }
  
  static arrayValueOfMask (mask) {
    return filterArrayByIndexMask(BOARD_POST_FEE_LIST, mask)
  }
  
}

export const BOARD_POST_FEE_LIST = [
  new BoardPostFeeModel({
    index: 0,
    name: 'Fixed fee',
  }),
  new BoardPostFeeModel({
    index: 1,
    name: 'Option 2',
  }),
  new BoardPostFeeModel({
    index: 2,
    name: 'Option 3',
  }),
]

export const BOARD_POST_MASK = Math.pow(4, BOARD_POST_FEE_LIST.length + 1) - 1 // cover odd bit mask
