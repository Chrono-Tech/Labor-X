import GeneralProfile from 'components/GeneralProfile/GeneralProfile'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import 'styles/globals/globals.scss'
import initialStore from 'store'

class JobsPage extends React.Component {
  
  render () {
    return (
      <MainLayout title=''>
        <GeneralProfile />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(JobsPage)
