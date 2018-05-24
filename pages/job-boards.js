import React from 'react'
import { connect } from 'react-redux'
import JobBoards from 'src/components/JobBoards/JobBoards'
import { MainLayout } from 'src/components/layouts'

class JobBoardsPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.jobs' isMenu={false}>
        <JobBoards />
      </MainLayout>
    )
  }
}

export default connect()(JobBoardsPage)
