import { ContractDAOModel } from 'src/models'
import {
  CONTRACTS_MANAGER,
  ERC20_LIBRARY,
  JOB_CONTROLLER,
  BOARD_CONTROLLER,
} from 'src/daos'

export const DAOS_REGISTER = 'daos/register'

export const initDAOs = ({ web3 }) => async (dispatch) => {
  const contractManagerDAO = CONTRACTS_MANAGER.create()
  await contractManagerDAO.connect(web3)

  dispatch({
    type: DAOS_REGISTER,
    model: new ContractDAOModel({
      contract: CONTRACTS_MANAGER,
      address: contractManagerDAO.address,
      dao: contractManagerDAO,
    }),
  })

  const contracts = [
    ERC20_LIBRARY,
    JOB_CONTROLLER,
    BOARD_CONTROLLER,
  ]

  const models = await Promise.all(
    contracts.map(
      async contract => {
        const address = await contractManagerDAO.getContractAddressByType(contract.type)
        const dao = contract.create(address)
        dao.connect(web3)
        return new ContractDAOModel({
          contract,
          address,
          dao,
        })
      }
    )
  )

  for (const model of models) {
    dispatch({
      type: DAOS_REGISTER,
      model,
    })
  }
}
