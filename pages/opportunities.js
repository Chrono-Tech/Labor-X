import React from 'react'
import { connect } from 'react-redux'
import { MainLayout } from 'src/components/layouts'
import { OpportunitiesContent } from 'src/content'

class OpportunitiesPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.opportunities'>
        <OpportunitiesContent />
      </MainLayout>
    )
  }
}

export default connect()(OpportunitiesPage)
