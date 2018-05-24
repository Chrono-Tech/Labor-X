import React from 'react'
import { connect } from 'react-redux'
import JobBoards from 'src/components/JobBoards/JobBoards'
import { MainLayout } from 'src/components/layouts'

class MyJobBoardsPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.jobs' isMenu>
        <JobBoards />
      </MainLayout>
    )
  }
}

export default connect()(MyJobBoardsPage)
