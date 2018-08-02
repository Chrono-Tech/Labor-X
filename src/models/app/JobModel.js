import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js'
import AbstractModel from '../AbstractModel'
import TagCategoryModel from '../meta/TagCategoryModel'
import TagAreaModel from '../meta/TagAreaModel'
import SkillModel from '../meta/SkillModel'
import JobStateModel from './JobStateModel'
import JobIPFSModel from './JobIPFSModel'
import JobExtraModel from './JobExtraModel'

export const schemaFactory = () => ({
  id: PropTypes.number.isRequired,
  client: PropTypes.string.isRequired,
  worker: PropTypes.string,
  boardId: PropTypes.number,
  state: PropTypes.instanceOf(JobStateModel),
  ipfs: PropTypes.instanceOf(JobIPFSModel),
  extra: PropTypes.instanceOf(JobExtraModel),
  area: PropTypes.instanceOf(TagAreaModel),
  category: PropTypes.instanceOf(TagCategoryModel),
  skills: PropTypes.arrayOf(
    PropTypes.instanceOf(SkillModel)
  ),
  flowType: PropTypes.instanceOf(BigNumber),
  paused: PropTypes.bool,
  defaultPay: PropTypes.number,
  pausedAt: PropTypes.instanceOf(Date),
  pausedFor: PropTypes.number,
  requestedAdditionalTime: PropTypes.number,
})

export default class JobModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  get key () {
    return `job-${this.id}`
  }

  get progress () {
    if (!this.extra.startTime || !this.ipfs.period.since || !this.ipfs.period.until ) {
      return 0
    }
    const totalPausedTime = this.paused ? new Date() - this.pausedAt + this.pausedFor * 1000 : this.pausedFor * 1000
    const totalEstimatedTime = this.ipfs.period.until - this.ipfs.period.since + this.requestedAdditionalTime * 1000
    const totalPassedTime = this.extra.finishTime ? this.extra.finishTime - this.extra.startTime : new Date() - this.extra.startTime
    return Math.round(totalEstimatedTime / (totalPassedTime - totalPausedTime) * 100)
  }
}
