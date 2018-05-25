import React from 'react'
import { connect } from 'react-redux'
import WorkerStatsContent from 'src/components/WorkerStats/WorkerStats'
import { MainLayout } from 'src/components/layouts'

class WorkerStatsPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.workerStats'>
        <WorkerStatsContent />
      </MainLayout>
    )
  }
}

export default connect()(WorkerStatsPage)
