import { daoByType } from "../"
import { bytes32ToIPFSHash, loadFromIPFS } from "../../utils"
import { UserAccountTypesModel, UserModel } from "../../models"

export const USER_SAVE = 'user/save'

export const userSave = (user) => ({ type: USER_SAVE, user })

export const getUserData = (address) => async (dispatch, getState) => {

  const state = getState()

  const IpfsLibrary = daoByType('IPFSLibrary')(state)

  const accountTypesIpfsHash = await IpfsLibrary.getHash(address, 'accountTypes')

  const accountTypes = await loadFromIPFS(bytes32ToIPFSHash(accountTypesIpfsHash))

  const user = new UserModel({
    accountTypes: new UserAccountTypesModel(accountTypes),
  })

  dispatch(userSave(user))

  return user

}
