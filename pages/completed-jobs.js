import React from 'react'
import { connect } from 'react-redux'
import CompletedJobsContent from 'src/components/CompletedJobs/CompletedJobs'
import { MainLayout } from 'src/components/layouts'

class CompletedJobsPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.completedJobs'>
        <CompletedJobsContent />
      </MainLayout>
    )
  }
}

export default connect()(CompletedJobsPage)
