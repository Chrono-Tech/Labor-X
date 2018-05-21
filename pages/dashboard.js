import { DashboardContent } from 'src/content'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import 'styles/globals/globals.scss'
import initialStore from '../src/store'

class Dashboard extends React.Component {
  render () {
    return (
      <MainLayout title='nav.dashboard'>
        <DashboardContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(Dashboard)
