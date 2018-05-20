import ClientStatsContent from 'components/ClientStats/ClientStats'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import 'styles/globals/globals.scss'
import initialStore from 'store'

class ClientStats extends React.Component {
  render () {
    return (
      <MainLayout title='nav.clientStats'>
        <ClientStatsContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(ClientStats)
