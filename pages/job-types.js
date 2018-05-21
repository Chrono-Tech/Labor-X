import JobTypesContent from 'components/JobTypes/JobTypes'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import 'styles/globals/globals.scss'
import initialStore from 'store'

class JobTypesPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.jobTypes'>
        <JobTypesContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(JobTypesPage)
