import { daoByType } from "../daos/selectors"
import { bytes32ToIPFSHash, loadFromIPFS, storeIntoIPFS } from "../../utils"
import { UserAccountTypesModel, UserModel } from "../../models"
import { web3Selector } from "../ethereum/selectors"
import { executeTransaction } from './../ethereum/actions'
// import { createWithExistingAccount } from './../login/actions'

export const USER_SAVE = 'user/save'

export const userSave = (user) => ({ type: USER_SAVE, user })

export const getUserData = (address) => async (dispatch, getState) => {

  const state = getState()

  const IpfsLibrary = daoByType('IPFSLibrary')(state)

  const accountTypesIpfsHash = await IpfsLibrary.getHash(address.toLowerCase(), 'accountTypes')

  const accountTypes = await loadFromIPFS(bytes32ToIPFSHash(accountTypesIpfsHash))

  const user = new UserModel({
    accountTypes: new UserAccountTypesModel(accountTypes),
  })

  dispatch(userSave(user))

  return user

}

export const setUserAccountTypes = (address, accountTypes, signer) => async (dispatch, getState) => {
  try {
    const state = getState()
    const IPFSLibrary = daoByType('IPFSLibrary')(state)
    const web3 = web3Selector()(state)
    const accountTypesIpfsHash = await storeIntoIPFS(accountTypes)
    const tx = IPFSLibrary.createSetHashTx(address.toLowerCase(), 'accountTypes', accountTypesIpfsHash)
    return await dispatch(executeTransaction({ tx, web3, signer }))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    throw err
  }
}
