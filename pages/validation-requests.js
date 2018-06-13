import React from 'react'
import { connect } from 'react-redux'
import ValidationRequestsContent from 'src/components/ValidationRequests/ValidationRequests'
import { MainLayout } from 'src/components/layouts'

class ValidationRequestsPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.validationRequests'>
        <ValidationRequestsContent />
      </MainLayout>
    )
  }
}

export default connect()(ValidationRequestsPage)
