import React from 'react'
import { connect } from 'react-redux'

import { MainLayout } from 'src/components/layouts'
import { WorkerProfileContent } from 'src/content'

class WorkerStatsPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.workerStats' isMenu={false}>
        <WorkerProfileContent />
      </MainLayout>
    )
  }
}

export default connect()(WorkerStatsPage)
