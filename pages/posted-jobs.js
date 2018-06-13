import React from 'react'
import { connect } from 'react-redux'
import { PostedJobsContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'

class PostedJobsPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.postedJobs'>
        <PostedJobsContent />
      </MainLayout>
    )
  }
}

export default connect()(PostedJobsPage)
