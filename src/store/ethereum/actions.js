import assert from 'assert'
import uniqid from 'uniqid'
import { BigNumber } from 'bignumber.js'
import { omitBy, isNil } from 'lodash'
import { TxExecModel, TxEntryModel } from 'src/models'

export const TX_CREATE = 'tx/create'
export const TX_STATUS = 'tx/status'
export const TX_UPDATE = 'tx/update'
export const TX_REMOVE = 'tx/remove'
export const NONCE_UPDATE = 'nonce/update'

export const nextNonce = ({ web3, address }) => async (dispatch, getState) => {
  // eslint-disable-next-line no-param-reassign
  address = address.toLowerCase()
  const state = getState().ethereum
  const nonce = Math.max(
    (address in state.nonces)
      ? state.nonces[address] + 1
      : 0,
    await web3.eth.getTransactionCount(address, 'pending')
  )
  dispatch(NONCE_UPDATE, { address, nonce })
  return nonce
}

export const broadcastTransaction = ({ web3, signed }) => async () => {
  return web3.eth.sendSignedTransaction(signed)
}

export const executeTransaction = ({ web3, tx }) => async (dispatch) => {
  const prepared = await dispatch(prepareTransaction({ web3, tx }))
  const entry = new TxEntryModel({
    key: uniqid(),
    tx: prepared,
    receipt: null,
    isSubmitted: true,
    isAccepted: true,
  })
  dispatch(TX_CREATE, { web3, entry })
  return dispatch(process({ web3, entry }))
}

export const prepareTransaction = ({ web3, tx }) => async (dispatch) => {
  const nonce = await dispatch(nextNonce({ web3, address: tx.from }))
  return new TxExecModel({
    ...tx,
    hash: null,
    data: tx.data != null
      ? tx.data
      : null,
    block: null,
    from: tx.from.toLowerCase(),
    to: tx.to.toLowerCase(),
    // TODO @ipavlenko: Provice default
    gas: new BigNumber(2000000),
    nonce,
  })
}

export const processTransaction = ({ web3, entry }) => async (dispatch) => {
  assert.ok(entry instanceof TxEntryModel)
  await dispatch(signTransaction({ entry }))
  return dispatch(sendSignedTransaction({ web3, entry }))
}

export const signTransaction = ({ entry }) => async (dispatch, getState) => {
  assert.ok(entry instanceof TxEntryModel)
  const rootState = getState()
  try {
    // TODO @ipavlenko: Replace with signer selector
    const wallet = rootState.wallet.decryptedWallet.wallet[0]
    // eslint-disable-next-line no-console
    console.log('tx', omitBy(entry.tx, isNil))
    // eslint-disable-next-line no-console
    console.log('wallet', wallet)
    const signed = await wallet.signTransaction(omitBy(entry.tx, isNil))
    const raw = signed.rawTransaction
    dispatch(TX_STATUS, {
      key: entry.key,
      address: entry.tx.from,
      props: {
        isSigned: true,
        raw,
      },
    })
    return entry
  } catch (e) {
    dispatch(TX_STATUS, {
      key: entry.key,
      address: entry.tx.from,
      props: {
        isErrored: true,
        error: e,
      },
    })
    throw e
  }
}

export const sendSignedTransaction = ({ web3, entry }) => async (dispatch) => {
  assert.ok(entry instanceof TxEntryModel)
  dispatch(TX_STATUS, {
    key: entry.key,
    address: entry.tx.from,
    props: {
      isPending: true,
    },
  })

  return new Promise((resolve, reject) => {
    web3.eth.sendSignedTransaction(entry.raw)
      .on('transactionHash', (transactionHash) => {
        dispatch(TX_STATUS, {
          key: entry.key,
          address: entry.tx.from,
          props: {
            isSent: true,
            hash: transactionHash,
          },
        })
      })
      .on('receipt', (receipt) => {
        dispatch(TX_STATUS, {
          key: entry.key,
          address: entry.tx.from,
          props: {
            isMined: true,
            receipt,
          },
        })
        resolve(receipt)
      })
      .on('error', (error) => {
        dispatch(TX_STATUS, {
          key: entry.key,
          address: entry.tx.from,
          props: {
            isErrored: true,
            error: error,
          },
        })
        reject(error)
      })
  })
}
