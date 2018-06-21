import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
})

export default class ClientTypeModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  static valueOf (index) {
    return CLIENT_TYPES_LIST[index]
  }
}

export const CLIENT_TYPE_ORGANISATION  = new ClientTypeModel({ index: 0, name: 'ORGANISATION', label: 'Organisation' })
export const CLIENT_TYPE_ENTREPRENEUR = new ClientTypeModel({ index: 1, name: 'ENTREPRENEUR', label: 'Entrepreneur' })

export const CLIENT_TYPES_LIST = [
  CLIENT_TYPE_ORGANISATION,
  CLIENT_TYPE_ENTREPRENEUR,
]

export const CLIENT_TYPES = CLIENT_TYPES_LIST.reduce((target, state) => ({
  ...target,
  [state.name]: state,
}), Object.create(null))
