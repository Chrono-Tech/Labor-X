import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { PocketModel } from 'src/models'
import { subscribePocket, unsubscribePocket } from 'src/store'

export class BalanceSubscription extends React.Component {
  static propTypes = {
    handleSubscribe: PropTypes.func,
    handleUnsubscribe: PropTypes.func,
    pockets: PropTypes.arrayOf(
      PropTypes.instanceOf(PocketModel)
    ),
    children: PropTypes.node,
  }

  async componentDidMount () {
    if (this.props.pockets != null) {
      this.subscriptions = await Promise.all(
        this.props.pockets.map(async pocket => ({
          pocket,
          listener: await this.props.handleSubscribe({
            pocket: pocket,
          }),
        }))
      )
    }
  }

  async componentWillUnmount () {
    if (this.subscriptions) {
      await Promise.all(
        this.subscriptions.map(
          ({ pocket, listener }) => this.props.handleUnsubscribe({ pocket, listener })
        )
      )
      this.subscriptions = null
    }
  }

  render () {
    return this.props.children
  }
}

function mapDispatchToProps (dispatch) {
  return {
    async handleSubscribe ({ pocket }) {
      return dispatch(subscribePocket({ pocket }))
    },
    async handleUnsubscribe ({ pocket, listener }) {
      await dispatch(unsubscribePocket({ pocket, listener }))
    },
  }
}

export default connect(null, mapDispatchToProps)(BalanceSubscription)
