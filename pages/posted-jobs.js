import React from 'react'
import withRedux from 'next-redux-wrapper'
import { PostedJobsContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'
import initialStore from 'src/store'
import 'styles/globals/globals.scss'

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
