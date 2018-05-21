import React from 'react'
import withRedux from 'next-redux-wrapper'
import initialStore from 'src/store'
import { ActiveJobsContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'
import 'styles/globals/globals.scss'

class ActiveJobs extends React.Component {
  render () {
    return (
      <MainLayout title='nav.activeJobs'>
        <ActiveJobsContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(ActiveJobs)
