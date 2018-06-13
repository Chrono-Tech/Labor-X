import React from 'react'
import { connect } from 'react-redux'
import { RecruiterJobsContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'

class RecruiterJobsPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.recruiterJobs'>
        <RecruiterJobsContent />
      </MainLayout>
    )
  }
}

export default connect()(RecruiterJobsPage)
