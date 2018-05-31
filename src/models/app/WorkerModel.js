import PropTypes from 'prop-types'
import faker from 'faker'
import AbstractModel from '../AbstractModel'
import WorkerIPFSModel from './WorkerIPFSModel'
import WorkerExtraModel from './WorkerExtraModel'

const schemaFactory = () => ({
  id: PropTypes.number.isRequired,
  ipfs: PropTypes.instanceOf(WorkerIPFSModel),
  extra: PropTypes.instanceOf(WorkerExtraModel),
})

export default class WorkerModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }

  get key () {
    return `worker-${this.id}`
  }
}

function propsWithDefaults (props) {
  const { id, tagsCategory, ...other } = props
  return Object.assign({}, {
    id: id != null
      ? id
      : faker.random.number(),
    ipfs: new WorkerIPFSModel(props.ipfs || {}),
    extra: new WorkerExtraModel(props.extra || {}),
  }, other)
}
