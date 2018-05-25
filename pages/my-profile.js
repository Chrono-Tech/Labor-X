import React from 'react'
import { connect } from 'react-redux'
import MyProfileContent from 'src/components/MyProfile/MyProfile'
import { MainLayout } from 'src/components/layouts'

class MyProfilePage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.myProfile'>
        <MyProfileContent />
      </MainLayout>
    )
  }
}

export default connect()(MyProfilePage)
