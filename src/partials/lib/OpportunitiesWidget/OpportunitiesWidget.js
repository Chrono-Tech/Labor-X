import React from 'react'
import { Widget } from 'src/components/common'

export default class HrReviewWidget extends React.Component {
  render () {
    return (
      <Widget
        href='/opportunities'
        title='ui.dashboard.worker.opportunities'
        subtitle='ui.dashboard.worker.worker'
        actions={[
          {
            href: '/opportunities',
            label: 'Opportunities',
            counter: { value: 135 },
            isLink: true,
          },
          {
            label: 'Offers',
            counter: { value: 3 },
            isLink: true,
          },
          {
            label: 'Applications',
            isLink: true,
          },
        ]}
      />
    )
  }
}
