import React from 'react'
import Web3Provider from 'src/network/Web3Provider'

export default class TestWeb3 extends React.Component {
  static async getInitialProps (props) {
    console.log('--test-web3#getInitProps', props)
    return {}
  }

  render () {
    Web3Provider.test()
    return (
      <div>
        test-web3
      </div>
    )
  }
}
