import PropTypes from 'prop-types'
import { filterArrayByIndexMask } from 'src/utils'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
})

export default class BoardRequirementModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
  
  get code () {
    return Math.pow(2, this.index) // odd bit mask
  }
  
  static valueOf (index) {
    if (!index){
      return null
    }
    
    return BOARD_REQUIREMENTS_LIST[index]
  }
  
  static arrayValueOfMask (mask) {
    return filterArrayByIndexMask(BOARD_REQUIREMENTS_LIST, mask)
  }
  
}

export const BOARD_REQUIREMENTS_LIST = [
  new BoardRequirementModel({
    index: 0,
    name: 'Match job board categories',
  }),
  new BoardRequirementModel({
    index: 1,
    name: 'Specific rating and validation level',
  }),
  new BoardRequirementModel({
    index: 2,
    name: 'By invitation only',
  }),
]

export const BOARD_REQUIREMENT_MASK = Math.pow(2, BOARD_REQUIREMENTS_LIST.length + 1) - 1 // cover odd bit mask
