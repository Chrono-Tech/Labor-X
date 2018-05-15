import uniqid from 'uniqid'
import { ERC20_INTERFACE } from 'src/daos'
import { TokenModel, TokenDAOModel } from 'src/models'
import { daoByType } from 'src/store/daos/selectors'

export const TOKENS_REGISTER = 'tokens/register'

export const initTokens = ({ web3 }) => async (dispatch, getState) => {

  const erc20LibrayDAO = daoByType('ERC20Library')(getState()).dao

  const contracts = await erc20LibrayDAO.getContracts()

  const models = await Promise.all(
    contracts.map(
      async address => {
        const dao = ERC20_INTERFACE.create(
          new TokenModel({
            key: uniqid(),
            address,
          })
        )
        const token = await dao.connect(web3)
        return new TokenDAOModel({
          token,
          dao,
        })
      }
    )
  )

  for (const model of models) {
    dispatch({
      type: TOKENS_REGISTER,
      model,
    })
  }
}
