import PostedJobsContent from 'components/PostedJobs/PostedJobs'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import 'styles/globals/globals.scss'
import initialStore from 'store'

class PostedJobs extends React.Component {
  render () {
    return (
      <MainLayout title='nav.postedJobs'>
        <PostedJobsContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(PostedJobs)
