import React from 'react'
import { connect } from 'react-redux'
import ReportsAndClaimsContent from 'src/components/ReportsAndClaims/ReportsAndClaims'
import { MainLayout } from 'src/components/layouts'

class ReportsAndClaimsPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.reportsAndClaims'>
        <ReportsAndClaimsContent />
      </MainLayout>
    )
  }
}

export default connect()(ReportsAndClaimsPage)
