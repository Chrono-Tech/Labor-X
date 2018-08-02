import React from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router-dom/Redirect'

import MyAccountsContent from "src/content/lib/MyAccountsContent/MyAccountsContent";
import { currentAddressSelector } from "src/store/wallet/selectors";

export class MyAccountsPage extends React.Component {

  render () {
    return this.props.user ? <Redirect to='/dashboard' /> : <MyAccountsContent />
  }

}

const mapStateToProps = (state) => ({
  user: currentAddressSelector()(state),
})

export default connect(mapStateToProps)(MyAccountsPage)

