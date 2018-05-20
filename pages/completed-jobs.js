import CompletedJobsContent from 'components/CompletedJobs/CompletedJobs'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import 'styles/globals/globals.scss'
import initialStore from 'store'

class CompletedJobs extends React.Component {
  render () {
    return (
      <MainLayout title='nav.completedJobs'>
        <CompletedJobsContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(CompletedJobs)
