import OpportunitiesContent from 'components/Opportunities/Opportunities'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import initialStore from 'src/store'

class Opportunities extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  render () {
    return (
      <MainLayout title='nav.opportunities'>
        <OpportunitiesContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(Opportunities)
