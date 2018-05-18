import React from 'react'
import withRedux from 'next-redux-wrapper'
import { CreateJobContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'
import 'styles/globals/globals.scss'
import initialStore from 'src/store'

class CreateJob extends React.Component {
  render () {
    return (
      <MainLayout title='nav.createJob'>
        <CreateJobContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(CreateJob)
