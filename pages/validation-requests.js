import ValidationRequestsContent from 'components/ValidationRequests/ValidationRequests'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import 'styles/globals/globals.scss'
import initialStore from 'store'

class ValidationRequests extends React.Component {
  render () {
    return (
      <MainLayout title='nav.validationRequests'>
        <ValidationRequestsContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(ValidationRequests)
