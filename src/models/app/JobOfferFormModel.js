import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  jobId: PropTypes.number.isRequired,
  rate: PropTypes.instanceOf(BigNumber).isRequired,
  estimate: PropTypes.instanceOf(BigNumber).isRequired,
  ontop: PropTypes.instanceOf(BigNumber).isRequired,
})

export default class JobOfferFormModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
