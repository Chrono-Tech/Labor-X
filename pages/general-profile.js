import React from 'react'
import { connect } from 'react-redux'
import GeneralProfile from 'src/components/GeneralProfile/GeneralProfile'
import { MainLayout } from 'src/components/layouts'

class GeneralProfilePage extends React.Component {

  render () {
    return (
      <MainLayout title=''>
        <GeneralProfile />
      </MainLayout>
    )
  }
}

export default connect()(GeneralProfilePage)
