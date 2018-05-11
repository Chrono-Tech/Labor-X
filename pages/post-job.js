import PostJobContent from 'components/PostJob/PostJob'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import initialStore from 'store'

class PostJob extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  render () {
    return (
      <MainLayout title='nav.postJob'>
        <PostJobContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(PostJob)
