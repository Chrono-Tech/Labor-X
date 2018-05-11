import CreateJobBoardContent from 'components/CreateJobBoard/CreateJobBoard'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import initialStore from 'store'
import React from 'react'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'

class CreateJobBoard extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  render () {
    return (
      <MainLayout title='nav.createJobBoard'>
        <CreateJobBoardContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(CreateJobBoard)
