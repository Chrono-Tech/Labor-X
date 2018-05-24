import React from 'react'
import { connect } from 'react-redux'
import ClientStatsContent from 'src/components/ClientStats/ClientStats'
import { MainLayout } from 'src/components/layouts'

class ClientStatsPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.clientStats'>
        <ClientStatsContent />
      </MainLayout>
    )
  }
}

export default connect()(ClientStatsPage)
