import React from 'react'
import { connect } from 'react-redux'
import CreateJobBoardContent from 'src/components/CreateJobBoard/CreateJobBoard'
import { MainLayout } from 'src/components/layouts'

class CreateJobBoardPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.createJobBoard'>
        <CreateJobBoardContent />
      </MainLayout>
    )
  }
}

export default connect()(CreateJobBoardPage)
