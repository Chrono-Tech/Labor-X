import React from 'react'
import { Widget } from 'src/components/common'

export default class MyPostedJobsWidgedget extends React.Component {
  render () {
    return (
      <Widget
        title='ui.dashboard.client.myPostedJobs'
        subtitle='ui.dashboard.client.client'
        actions={[
          {
            label: 'Offers Activity',
            counter: { value: 1 },
            isLink: true,
          },
          {
            label: 'Worker Assignments Review',
            counter: { value: 1 },
            isLink: true,
          },
        ]}
      />
    )
  }
}
