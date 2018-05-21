import ApplicationsAndOffersContent from 'components/ApplicationsAndOffers/ApplicationsAndOffers'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import 'styles/globals/globals.scss'
import initialStore from 'store'

class ApplicationsAndOffers extends React.Component {
  render () {
    return (
      <MainLayout title='nav.applicationsAndOffers'>
        <ApplicationsAndOffersContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(ApplicationsAndOffers)
