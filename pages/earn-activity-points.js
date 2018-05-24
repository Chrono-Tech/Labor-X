import React from 'react'
import { connect } from 'react-redux'
import { MainLayout } from 'src/components/layouts'
import EarnActivityPointsContent from 'src/components/EarnActivityPoints/EarnActivityPoints'

class EarnActivityPointsPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.earnActivityPoints'>
        <EarnActivityPointsContent />
      </MainLayout>
    )
  }
}

export default connect()(EarnActivityPointsPage)
