import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'
import ProfileIPFSModel from './ProfileIPFSModel'

const schemaFactory = () => ({
  id: PropTypes.string.isRequired,
  address: PropTypes.string,
  ipfs: PropTypes.instanceOf(ProfileIPFSModel),
})

export default class ProfileModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  get key () {
    return `profile-${this.id}`
  }
}
