import React from 'react'
import { connect } from 'react-redux'
import GeneralProfileContent from 'src/content/lib/GeneralProfileContent/GeneralProfileContent'
import { MainLayout } from 'src/components/layouts'

class GeneralProfilePage extends React.Component {

  render () {
    return (
      <MainLayout title=''>
        <GeneralProfileContent />
      </MainLayout>
    )
  }
}

export default connect()(GeneralProfilePage)
