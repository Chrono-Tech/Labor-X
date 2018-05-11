import { omit } from 'lodash'
import { TxEntryModel, TxExecModel } from 'src/models'
import { NONCE_UPDATE, TX_STATUS, TX_UPDATE, TX_REMOVE } from './actions'

const initialState = {
  nonces: {},
  pending: {},
}

const mutations = {
  [NONCE_UPDATE] (state, { address, nonce }) {
    return {
      ...state,
      nonces: {
        ...state.nonces,
        [address]: nonce,
      },
    }
  },
  [TX_STATUS] (state, { key, address, props }) {
    const scope = state.pending[address]
    if (!scope) return state
    const entry = scope[entry]
    if (!entry) return state
    return {
      ...state,
      pending: {
        [address]: {
          ...scope,
          [key]: new TxEntryModel({
            ...entry,
            ...props,
          }),
        },
      },
    }
  },
  [TX_UPDATE] (state, { key, address, props }) {
    const scope = state.pending[address]
    if (!scope) return state
    const entry = scope[entry]
    if (!entry) return state
    return {
      ...state,
      pending: {
        [address]: {
          ...scope,
          [key]: new TxEntryModel({
            ...entry,
            tx: new TxExecModel({
              ...entry.tx,
              ...props,
            }),
          }),
        },
      },
    }
  },
  [TX_REMOVE] (state, { key, address }) {
    const scope = state.pending[address]
    if (!scope) return state
    const entry = scope[entry]
    if (!entry) return state
    return {
      ...state,
      pending: omit(state.pending, [key]),
    }
  },
}

export default (state = initialState, { type, ...other }) => {
  // return [state, other]
  return (type in mutations)
    ? mutations[type](other)
    : state
}
