import PropTypes from 'prop-types'
import faker from 'faker'

import {BoardPostFeeModel, BoardRequirementModel} from 'src/models'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  hash: PropTypes.string.isRequired, // ipfs hash of the object itself
  name: PropTypes.string,
  description: PropTypes.string,
  logo: PropTypes.string, // Any supported URL path, including //example.com/path/to/image, https://example.com/path/to/image , ipfs://example.com/path/to/image
  background: PropTypes.string,
  joinRequirement: PropTypes.instanceOf(BoardRequirementModel),
  fee: PropTypes.instanceOf(BoardPostFeeModel),
  lhus: PropTypes.number,
  endorsingSkills: PropTypes.bool,
})

export default class BoardIPFSModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.assign(this, propsWithDefaults(props))
    Object.freeze(this)
  }
}

function propsWithDefaults (props) {
  return Object.assign({}, {
    name: faker.company.companyName(),
    description: faker.lorem.sentence(10),
    background: faker.image.image(64, 64),
    fee: null,
    lhus: 0,
    endorsingSkills: false,
    joinRequirement: null,
    logo: faker.internet.avatar(),
  }, props)
}
