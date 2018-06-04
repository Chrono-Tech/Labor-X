import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
})

export default class WorkerStateModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  get code () {
    return Math.pow(2, this.index)
  }

  static valueOf (index) {
    return WORKER_STATES_LIST[index]
  }
}

export const WORKER_STATE_AVALIABLE = new WorkerStateModel({ index: 0, name: 'AVALIABLE' })
export const WORKER_STATE_BUSY = new WorkerStateModel({ index: 1, name: 'BUSY' })

export const WORKER_STATES_LIST = [
  WORKER_STATE_AVALIABLE,
  WORKER_STATE_BUSY,
]
