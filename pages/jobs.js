import JobsContent from 'components/JobsContent/JobsContent'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import initialStore from 'store'

class JobsPage extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  render () {
    return (
      <MainLayout title='nav.jobs'>
        <JobsContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(JobsPage)
