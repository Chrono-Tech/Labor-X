import React from 'react'
import { Widget } from 'src/components/common'

export default class JobsProgressWidget extends React.Component {
  render () {
    return (
      <Widget
        title='ui.dashboard.client.jobsProgress'
        subtitle='ui.dashboard.client.client'
        actions={[
          {
            href: '/',
            label: 'Install 10 Gas Ovens',
            counter: { value: 3, isPercent: true },
          },
          {
            href: '/',
            label: 'Pick-up 3 sofas',
            counter: { value: 0, isPercent: true },
          },
        ]}
      />
    )
  }
}
