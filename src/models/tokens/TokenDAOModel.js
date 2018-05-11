import PropTypes from 'prop-types'
import AbstractTokenDAO from 'src/daos/lib/AbstractTokenDAO'
import ETHTokenDAO from 'src/daos/lib/ETHTokenDAO'
import EIP20TokenDAO from 'src/daos/lib/EIP20TokenDAO'
import AbstractModel from '../AbstractModel'
import TokenModel from './TokenModel'

const schemaFactory = () => ({
  token: PropTypes.instanceOf(TokenModel),
  dao: PropTypes.instanceOf(AbstractTokenDAO),
})

export default class TokenDAOModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }

  get key () {
    return this.token.key
  }

  static fromTokenModel (token, { getAbi }) {
    if (token.address == null) {
      return new TokenDAOModel({
        token,
        dao: new ETHTokenDAO(token),
      })
    }
    const abi = getAbi(token.address)
    return new TokenDAOModel({
      token,
      dao: new EIP20TokenDAO(token, abi),
    })
  }
}
