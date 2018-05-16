import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  hash: PropTypes.string.isRequired, // ipfs hash of the object itself
  name: PropTypes.string,
  description: PropTypes.string,
  logo: PropTypes.string, // Any supported URL path, including //example.com/path/to/image, https://example.com/path/to/image , ipfs://example.com/path/to/image
})

const defaultProps = {
  hash: 'QmajWTti6H2gX9LS2aMi2tc5NQdtB3vyMoAN4JGRHcX1ai',
  name: 'Default',
  description: '',
  logo: 'ipfs://api/v0/object/get?arg=QmeyamSDEgYZDzSfU4YKU5ZAG7UuFiQndzKaM97KTBNox3&stream-channels=true',
}

export default class BoardIPFSModel extends AbstractModel {
  constructor (props) {
    super(Object.assign(defaultProps, props), schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }
}
