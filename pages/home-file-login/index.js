import React from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router-dom/Redirect'

import HomeFileLoginContent from "src/content/lib/HomeFileLoginContent/HomeFileLoginContent";
import { currentAddressSelector } from "src/store/wallet/selectors";

export class HomeFileLoginPage extends React.Component {

  render () {
    return this.props.user ? <Redirect to='/dashboard' /> : <HomeFileLoginContent />
  }

}

const mapStateToProps = (state) => ({
  user: currentAddressSelector()(state),
})

export default connect(mapStateToProps)(HomeFileLoginPage)

