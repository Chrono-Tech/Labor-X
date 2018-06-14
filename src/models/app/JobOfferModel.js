import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js'
import faker from 'faker'
import JobOfferIPFSModel from './JobOfferIPFSModel'
import AbstractModel from '../AbstractModel'

export const schemaFactory = () => ({
  id: PropTypes.number.isRequired,
  worker: PropTypes.string,
  jobId: PropTypes.number,
  rate: PropTypes.instanceOf(BigNumber),
  estimate: PropTypes.instanceOf(BigNumber),
  onTop: PropTypes.instanceOf(BigNumber),
  ipfs: PropTypes.instanceOf(JobOfferIPFSModel),
})

export default class JobOfferModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }

  get key () {
    return `job-offer-${this.id}`
  }
}

function propsWithDefaults (props) {
  const { id, ipfs, ...other } = props
  return Object.assign({}, {
    id: id != null
      ? id
      : faker.random.number(),
    ipfs: new JobOfferIPFSModel(ipfs || {}),
  }, other)
}
