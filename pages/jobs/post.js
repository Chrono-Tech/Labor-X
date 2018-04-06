import JobPostContent from 'components/Jobs/JobPost/JobPost'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import initialStore from 'store'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'

class JobsPost extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  render () {
    return (
      <MainLayout isMenu={false}>
        <JobPostContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(JobsPost)
