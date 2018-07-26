// https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransaction

import PropTypes from 'prop-types'

export const DIRECTION = {
  FROM: 'FROM',
  TO: 'TO'
}
export type Direction = $Keys<typeof DIRECTION>

class Transaction {
  from: string;
  to: string;
  value: string;
  hash: string;
  nonce: number;
  blockHash: string;
  blockNumber: number;
  transactionIndex: number;
  gasPrice: string;
  gas: number;
  input: string;
  constructor(transaction: Transaction) {
    Object.assign(this, transaction)
  }
  static getDirection (transaction: Transaction, address: string): Direction {
    if (transaction.from.toLowerCase() === address.toLowerCase()) return DIRECTION.FROM
    if (transaction.to.toLowerCase() === address.toLowerCase()) return DIRECTION.TO
  }
  static invertDirection (direction: Direction) {
    if (direction === DIRECTION.FROM) return DIRECTION.TO
    if (direction === DIRECTION.TO) return DIRECTION.FROM
  }
}

export const propTypes = PropTypes.shape({
  from: PropTypes.string,
  to: PropTypes.string,
  value: PropTypes.string,
})

export default Transaction