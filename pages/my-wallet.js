import React from 'react'
import MyWalletContent from 'src/content/lib/MyWallet'
import { MainLayout } from 'src/components/layouts'

class MyWalletPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.myWallet'>
        <MyWalletContent />
      </MainLayout>
    )
  }
}

export default MyWalletPage
