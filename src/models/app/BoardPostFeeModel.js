import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'
import { filterArrayByIndexMask } from '../../utils/index'

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
    return Math.pow(2, this.index)
  }

  static valueOf (index) {
    return BOARD_POST_FEE_LIST[index]
  }

  static arrayValueOfMask (mask) {
    return filterArrayByIndexMask(BOARD_POST_FEE_LIST, mask)
  }

}

export const BOARD_POST_FEE_FIXED_FEE = new BoardPostFeeModel({ index: 0, name: 'FIXED_FEE', label: 'Fixed fee' })

export const BOARD_POST_FEE_LIST = [
  BOARD_POST_FEE_FIXED_FEE,
]

export const BOARD_POST_FEES = BOARD_POST_FEE_LIST.reduce((target, state) => ({
  ...target,
  [state.name]: state,
}), Object.create(null))
