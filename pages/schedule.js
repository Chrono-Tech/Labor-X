import ScheduleContent from 'components/Schedule/Schedule'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import 'styles/globals/globals.scss'
import initialStore from 'store'

class Schedule extends React.Component {
  render () {
    return (
      <MainLayout title='nav.schedule'>
        <ScheduleContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(Schedule)
