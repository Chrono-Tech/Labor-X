import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'

const schemaFactory = () => ({
  id: PropTypes.string,
  ipfsHash: PropTypes.string,
  address: PropTypes.string,
  avatar: PropTypes.string,
  userName: PropTypes.string,
  validationLevel: PropTypes.number,
})

export default class PersonModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
