import React from 'react'
import { connect } from 'react-redux'
import JobBoardsContent from 'src/content/lib/JobBoardsContent/JobBoardsContent'
import { MainLayout } from 'src/components/layouts'

class MyJobBoardsPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.jobs' isMenu>
        <JobBoardsContent />
      </MainLayout>
    )
  }
}

export default connect()(MyJobBoardsPage)
