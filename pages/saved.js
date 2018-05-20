import SavedContent from 'components/Saved/Saved'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import 'styles/globals/globals.scss'
import initialStore from 'store'

class Saved extends React.Component {
  render () {
    return (
      <MainLayout title='nav.saved'>
        <SavedContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(Saved)
