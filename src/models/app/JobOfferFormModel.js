import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  jobId: PropTypes.number.isRequired,
  rate: PropTypes.instanceOf(BigNumber),
  estimate: PropTypes.instanceOf(BigNumber),
  ontop: PropTypes.instanceOf(BigNumber),
  worker: PropTypes.string.isRequired,
  price: PropTypes.instanceOf(BigNumber),
})

export default class JobOfferFormModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
