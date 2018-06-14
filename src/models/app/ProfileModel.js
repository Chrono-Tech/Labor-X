import PropTypes from 'prop-types'
import faker from 'faker'
import AbstractModel from '../AbstractModel'
import ProfileIPFSModel from './ProfileIPFSModel'
import WorkerExtraModel from './WorkerExtraModel'

const schemaFactory = () => ({
  id: PropTypes.string.isRequired,
  address: PropTypes.string,
  ipfs: PropTypes.instanceOf(ProfileIPFSModel),
  workerExtra: PropTypes.instanceOf(WorkerExtraModel),
})

export default class ProfileModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }

  get key () {
    return `profile-${this.id}`
  }
}

function propsWithDefaults (props) {
  const { id, ipfs, extra, ...other } = props
  return Object.assign({}, {
    id: id != null
      ? id
      : faker.random.uuid(),
    ipfs: new ProfileIPFSModel(props.ipfs || {}),
    workerExtra: new WorkerExtraModel(props.extra || {}),

  }, other)
}
