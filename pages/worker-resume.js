import React from 'react'
import { connect } from 'react-redux'

import { MainLayout } from 'src/components/layouts'
import { WorkerResumeContent } from 'src/content'

class WorkerResumePage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.workerResume' isMenu={false}>
        <WorkerResumeContent />
      </MainLayout>
    )
  }
}

export default connect()(WorkerResumePage)
