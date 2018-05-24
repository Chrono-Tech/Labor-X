import React from 'react'
import withRedux from 'next-redux-wrapper'

import { CreateJobBoardContent } from 'src/content'
import { MainLayout } from 'components/layouts'
import initialStore from 'store'
import 'styles/globals/globals.scss'

class CreateJobBoard extends React.Component {
  render () {
    return (
      <MainLayout title='nav.createJobBoard'>
        <CreateJobBoardContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(CreateJobBoard)
