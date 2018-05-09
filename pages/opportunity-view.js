import OpportunityViewContent from 'components/OpportunityView/OpportunityView'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import initialStore from 'store'

const OPPORTUNITY = {
  title: 'Install 10 Gas Ovens',
  ref: 'Ref # J-AA-0001',
}

class OpportunityViewPage extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  render () {
    return (
      <MainLayout title={OPPORTUNITY.title}>
        <OpportunityViewContent {...OPPORTUNITY} />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(OpportunityViewPage)
