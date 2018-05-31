import React from 'react'
import { connect } from 'react-redux'
import { JobTypesContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'

class JobTypesPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.jobTypes'>
        <JobTypesContent />
      </MainLayout>
    )
  }
}

export default connect()(JobTypesPage)
