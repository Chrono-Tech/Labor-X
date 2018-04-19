import MyJobsBoardsContent from 'components/MyJobsBoards/MyJobsBoards'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import initialStore from 'src/store'

class MyJobsBoards extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  render () {
    return (
      <MainLayout title='nav.myJobsBoards'>
        <MyJobsBoardsContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(MyJobsBoards)
