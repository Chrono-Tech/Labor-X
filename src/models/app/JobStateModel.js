import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
})

export default class JobStateModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  get code () {
    return Math.pow(2, this.index)
  }

  static valueOf (index) {
    return JOB_STATES_LIST[index]
  }
}

export const JOB_STATE_NOT_SET = new JobStateModel({ index: 0, name: 'NOT_SET' })
export const JOB_STATE_CREATED = new JobStateModel({ index: 1, name: 'CREATED' })
export const JOB_STATE_OFFER_ACCEPTED = new JobStateModel({ index: 2, name: 'OFFER_ACCEPTED' })
export const JOB_STATE_PENDING_START = new JobStateModel({ index: 3, name: 'PENDING_START' })
export const JOB_STATE_STARTED = new JobStateModel({ index: 4, name: 'STARTED' })
export const JOB_STATE_PENDING_FINISH = new JobStateModel({ index: 5, name: 'PENDING_FINISH' })
export const JOB_STATE_FINISHED = new JobStateModel({ index: 6, name: 'FINISHED' })
export const JOB_STATE_WORK_ACCEPTED = new JobStateModel({ index: 7, name: 'WORK_ACCEPTED' })
export const JOB_STATE_WORK_REJECTED = new JobStateModel({ index: 8, name: 'WORK_REJECTED' })
export const JOB_STATE_FINALIZED = new JobStateModel({ index: 9, name: 'FINALIZED' })

export const JOB_STATES_LIST = [
  JOB_STATE_NOT_SET,
  JOB_STATE_CREATED,
  JOB_STATE_OFFER_ACCEPTED,
  JOB_STATE_PENDING_START,
  JOB_STATE_STARTED,
  JOB_STATE_PENDING_FINISH,
  JOB_STATE_FINISHED,
  JOB_STATE_WORK_ACCEPTED,
  JOB_STATE_WORK_REJECTED,
  JOB_STATE_FINALIZED,
]

export const JOB_STATE_ANY_MASK = Math.pow(2, JOB_STATES_LIST.length + 1) - 1

export const JOB_STATE_NAMES = JOB_STATES_LIST.map(state => state.name)

export const JOB_STATES = JOB_STATES_LIST.reduce((target, state) => ({
  ...target,
  [state.name]: state,
}), Object.create(null))
