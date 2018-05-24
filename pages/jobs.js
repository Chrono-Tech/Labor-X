import React from 'react'
import { connect } from 'react-redux'
import JobsContent from 'src/components/JobsContent/JobsContent'
import { MainLayout } from 'src/components/layouts'

class JobsPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.jobs'>
        <JobsContent />
      </MainLayout>
    )
  }
}

export default connect()(JobsPage)
