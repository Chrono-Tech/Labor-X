import React from 'react'
import { connect } from 'react-redux'
import { MainLayout } from 'src/components/layouts'
import ApplicationsAndOffersContent from 'src/components/ApplicationsAndOffers/ApplicationsAndOffers'

class ApplicationsAndOffers extends React.Component {
  render () {
    return (
      <MainLayout title='nav.applicationsAndOffers'>
        <ApplicationsAndOffersContent />
      </MainLayout>
    )
  }
}

export default connect()(ApplicationsAndOffers)
