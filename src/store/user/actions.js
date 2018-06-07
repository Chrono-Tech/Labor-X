import { daoByType } from "../"
import { bytes32ToIPFSHash, loadFromIPFS } from "../../utils"

export const USER_SAVE = 'user/save'

export const userSave = (user) => ({ type: USER_SAVE, user })

export const getUserData = (address) => async (dispatch, getState) => {

  const state = getState()

  const IPFSLibrary = daoByType('IPFSLibrary')(state)

  const accountTypesIpfsHash = await IPFSLibrary.getHash(address, 'accountTypes')

  const accountTypes = await loadFromIPFS(bytes32ToIPFSHash(accountTypesIpfsHash))

  const user = {
    accountTypes,
  }

  dispatch(userSave(user))

  return user

}
