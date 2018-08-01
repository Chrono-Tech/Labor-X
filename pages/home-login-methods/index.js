import React from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router-dom/Redirect'

import HomeLoginMethodsContent from "src/content/lib/HomeLoginMethodsContent/HomeLoginMethodsContent";
import { currentAddressSelector } from "src/store/wallet/selectors";

export class HomeLoginMethodsPage extends React.Component {

  render () {
    return this.props.user ? <Redirect to='/dashboard' /> : <HomeLoginMethodsContent />
  }

}

const mapStateToProps = (state) => ({
  user: currentAddressSelector()(state),
})

export default connect(mapStateToProps)(HomeLoginMethodsPage)

