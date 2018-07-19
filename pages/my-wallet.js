import React from 'react'
import { connect } from 'react-redux'
import MyWalletContent from 'src/content/lib/MyWalletContent/MyWalletContent'
import { MainLayout } from 'src/components/layouts'
import {currentAddressSelector} from "../src/store";

class MyWalletPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.myProfile'>
        { this.props.user ? <MyWalletContent /> : null }
      </MainLayout>
    )
  }
}

const mapStateToProps = state => ({
  user: currentAddressSelector()(state),
})

export default connect(mapStateToProps)(MyWalletPage)
