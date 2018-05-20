import React from 'react'
import withRedux from 'next-redux-wrapper'
import { CreateJobContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'
import initialStore from 'src/store'
import 'styles/globals/globals.scss'

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
