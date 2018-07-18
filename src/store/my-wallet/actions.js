import moment from "moment"
import {getBlockNumber} from "./selectors";
import {currentAddressSelector, daoByType} from "src/store";

import scConfig from 'config/sc-config.json'
import {web3Selector} from "../ethereum/selectors";

export const SELECT_BLOCKS_TAKE_DEFAULT = 1000

export const SELECT_INITIAL_PROPS_REQUEST = 'MY_WALLET/SELECT_INITIAL_PROPS/REQUEST'
export const SELECT_INITIAL_PROPS_SUCCESS = 'MY_WALLET/SELECT_INITIAL_PROPS/SUCCESS'
export const SELECT_INITIAL_PROPS_FAILURE = 'MY_WALLET/SELECT_INITIAL_PROPS/FAILURE'
export const selectInitialPropsRequest = (req) => ({ type: SELECT_INITIAL_PROPS_REQUEST, payload: req })
export const selectInitialPropsSuccess = (res) => ({ type: SELECT_INITIAL_PROPS_SUCCESS, payload: res })
export const selectInitialPropsFailure = (err) => ({ type: SELECT_INITIAL_PROPS_FAILURE, payload: err })
export const selectInitialProps = () => async (dispatch, getState) => {
  try {
    dispatch(selectInitialPropsRequest())
    const state = getState()
    const web3 = web3Selector()(state)
    const JobsDataProviderDAO = daoByType('JobsDataProvider')(state)
    const userAddress = currentAddressSelector()(state)
    const blockNumber = await web3.eth.getBlockNumber()
    const blocks = await Promise.all([ ...Array(SELECT_BLOCKS_TAKE_DEFAULT) ].map((x, i) => web3.eth.getBlock(blockNumber - i, true)))
    const blocksHashMap = blocks.reduce((x, block) => ({ ...x, [ block.hash ]: block }), {})
    debugger
    const transactions = blocks
      .reduce((x, block) => x.concat(block.transactions), [])
      .filter((x) => x.from.toLowerCase() === userAddress.toLowerCase())
      .filter((x) => !!parseInt(x.value))
    const transactionReceipts = await Promise.all(transactions.map((transaction) => web3.eth.getTransactionReceipt(transaction.hash)))
    const jobIds = transactionReceipts
      .map((x) => ({ ...x, logs: x.logs.filter((x) => x.topics[0] === scConfig.JobController.events.JobOfferAccepted.hash) }))
      .map((x) => web3.utils.hexToNumber(x.logs[0].topics[2]))
    const jobs = await JobsDataProviderDAO.getJobsByIds(null, jobIds)
    const transactionHistory = transactions
      .map((transaction, i) => ({ transaction, day: moment(blocksHashMap[transaction.blockHash].timestamp * 1000).startOf('day').toISOString(), job: jobs[i] }))
      .reduce((x, { transaction, day, job }) => ({ ...x, [ day ]: [ ...(x[ day ] || []), { transaction, job } ] }), {})
    dispatch(selectInitialPropsSuccess({ transactionHistory, blockNumber }))
  } catch (err) {
    console.error(err)
    dispatch(selectInitialPropsFailure(err))
  }
}

export const SELECT_MORE_TRANSACTIONS_REQUEST = 'MY_WALLET/SELECT_MORE_TRANSACTIONS/REQUEST'
export const SELECT_MORE_TRANSACTIONS_SUCCESS = 'MY_WALLET/SELECT_MORE_TRANSACTIONS/SUCCESS'
export const SELECT_MORE_TRANSACTIONS_FAILURE = 'MY_WALLET/SELECT_MORE_TRANSACTIONS/FAILURE'
export const selectMoreTransactionsRequest = (req) => ({ type: SELECT_MORE_TRANSACTIONS_REQUEST, payload: req })
export const selectMoreTransactionsSuccess = (res) => ({ type: SELECT_MORE_TRANSACTIONS_SUCCESS, payload: res })
export const selectMoreTransactionsFailure = (err) => ({ type: SELECT_MORE_TRANSACTIONS_FAILURE, payload: err })
export const selectMoreTransactions = () => async (dispatch, getState) => {
  try {
    dispatch(selectMoreTransactionsRequest())
    const state = getState()
    const web3 = web3Selector()(state)
    const JobsDataProviderDAO = daoByType('JobsDataProvider')(state)
    const userAddress = currentAddressSelector()(state)
    const blockNumber = getBlockNumber(state) - SELECT_BLOCKS_TAKE_DEFAULT
    const blocks = await Promise.all([ ...Array(SELECT_BLOCKS_TAKE_DEFAULT) ].map((x, i) => web3.eth.getBlock(blockNumber - SELECT_BLOCKS_TAKE_DEFAULT - i, true)))
    const blocksHashMap = blocks.reduce((x, block) => ({ ...x, [ block.hash ]: block }), {})
    const transactions = blocks
      .reduce((x, block) => x.concat(block.transactions), [])
      .filter((x) => x.from.toLowerCase() === userAddress.toLowerCase())
      .filter((x) => !!parseInt(x.value))
    const transactionReceipts = await Promise.all(transactions.map((transaction) => web3.eth.getTransactionReceipt(transaction.hash)))
    const jobIds = transactionReceipts
      .map((x) => ({ ...x, logs: x.logs.filter((x) => x.topics[0] === scConfig.JobController.events.JobOfferAccepted.hash) }))
      .map((x) => web3.utils.hexToNumber(x.logs[0].topics[2]))
    const jobs = await JobsDataProviderDAO.getJobsByIds(null, jobIds)
    const transactionHistory = transactions
      .map((transaction, i) => ({ transaction, day: moment(blocksHashMap[transaction.blockHash].timestamp * 1000).startOf('day').toISOString(), job: jobs[i] }))
      .reduce((x, { transaction, day, job }) => ({ ...x, [ day ]: [ ...(x[ day ] || []), { transaction, job } ] }), {})
    dispatch(selectMoreTransactionsSuccess({ transactionHistory, blockNumber }))
  } catch (err) {
    dispatch(selectMoreTransactionsFailure(err))
  }
}