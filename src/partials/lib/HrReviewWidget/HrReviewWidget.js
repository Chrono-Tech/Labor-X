import React from 'react'
import { Widget } from 'src/components/common'

export default class HrReviewWidget extends React.Component {
  render () {
    return (
      <Widget
        href='/recruiter-jobs'
        title='ui.dashboard.recruiter.hrReview'
        subtitle='ui.dashboard.recruiter.recruiter'
        actions={[
          {
            href: '/',
            label: 'Install 10 Gas Ovens',
            date: '20 Dec',
          },
          {
            href: '/',
            label: 'Pick-up 3 sofas',
            date: '21 Dec',
          },
        ]}
      />
    )
  }
}
