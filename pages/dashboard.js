import DashboardContent from 'components/Dashboard/Dashboard'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import initialStore from '../src/store'

class Dashboard extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  render () {
    return (
      <MainLayout title='nav.dashboard'>
        <DashboardContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(Dashboard)
