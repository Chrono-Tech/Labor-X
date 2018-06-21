import React from 'react'
import { CreateJobContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'

class CreateJobPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.createJob'>
        <CreateJobContent />
      </MainLayout>
    )
  }
}

export default CreateJobPage
