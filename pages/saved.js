import React from 'react'
import { connect } from 'react-redux'
import SavedContent from 'src/components/Saved/Saved'
import { MainLayout } from 'src/components/layouts'

class SavedPage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.saved'>
        <SavedContent />
      </MainLayout>
    )
  }
}

export default connect()(SavedPage)
