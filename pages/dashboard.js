import React from 'react'
import { MainLayout } from 'components/layouts'
import 'styles/globals/globals.scss'
import DashboardContent from 'components/Dashboard/Dashboard'

export default class dashboard extends React.Component {
  render () {
    return (
      <MainLayout title='Dashboard'>
        <DashboardContent />
      </MainLayout>
    )
  }
}
