import { getEncryptedAccount as getUserEncryptedAccount } from './user'


export const download = () => (dispatch, getState) => {
    const state = getState()
    const encryptedAccount = getUserEncryptedAccount(state)
    const text = JSON.stringify(encryptedAccount)
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', `Wallet.wlt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}
