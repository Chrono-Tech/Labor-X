import MyProfileContent from 'components/MyProfile/MyProfile'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import 'styles/globals/globals.scss'
import initialStore from 'store'

class MyProfile extends React.Component {
  render () {
    return (
      <MainLayout title='nav.myProfile'>
        <MyProfileContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(MyProfile)
