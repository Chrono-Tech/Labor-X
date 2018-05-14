import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  type: PropTypes.string.isRequired,
  address: PropTypes.string,
  abi: PropTypes.object.isRequired,
  DAOClass: PropTypes.any.isRequired,
})

export default class ContractModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }

  create (address = null) {
    return new this.DAOClass(
      address || this.address,
      this.abi
    )
  }
}
