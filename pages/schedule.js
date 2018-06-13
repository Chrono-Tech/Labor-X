import React from 'react'
import { connect } from 'react-redux'
import ScheduleContent from 'src/components/Schedule/Schedule'
import { MainLayout } from 'src/components/layouts'

class SchedulePage extends React.Component {
  render () {
    return (
      <MainLayout title='nav.schedule'>
        <ScheduleContent />
      </MainLayout>
    )
  }
}

export default connect()(SchedulePage)
