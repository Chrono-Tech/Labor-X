import JobsArchiveContent from 'components/JobsArchive/JobsArchive'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import 'styles/globals/globals.scss'
import initialStore from 'store'

class JobsArchive extends React.Component {
  render () {
    return (
      <MainLayout title='nav.jobsArchive'>
        <JobsArchiveContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(JobsArchive)
