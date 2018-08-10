import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  jobId: PropTypes.number.isRequired,
  totalHours: PropTypes.instanceOf(BigNumber),
  hourlyRate: PropTypes.instanceOf(BigNumber),
  ontop: PropTypes.instanceOf(BigNumber),
  worker: PropTypes.string.isRequired,
  fixedPrice: PropTypes.instanceOf(BigNumber),
})

export default class JobOfferFormModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
