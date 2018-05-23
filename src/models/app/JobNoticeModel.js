import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

export const NOTICE_TYPE_PROBLEM = 'PROBLEM'
export const NOTICE_TYPE_MESSAGE = 'MESSAGE'

const schemaFactory = () => ({
  id: PropTypes.string.isRequired,
  jobId: PropTypes.number.isRequired,
  worker: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    NOTICE_TYPE_PROBLEM,
    NOTICE_TYPE_MESSAGE,
  ]),
  message: PropTypes.string.isRequired,
})

export default class JobNoticeModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  get key () {
    return `notice-${this.id}`
  }
}
