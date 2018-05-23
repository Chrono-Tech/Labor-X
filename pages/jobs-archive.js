import React from 'react'
import withRedux from 'next-redux-wrapper'
import { ArchiveJobsContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'
import initialStore from 'src/store'
import 'styles/globals/globals.scss'

class JobsArchive extends React.Component {
  render () {
    return (
      <MainLayout title='nav.jobsArchive'>
        <ArchiveJobsContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(JobsArchive)
