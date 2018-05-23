import React from 'react'
import withRedux from 'next-redux-wrapper'
import initialStore from 'src/store'
import { MainLayout } from 'src/components/layouts'
import { OpportunitiesContent } from 'src/content'
import 'styles/globals/globals.scss'

class Opportunities extends React.Component {
  render () {
    return (
      <MainLayout title='nav.opportunities'>
        <OpportunitiesContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(Opportunities)
