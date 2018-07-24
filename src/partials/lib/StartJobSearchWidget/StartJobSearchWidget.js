import React from 'react'
import { Widget } from 'src/components/common'

export default class StartJobSearchWidget extends React.Component {
  render () {
    return (
      <Widget
        title='ui.dashboard.worker.startYourJobSearch'
        subtitle='ui.dashboard.worker.worker'
        actions={[
          {
            href: '/general-job-board',
            label: 'Visit general job board',
            isLink: true,
          },
          {
            href: '/job-boards',
            label: 'Browse job boards',
            isLink: true,
          },
        ]}
      >
                You may visit our General Job Board and start your search or
                browse Job Boards created by other network users.
      </Widget>
    )
  }
}
