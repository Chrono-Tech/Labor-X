import React from 'react'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import { searchTransaction } from 'src/store/myWallet/actions'
import {getSearchTransactionLoading, getTransactions} from "../../../store/myWallet/selectors";

class MyWalletContent extends React.Component {

  componentDidMount () {
    this.props.searchTransaction()
  }

  renderTransaction (transaction) {
    return <li>{JSON.stringify(transaction)}</li>
  }

  render () {
    if (this.props.searchTransactionLoading) return <CircularProgress />
    return (
      <ul>
        { this.props.transactions.length ? this.props.transactions.map(transaction => this.renderTransaction(transaction)) : 'No transactions' }
      </ul>
    )
  }

}

const mapStateToProps = state => ({
  searchTransactionLoading: getSearchTransactionLoading(state),
  transactions: getTransactions(state) || [],
})

const mapDispatchToProps = (dispatch) => ({
  searchTransaction: () => dispatch(searchTransaction())
})

export default connect(mapStateToProps, mapDispatchToProps)(MyWalletContent)