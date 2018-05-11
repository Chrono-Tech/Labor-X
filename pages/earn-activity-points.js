import EarnActivityPointsContent from 'components/EarnActivityPoints/EarnActivityPoints'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import initialStore from 'store'

class EarnActivityPoints extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  render () {
    return (
      <MainLayout title='nav.earnActivityPoints'>
        <EarnActivityPointsContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(EarnActivityPoints)
