import OpportunitiesContent from 'components/Opportunities/Opportunities'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import initialStore from 'store'

const OPPORTUNITIES_CARDS = [
  {
    icon: '/static/temp/get-started.png',
    jobName: 'Install 10 Gas Ovens',
    title: 'Get Started at Become Involved',
    payTotal: 80,
    payHour: 2,
  },
]

class Opportunities extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  render () {
    return (
      <MainLayout title='nav.opportunities'>
        <OpportunitiesContent
          opportunitiesCards={OPPORTUNITIES_CARDS}
        />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(Opportunities)
