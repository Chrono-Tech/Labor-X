import React from 'react'
import { connect } from 'react-redux'
import { ArchiveJobsContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'

class JobsArchivePage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.jobsArchive'>
        <ArchiveJobsContent />
      </MainLayout>
    )
  }
}

export default connect()(JobsArchivePage)
