import React from 'react'
import { connect } from 'react-redux'
import { ActiveJobsContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'

class ActiveJobsPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.activeJobs'>
        <ActiveJobsContent />
      </MainLayout>
    )
  }
}

export default connect()(ActiveJobsPage)
