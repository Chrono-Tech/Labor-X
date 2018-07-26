import React from 'react'
import { connect } from 'react-redux'
import { DashboardContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'

class DashboardPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.dashboard'>
        <DashboardContent />
      </MainLayout>
    )
  }
}


export default connect()(DashboardPage)
