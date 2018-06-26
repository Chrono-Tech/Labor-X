import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
})

export default class FlowTypeModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  static valueOf (index) {
    return FLOW_TYPES_LIST[index]
  }
}

export const WORKFLOW_NOT_SET = new FlowTypeModel({ index: 0, name: 'NOT_SET' })
export const WORKFLOW_FIXED_PRICE  = new FlowTypeModel({ index: 2, name: 'FIXED_PRICE' })
export const WORKFLOW_TM = new FlowTypeModel({ index: 1, name: 'TM' })

export const FLOW_TYPES_LIST = [
  WORKFLOW_NOT_SET,
  WORKFLOW_FIXED_PRICE,
  WORKFLOW_TM,
]

export const FLOW_TYPES = FLOW_TYPES_LIST.reduce((target, state) => ({
  ...target,
  [state.name]: state,
}), Object.create(null))
