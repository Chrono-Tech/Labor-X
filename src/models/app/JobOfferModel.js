import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js'
import AbstractModel from '../AbstractModel'

export const schemaFactory = () => ({
  id: PropTypes.number.isRequired,
  worker: PropTypes.string,
  jobId: PropTypes.number,
  rate: PropTypes.instanceOf(BigNumber),
  estimate: PropTypes.instanceOf(BigNumber),
  onTop: PropTypes.instanceOf(BigNumber),
})

export default class JobOfferModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  get key () {
    return `job-offer-${this.id}`
  }
}
